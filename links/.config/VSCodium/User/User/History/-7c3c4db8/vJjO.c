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
}
