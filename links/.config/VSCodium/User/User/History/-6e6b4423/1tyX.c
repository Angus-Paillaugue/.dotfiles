1
#include <stdio.h>2 #include <stdlib.h>3
#include <sys/socket.h>4
#include <netdb.h>5
#include <string.h>6
    7
#define SERVADDR "localhost" 8
#define SERVPORT "12345" 9 #define LISTENLEN 110
#define MAXBUFFERLEN 102411
    12 int
    main()
{
  13 int ecode;
  14 char serverAddr[MAXHOSTLEN];
  15 char serverPort[MAXPORTLEN];
  16 int descSockRDV;
  17 int descSockCOM;
  18 struct addrinfo hints;
  19 struct addrinfo *res;
  20 struct sockaddr_storage myinfo;
  21 struct sockaddr_storage from;
  22 socklen_t len23 char buffer[MAXBUFFERLEN];
  24 25 26 memset(&hints, 0, sizeof(hints));
  27 hints.ai_flags = AI_PASSIVE;
  28 hints.ai_socktype = SOCK_STREAM;
  29 hints.ai_family = AF_UNSPEC;
  30 31 ecode = getaddrinfo(SERVADDR, SERVPORT, &hints, &res);
  32 if (ecode)
  {
    33 fprintf(stderr, "getaddrinfo: %s\n", gai_strerror(ecode));
    34 exit(1);
    35
  }
  36 37 descSockRDV = socket(res->ai_family, res->ai_socktype, res->ai_protocol);
  38 if (descSockRDV == -1)
  {
    39 perror("Erreur creation socket");
    40 exit(4);
    41
  }
  42 43 ecode = bind(descSockRDV, res->ai_addr, res->ai_addrlen);
  44 if (ecode == -1)
  {
    45 perror("Erreur liaison de la socket de RDV");
    46 exit(3);
    47
  }
  48 freeaddrinfo(res);
  49 50 len = sizeof(struct sockaddr_storage);
  51 ecode = getsockname(descSockRDV, (struct sockaddr *)&myinfo, &len);
  52 if (ecode == -1) 53
  {
    54 perror("SERVEUR: getsockname");
    55 exit(4);
    56
  }
  57 ecode = getnameinfo((struct sockaddr *)&myinfo, sizeof(myinfo), 58 serverAddr, MAXHOSTLEN, 59 serverPort, MAXPORTLEN, 60 NI_NUMERICHOST | NI_NUMERICSERV);
  61 if (ecode != 0)
  {
    62 fprintf(stderr, "Erreur dans getnameinfo: %s\n", gai_strerror(ecode));
    63 exit(4);
    64
  }
  65 printf("L'adresse d'ecoute est: %s\n", serverAddr);
  66 printf("Le port d'ecoute est: %s\n", serverPort);
