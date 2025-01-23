#include <stdio.h>
#include <stdlib.h>
#include <signal.h>
#include <unistd.h>

void handle_sigusr1(int sig)
{
  printf("Processus PID : %d, Signal reçu : %d\n", getpid(), sig);
  exit(0);
}

int main()
{
  // Associe le signal SIGUSR1 à la fonction de gestion handle_sigusr1
  signal(SIGUSR1, handle_sigusr1);

  printf("Processus en attente du signal SIGUSR1. PID : %d\n", getpid());

  // Boucle infinie en attente du signal
  while (1)
  {
    pause(); // Attendre un signal
  }

  return 0;
}
