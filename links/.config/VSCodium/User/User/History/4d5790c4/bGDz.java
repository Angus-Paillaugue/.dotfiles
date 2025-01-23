package modele;

import java.util.Date;

public class Travaux {

	private String numeroFacture;
	private String nomEntreprise;
	private float montant;
	private float montantNonDeductible;
	private float reduction;
	private Date date;
	private String nature;
	private String numeroDevis;

	// Constructeur
	public Travaux(String numeroFacture, String nomEntreprise, float montant, float montantNonDeductible,
			float reduction, Date date, String nature, String numeroDevis) {
		this.numeroFacture = numeroFacture;
		this.nomEntreprise = nomEntreprise;
		this.montant = montant;
		this.montantNonDeductible = montantNonDeductible;
		this.reduction = reduction;
		this.date = date;
		this.nature = nature;
		this.numeroDevis = numeroDevis;
	}

	public String getNumeroFacture() {
		return this.numeroFacture;
	}

	public String getNomEntreprise() {
		return this.nomEntreprise;
	}

	public float getMontant() {
		return this.montant;
	}

	public float getMontantNonDeductible() {
		return this.montantNonDeductible;
	}

	public float getReduction() {
		return this.reduction;
	}

	public Date getDate() {
		return this.date;
	}

	public String getNature() {
		return this.nature;
	}

	public String getNumeroDevis() {
		return this.numeroDevis;
	}

	public float montantADeclarer() {
		return this.getMontant() - this.getMontantNonDeductible();
	}

}
