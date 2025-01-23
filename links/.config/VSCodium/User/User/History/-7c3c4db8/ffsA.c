#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <time.h>
#include <sys/wait.h>

int main(int argc, char* argv[]) {
  if (argc != 2)
  {
    fprintf(stderr, "Usage: %s <nombre d'enfants>\n", argv[0]);
    exit(EXIT_FAILURE);
  }

  int nombre_enfants = atoi(argv[1]);
  srand(time(NULL));

  for (int i = 0; i < nombre_enfants; i++)
  {
    pid_t pid = fork();

    if (pid < 0)
    {
      perror("Erreur de fork");
      exit(EXIT_FAILURE);
    }
    else if (pid == 0)
    {
      int sleep_time = rand() % 20 + 1;
      printf("Fils PID : %d, va dormir pendant %d secondes\n", getpid(), sleep_time);
      sleep(sleep_time);
      exit(sleep_time);
    }
  }

  // Processus père attend la terminaison de chaque enfant
  for (int i = 0; i < nombre_enfants; i++)
  {
    int status;
    pid_t child_pid = wait(&status);

    if (WIFEXITED(status))
    {
      int sleep_time = WEXITSTATUS(status);
      printf("Fils terminé PID : %d, temps de sommeil : %d secondes\n", child_pid, sleep_time);
    }
  }

  printf("Tous les enfants sont terminés.\n");
  return 0;
}
