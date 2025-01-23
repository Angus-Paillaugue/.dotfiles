package utils;

import java.util.HashMap;
import java.util.Map;

/**
 * The Logger class provides methods to log messages with different levels of severity. It supports
 * logging error, success, warning, and general log messages with ANSI color codes.
 */
public class Logger {
  private static final String ANSI_RESET = "\u001B[0m";
  private static final String ANSI_RED = "\u001B[31m";
  private static final String ANSI_GREEN = "\u001B[32m";
  private static final String ANSI_YELLOW = "\u001B[33m";
  private static final String ANSI_CYAN_BOLD = "\033[1;36m";
	private static final Map<String, String> ANSI_COLORS = new HashMap<String, String>() {
		{
			put("reset", "\u001B[0m");
			put("red", "\u001B[31m");
			put("green", "\u001B[32m");
			put("yellow", "\u001B[33m");
			put("cyan_bold", "\033[1;36m");
		}
	};

  /**
   * Logs an error message to the console with red color formatting.
   *
   * @param e the exception whose message will be logged
   */
  public static void error(Exception e) {
    System.out.println(ANSI_RED + "✗ " + ANSI_RESET + (e.getMessage() == null ? e.toString() : e.getMessage()));
  }

  /**
   * Logs an error message to the console with red color formatting.
   *
   * @param e the exception whose message will be logged
   */
  public static void error(String message) {
    System.out.println(ANSI_RED + "✗ " + ANSI_RESET + message);
  }

  /**
   * Logs a message to the console with a specific format.
   *
   * @param message the message to be logged
   */
  public static void log(String message) {
    System.out.println("[" + ANSI_CYAN_BOLD + "LOG" + ANSI_RESET + "]: " + message);
  }

  /**
   * Logs a success message to the console with a green checkmark.
   *
   * @param message The success message to be logged.
   */
  public static void success(String message) {
    System.out.println(ANSI_GREEN + "✓ " + ANSI_RESET + message);
  }

  /**
   * Logs a warning message to the console with a yellow color.
   *
   * @param message The warning message to be logged.
   */
  public static void warn(String message) {
    System.out.println(ANSI_YELLOW + "! " + ANSI_RESET + message);
  }
}
