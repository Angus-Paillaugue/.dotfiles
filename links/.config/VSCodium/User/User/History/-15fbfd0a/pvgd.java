package modele;

public class Prime extends Assurance {

	private float prime;

	public Prime(typeContratAssurance typeContrat, String nomAssureur, int numeroContrat, float augmentation, float prime) {
		super(typeContrat, nomAssureur, numeroContrat, augmentation);
		this.prime = prime;
	}

	public float getPrime() {
		return this.prime;
	}

	public float cout() {
		return this.getPrime();
	}
}
