package modele;

public class Jurisprudence extends Assurance {

	private float quotiteJurisprudence;
	private float montantQuotite;

	public Jurisprudence(typeContratAssurance typeContrat, String nomAssureur, int numeroContrat, float augmentation,
			float quotiteJurisprudence, float montantQuotite) {
		super(typeContrat, nomAssureur, numeroContrat, augmentation);
		this.quotiteJurisprudence = quotiteJurisprudence;
		this.montantQuotite = montantQuotite;
	}

	public float getQuotiteJurisprudence() {
		return quotiteJurisprudence;
	}

	public float getMontantQuotite() {
		return montantQuotite;
	}

	@Override
	public float cout() {
		return this.getMontantQuotite() * this.getQuotiteJurisprudence();
	}

}
