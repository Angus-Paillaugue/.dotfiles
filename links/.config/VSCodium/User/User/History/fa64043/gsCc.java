package modele;

import java.util.Arrays;

public enum SituationFamiliale {
  PACS("Pacs"),
  MARIE("Marié"),
  CELIBATAIRE("Célibataire"),
  VEUF("Veuf");

  String description;

  SituationFamiliale(String description) {
    this.description = description;
  }

  public static String[] getValues() {
    return Arrays.stream(SituationFamiliale.values())
        .map(type -> type.description)
        .toArray(String[]::new);
  }
}
