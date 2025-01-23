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

	// renvoit le numéro de la facture des travaux
	public String getNumeroFacture() {
		return this.numeroFacture;
	}

	// Getter nom de l'entreprise
	public String getNomEntreprise() {
		return this.nomEntreprise;
	}

	// Getter montant
	public float getMontant() {
		return this.montant;
	}

	// Getter Montant non deductible
	public float getMontantNonDeductible() {
		return this.montantNonDeductible;
	}

	// Getter de la reduction
	public float getReduction() {
		return this.reduction;
	}

	// Getter de la date
	public Date getDate() {
		return this.date;
	}

	// Getter de la nature des travaux
	public String getNature() {
		return this.nature;
	}

	// Getter du numero du devis
	public String getNumeroDevis() {
		return this.numeroDevis;
	}

	// calcul du montant à déclaré via le coût des travaux moins le montant non
	// déductible
	public float montantADeclarer() {
		return this.getMontant() - this.getMontantNonDeductible();
	}

}
