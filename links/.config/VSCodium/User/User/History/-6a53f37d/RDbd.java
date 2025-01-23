package modele;

import java.util.Arrays;

public enum ModeDePaiment {
	CB("CB"), VIREMENT("Virement"), CHEQUE("Chèque");

	String description;

	ModeDePaiment(String description) {
		this.description = description;
	}

	public static String[] getNames() {
		return Arrays.stream(ModeDePaiment.class.getEnumConstants())
				.map(Enum::name)
				.toArray(String[]::new);
	}
}
