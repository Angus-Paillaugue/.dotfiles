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

  public String getDescription() {
    return description;
  }

  public static SituationFamiliale fromDescription(String description) {
    return Arrays.stream(SituationFamiliale.values())
        .filter(situation -> situation.getDescription().equalsIgnoreCase(description))
        .findFirst()
        .orElseThrow(
            () ->
                new IllegalArgumentException(
                    "Aucune clé trouvée pour la description : " + description));
  }

  public static String[] getValues() {
    return Arrays.stream(SituationFamiliale.values())
        .map(type -> type.description)
        .toArray(String[]::new);
  }
}
