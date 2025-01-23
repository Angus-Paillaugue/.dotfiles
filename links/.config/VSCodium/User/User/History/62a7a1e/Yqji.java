package jcdb;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.password4j.BcryptFunction;
import com.password4j.Hash;
import com.password4j.Password;
import com.password4j.types.Bcrypt;

public class Auth {
  public static String hashPassword(String password) {
    BcryptFunction bcrypt = BcryptFunction.getInstance(Bcrypt.B, 12);

Hash hash = Password.hash("my password")
                    .addPepper("shared-secret")
                    .with(bcrypt);

hash.getResult();
  }

  public static boolean verifyPassword(String inputPassword, String storedHash) {
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    return encoder.matches(inputPassword, storedHash);
  }
}
