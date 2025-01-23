package modele;

import java.util.Arrays;

public enum TypeDeBatiment {
	MAISON("Maison"), IMMEUBLE("Immeuble");

	String description;

	TypeDeBatiment(String description) {
		this.description = description;
	}

	    public static String[] getDescriptions() {
        return Arrays.stream(TypeDeBatiment.values())
                     .map(type -> type.description)
                     .toArray(String[]::new);
    }
}
