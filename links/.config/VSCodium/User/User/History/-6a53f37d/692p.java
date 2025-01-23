package modele;

public enum ModeDePaiment {
	CB("CB"), VIREMENT("Virement"), CHEQUE("Chèque");

	String description;

	ModeDePaiment(String description) {
		this.description = description;
	}
}
