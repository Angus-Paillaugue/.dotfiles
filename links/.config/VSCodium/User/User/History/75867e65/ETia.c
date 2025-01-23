#include <stdio.h>2
#include <unistd.h>3
#include <sys/socket.h>4
#include <netdb.h>5
#include <string.h>6
#include <stdlib.h>7
#include <stdbool.h>8
9
#define MAXBUFFERLEN 102410
#define SERVERNAME = "localhost"11 #define SERVERPORT = "12345"12
13
int main(int argc, char* argv[]){14 int descSock;15
int ecode;16
struct addrinfo *res,*resPtr;17
struct addrinfo hints;18
char buffer[MAXBUFFERLEN];19
bool isConnected = false20
21 memset(&hints, 0, sizeof(hints));22
hints.ai_socktype = SOCK_STREAM;23
hints.ai_family = AF_UNSPEC;24
25
ecode = getaddrinfo(SERVERNAME,SERVERPORT,&hints,&res);26 if (ecode){27
fprintf(stderr,"getaddrinfo: %s\n", gai_strerror(ecode));28
exit(1);29
}30
31 resPtr = res;32
33
while(!isConnected && resPtr!=NULL){34 descSock = socket(resPtr->ai_family, resPtr->ai_socktype,35
resPtr->ai_protocol);36 if (descSock == -1) {37
perror("Erreur creation socket");38
exit(2);39 }40
41 ecode = connect(descSock, resPtr->ai_addr, resPtr->ai_addrlen);42 if (ecode == -1) {43
resPtr = resPtr->ai_next;44 close(descSock);45
}46
else isConnected = true;47 }48
freeaddrinfo(res);49 if (!isConnected){50
perror("Connexion impossible");51
exit(2);52 }53
54
ecode = read(descSock, buffer, MAXBUFFERLEN-1);55
if (ecode == -1) {perror("Problème de lecture\n"); exit(3);}56
buffer[ecode] = '\0';57
printf("\"%s\".\n",buffer);58
close(descSock);59
}
