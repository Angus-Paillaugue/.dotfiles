/******************************************************************************
*  R3.05	                                                                    *
*******************************************************************************
*                                                                             *
*  Nom : Proxy FTP 	                                                          *
*                                                                             *
*******************************************************************************
*                                                                             *
*  PAILLAUGUE Angus		                                                        *
*                                                                             *
*  NOEL Etienne                                                               *
*                                                                             *
*******************************************************************************
*                                                                             *
*  Nom du fichier : proxy.c                                                   *
*                                                                             *
******************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <sys/socket.h>
#include <netdb.h>
#include <string.h>
#include <unistd.h>
#include <errno.h>
#include <stdarg.h>

#define SERVADDR "localhost" // Proxy listen address
#define SERVPORT "0"				 // Dynamic port allocation
#define LISTENLEN 1
#define MAXBUFFERLEN 1024
#define MAXHOSTLEN 64
#define MAXPORTLEN 6
#define FTP_SERVER "localhost"
#define FTP_PORT "21"

void debug(const char *format, ...) {
	va_list args;
	va_start(args, format);
	printf("[\033[0;34mDEBUG\x1B[0m] ");
	vprintf(format, args);
	va_end(args);
}

void debug_err(const char *format, ...) {
	va_list args;
	va_start(args, format);
	printf("[\x1B[31mERR\x1B[0m] ");
	vprintf(format, args);
	va_end(args);
}

// Main function to handle the FTP proxy
int handle_ftp_proxy(int client_sock)
{
	struct addrinfo hints, *ftp_res;
	int ftp_sock;
	ssize_t bytes_read;
	char buffer[MAXBUFFERLEN];
	fd_set read_fds;
	int max_fd;

	// Connect to the upstream FTP server
	memset(&hints, 0, sizeof(hints));
	hints.ai_socktype = SOCK_STREAM;
	hints.ai_family = AF_INET;

	// Get address info for the FTP server
	if (getaddrinfo(FTP_SERVER, FTP_PORT, &hints, &ftp_res) != 0)
	{
		debug_err("getaddrinfo (FTP server)");
		return -1;
	}

	ftp_sock = socket(ftp_res->ai_family, ftp_res->ai_socktype, ftp_res->ai_protocol);
	if (ftp_sock == -1)
	{
		debug_err("Error creating FTP socket");
		freeaddrinfo(ftp_res);
		return -1;
	}

	if (connect(ftp_sock, ftp_res->ai_addr, ftp_res->ai_addrlen) == -1)
	{
		debug_err("Error connecting to FTP server");
		close(ftp_sock);
		freeaddrinfo(ftp_res);
		return -1;
	}

	freeaddrinfo(ftp_res);

	// Proxy data between the client and the FTP server
	while (1)
	{
		FD_ZERO(&read_fds);
		FD_SET(client_sock, &read_fds);
		FD_SET(ftp_sock, &read_fds);
		max_fd = (client_sock > ftp_sock) ? client_sock : ftp_sock;

		// Wait for activity on either socket
		if (select(max_fd + 1, &read_fds, NULL, NULL, NULL) == -1)
		{
			debug_err("select error");
			break;
		}

		// Check if there is data to read from the client socket
		if (FD_ISSET(client_sock, &read_fds))
		{
			// Receive data from the client
			bytes_read = recv(client_sock, buffer, MAXBUFFERLEN - 1, 0);
			// If no data is received or an error occurs, break the loop
			if (bytes_read <= 0)
				break;
			// Send the received data to the FTP server
			send(ftp_sock, buffer, bytes_read, 0);
		}

		// Check if there is data to read from the FTP socket
		if (FD_ISSET(ftp_sock, &read_fds))
		{
			// Receive data from the FTP server
			bytes_read = recv(ftp_sock, buffer, MAXBUFFERLEN - 1, 0);
			// If no data is received or an error occurs, break the loop
			if (bytes_read <= 0)
					break;
			// Send the received data to the client
			send(client_sock, buffer, bytes_read, 0);
		}
	}

	// Close the FTP socket
	close(ftp_sock);
	return 0;
}

int main()
{
	int ecode;                       // Code retour des fonctions
	char serverAddr[MAXHOSTLEN];     // Adresse du serveur
	char serverPort[MAXPORTLEN];     // Port du server
	int descSockRDV;                 // Descripteur de socket de rendez-vous
	int descSockCOM;                 // Descripteur de socket de communication
	struct addrinfo hints;           // Contrôle la fonction getaddrinfo
	struct addrinfo *res;            // Contient le résultat de la fonction getaddrinfo
	struct sockaddr_storage myinfo;  // Informations sur la connexion de RDV
	struct sockaddr_storage from;    // Informations sur le client connecté
	socklen_t len;                   // Variable utilisée pour stocker les
														// longueurs des structures de socket
	char buffer[MAXBUFFERLEN];       // Tampon de communication entre le client et le serveur

	// Initialisation de la socket de RDV IPv4/TCP
	descSockRDV = socket(AF_INET, SOCK_STREAM, 0);
	if (descSockRDV == -1) {
		debug_err("Erreur création socket RDV");
		exit(2);
	}
	// Publication de la socket au niveau du système
	// Assignation d'une adresse IP et un numéro de port
	// Mise à zéro de hints
	memset(&hints, 0, sizeof(hints));
	// Initialisation de hints
	hints.ai_flags = AI_PASSIVE;      // mode serveur, nous allons utiliser la fonction bind
	hints.ai_socktype = SOCK_STREAM;  // TCP
	hints.ai_family = AF_INET;        // seules les adresses IPv4 seront présentées par
														// la fonction getaddrinfo

	// Récupération des informations du serveur
	ecode = getaddrinfo(SERVADDR, SERVPORT, &hints, &res);
	if (ecode) {
		debug_err("getaddrinfo: %s\n", gai_strerror(ecode));
		exit(1);
	}
	// Publication de la socket
	ecode = bind(descSockRDV, res->ai_addr, res->ai_addrlen);
	if (ecode == -1) {
		debug_err("Erreur liaison de la socket de RDV");
		exit(3);
	}
	// Nous n'avons plus besoin de cette liste chainée addrinfo
	freeaddrinfo(res);

	// Récuppération du nom de la machine et du numéro de port pour affichage à l'écran
	len=sizeof(struct sockaddr_storage);
	ecode=getsockname(descSockRDV, (struct sockaddr *) &myinfo, &len);
	if (ecode == -1)
	{
		debug_err("SERVEUR: getsockname");
		exit(4);
	}
	ecode = getnameinfo((struct sockaddr*)&myinfo, sizeof(myinfo), serverAddr,MAXHOSTLEN,
											serverPort, MAXPORTLEN, NI_NUMERICHOST | NI_NUMERICSERV);
	if (ecode != 0) {
		debug_err("error in getnameinfo: %s\n", gai_strerror(ecode));
		exit(4);
	}

	debug("L'adresse d'ecoute est: %s\n", serverAddr);
	debug("Le port d'ecoute est: %s\n", serverPort);

	// Main loop to accept incoming connections
	while (1)
	{
		// Listen for incoming connections
		if (listen(descSockRDV, LISTENLEN) == -1)
		{
			debug_err("Error listening");
			exit(6);
		}

	// Accept a connection from a client
		len = sizeof(struct sockaddr_storage);
		descSockCOM = accept(descSockRDV, (struct sockaddr *)&from, &len);
		if (descSockCOM == -1)
		{
			debug_err("Error accepting connection");
			continue;
		}

		// Fork a child process to handle the FTP proxy
		if (fork() == 0)
		{
			// Child process
			close(descSockRDV);
			handle_ftp_proxy(descSockCOM);
			close(descSockCOM);
			exit(0);
		}

		close(descSockCOM);
	}

	close(descSockRDV);
	return 0;
}
