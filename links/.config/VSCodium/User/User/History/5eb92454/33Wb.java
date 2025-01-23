package utils;

public class ErrorHandling {
  public static void handleException(Exception e) {
    System.out.println("An error occurred: " + e.getMessage());
    e.printStackTrace();
  }
}
