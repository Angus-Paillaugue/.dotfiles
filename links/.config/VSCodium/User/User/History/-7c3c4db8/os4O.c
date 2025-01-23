

int main(int argc, char* argv[]) {
  if (argc != 2)
  {
    fprintf(stderr, "Usage: %s <nombre d'enfants>\n", argv[0]);
    exit(EXIT_FAILURE);
  }

  int nombre_enfants = atoi(argv[1]);
  srand(time(NULL));
}
