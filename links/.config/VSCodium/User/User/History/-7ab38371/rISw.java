package modele;

import java.util.Arrays;

public enum noteEnergetique {
  A,
  B,
  C,
  D,
  E,
  F,
  G;

  public static String[] getNames() {
    return Arrays.stream(noteEnergetique.class.getEnumConstants())
        .map(Enum::name)
        .toArray(String[]::new);
  }
}
