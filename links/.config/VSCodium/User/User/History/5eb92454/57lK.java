package utils;

public class Logger {
  public static final String ANSI_RESET = "\u001B[0m";
  public static final String ANSI_RED = "\u001B[31m";
  public static final String ANSI_GREEN = "\u001B[32m";
  public static final String ANSI_YELLOW = "\u001B[33m";
  public static final String ANSI_CYAN_BOLD = "\033[1;36m";

  public static void error(Exception e) {
    System.out.println(ANSI_RED + "✗ " + ANSI_RESET + e.getMessage());
  }

  public static void error(String message) {
    System.out.println(ANSI_RED + "✗ " + ANSI_RESET + message);
  }

  public static void log(String message) {
    System.out.println("["+ ANSI_CYAN_BOLD+"LOG"+ANSI_RESET+"]: "+message);
  }

  public static void success(String message) {
    System.out.println(ANSI_GREEN + "✓ " + ANSI_RESET + message);
  }

  public static void warn(String message) {
    System.out.println(ANSI_YELLOW + "! " + ANSI_RESET + message);
  }
}
