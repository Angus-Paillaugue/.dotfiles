package modele;

import java.util.Arrays;

public enum TypeDeContratDeTravail {
	CDD, CDI, INTERIM, STAGE, ALTERNANCE;

	public static String[] getNames() {
		return Arrays.stream(TypeDeContratDeTravail.class.getEnumConstants()).map(Enum::name).toArray(String[]::new);
	}
}
