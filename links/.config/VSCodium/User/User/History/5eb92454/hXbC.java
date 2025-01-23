package utils;

/**
 * The Logger class provides methods to log messages with different levels of severity.
 * It supports logging error, success, warning, and general log messages with ANSI color codes.
 */
public class Logger {
  private static final String ANSI_RESET = "\u001B[0m";
  private static final String ANSI_RED = "\u001B[31m";
  private static final String ANSI_GREEN = "\u001B[32m";
  private static final String ANSI_YELLOW = "\u001B[33m";
  private static final String ANSI_CYAN_BOLD = "\033[1;36m";

  public static void error(Exception e) {
    System.out.println(ANSI_RED + "✗ " + ANSI_RESET + e.getMessage());
  }

  public static void error(String message) {
    System.out.println(ANSI_RED + "✗ " + ANSI_RESET + message);
  }

  public static void log(String message) {
    System.out.println("[" + ANSI_CYAN_BOLD + "LOG" + ANSI_RESET + "]: "+message);
  }

  public static void success(String message) {
    System.out.println(ANSI_GREEN + "✓ " + ANSI_RESET + message);
  }

  public static void warn(String message) {
    System.out.println(ANSI_YELLOW + "! " + ANSI_RESET + message);
  }
}
