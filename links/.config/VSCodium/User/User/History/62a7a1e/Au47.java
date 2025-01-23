package jcdb;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Auth {
  public static String hashPassword(String password) {
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    return passwordEncoder.encode(password);
  }
}
