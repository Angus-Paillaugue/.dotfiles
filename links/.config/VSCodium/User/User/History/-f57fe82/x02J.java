package modele;

public enum TypeDeBatiment {
	MAISON("Maison"), IMMEUBLE("Immeuble");

	String description;

	TypeDeBatiment(String description) {
		this.description = description;
	}
}
