package utils;

public class Logger {
  private static final String RED = "\033[0;31m";
  private static final String GREEN = "\033[0;32m";
  private static final String YELLOW = "\033[0;33m";
  private static final String RESET = "\033[0m";

  public static void error(Exception e) {
    System.out.println(RED + "✗ " + RESET + e.getMessage());
  }

  public static void error(String message) {
    System.out.println(RED + "✗ " + RESET + message);
  }

  public static void log(String message) {
    System.out.println("[LOG]: "+message);
  }

  public static void success(String message) {
    System.out.println(GREEN + "✓ " + RESET + message);
  }

  public static void warn(String message) {
    System.out.println(YELLOW + "! " + RESET + message);
  }
}
