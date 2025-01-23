package modele;

public enum ElementEquipementLogement {
	MACHINE_A_LAVER("Machine à laver"),
	REFRIGERATEUR("Réfrigérateur"),
	FOUR("Four"),
	MICRO_ONDES("Micro-ondes"),
	LAVE_VAISSELLE("Lave-vaisselle"),
	SECHE_LINGE("Sèche-linge"),
	TELEVISEUR("Téléviseur"),
	CLIMATISATION("Climatisation");

	private String description;

	ElementEquipementLogement(String description) {
		this.description = description;
	}

	public String getDescription() {
		return description;
	}
}
