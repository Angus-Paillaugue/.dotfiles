package utils;

public class Logger {
  public static void handleException(Exception e) {
    System.out.println("✗ " + e.getMessage());
    e.printStackTrace();
  }

  public static void handleException(String message) {
    System.out.println("✗ " + message);
  }

  public static void log(String message) {
    System.out.println("✓ " + message);
  }
}
