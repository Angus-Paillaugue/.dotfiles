1
#include <stdio.h>2
#include <unistd.h>3
#include <sys/socket.h>4
#include <netdb.h>5
#include <string.h>6
#include <stdlib.h>7
#include <stdbool.h>
#define MAXBUFFERLEN 102410
#define SERVERNAME = "localhost" 11 #define SERVERPORT = "12345" 12
    13 int
    main(int argc, char *argv[])
{
 int descSock;
 int ecode;
 struct addrinfo *res, *resPtr;
 struct addrinfo hints;
 char buffer[MAXBUFFERLEN];
 bool isConnected = false20 21 memset(&hints, 0, sizeof(hints));
 hints.ai_socktype = SOCK_STREAM;
 hints.ai_family = AF_UNSPEC;
 ecode = getaddrinfo(SERVERNAME, SERVERPORT, &hints, &res);
 if (ecode)
  {
 fprintf(stderr, "getaddrinfo: %s\n", gai_strerror(ecode));
 exit(1);
  }
 resPtr = res;
 while (!isConnected && resPtr != NULL)
  {
 descSock = socket(resPtr->ai_family, resPtr->ai_socktype, 35 resPtr->ai_protocol);
 if (descSock == -1)
    {
 perror("Erreur creation socket");
 exit(2);
    }
 ecode = connect(descSock, resPtr->ai_addr, resPtr->ai_addrlen);
 if (ecode == -1)
    {
 resPtr = resPtr->ai_next;
 close(descSock);
    }
 else isConnected = true;

  }
 freeaddrinfo(res);
 if (!isConnected)
  {
 perror("Connexion impossible");
 exit(2);
  }
 ecode = read(descSock, buffer, MAXBUFFERLEN - 1);
 if (ecode == -1)
  {
    perror("Problème de lecture\n");
    exit(3);
  }
 buffer[ecode] = '\0';
 printf("\"%s\".\n", buffer);
 close(descSock);

}
