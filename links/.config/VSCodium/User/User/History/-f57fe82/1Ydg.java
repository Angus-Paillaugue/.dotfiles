package modele;

import java.util.Arrays;

public enum TypeDeBatiment {
	MAISON, IMMEUBLE;

		public static String[] getNames() {
		return Arrays.stream(ModeDePaiment.class.getEnumConstants()).map(Enum::name).toArray(String[]::new);
	}
}
