package modele;

public abstract class Assurance {

	private typeContratAssurance typeContrat;
	private String nomAssureur;
	private int numeroContrat;
	private float augmentation;

	public Assurance(typeContratAssurance typeContrat, String nomAssureur, int numeroContrat, float augmentation) {
		this.typeContrat = typeContrat;
		this.nomAssureur = nomAssureur;
		this.numeroContrat = numeroContrat;
		this.augmentation = augmentation;
	}

	public typeContratAssurance getTypeContrat() {
		return this.typeContrat;
	}

	public String getNomAssureur() {
		return this.nomAssureur;
	}

	public int getNumeroContrat() {
		return this.numeroContrat;
	}

	public float getAugmentation() {
		return this.augmentation;
	}

	public abstract float cout();

}
