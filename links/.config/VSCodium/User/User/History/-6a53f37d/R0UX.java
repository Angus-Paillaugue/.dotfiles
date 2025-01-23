package modele;

import java.util.Arrays;

public enum ModeDePaiment {
	CB("CB"), VIREMENT("Virement"), CHEQUE("Chèque");

	String description;

	ModeDePaiment(String description) {
		this.description = description;
	}

	public static String[] getValues() {
		return Arrays.stream(TypeDeBatiment.values())
				.map(type -> type.description)
				.toArray(String[]::new);
	}
}
