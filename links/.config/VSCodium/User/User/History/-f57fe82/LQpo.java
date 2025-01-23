package modele;

import java.util.Arrays;

public enum TypeDeBatiment {
	MAISON("Maison"), IMMEUBLE("Immeuble");

	String description;

	TypeDeBatiment(String description) {
		this.description = description;
	}

	public static String[] getNames() {
		return Arrays.stream(TypeDeBatiment.class.getEnumConstants()).map(Enum::name).toArray(String[]::new);
	}
}
