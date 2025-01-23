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
  signal(SIGUSR1, handle_sigusr1);

  printf("Processus en attente du signal SIGUSR1. PID : %d\n", getpid());

  while (1)
  {
    pause();
  }

  return 0;
}
