package utils;

public class Logger {
  public static void error(Exception e) {
    System.out.println("\033[0;31m✗ \033[0m" + e.getMessage());
  }

  public static void error(String message) {
    System.out.println("\033[0;31m✗ \033[0m" + message);
  }

  public static void log(String message) {
    System.out.println("\033[0;32m✓ \033[0m" + message);
  }

  public static void warn(String message) {
    System.out.println("\033[0;33m! " + message);
  }
}
