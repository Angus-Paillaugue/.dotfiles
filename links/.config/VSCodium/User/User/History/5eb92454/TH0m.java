package utils;

public class ErrorHandling {
  public static void handleException(Exception e) {
    System.out.println("✗ " + e.getMessage());
    e.printStackTrace();
  }
}
