package modele;

import java.util.Arrays;

public enum SituationFamiliale {
	PACS("Pacs"), MARIE("Marié"), CELIBATAIRE("Célibataire"), VEUF("Veuf");

	String description;

	SituationFamiliale(String description) {
		this.description = description;
	}

	public static String[] getNames() {
		return Arrays.stream(SituationFamiliale.class.getEnumConstants())
				.map(Enum::name)
				.toArray(String[]::new);
	}
}
