package modele;

public abstract class Charges {
  private float nouvelIndexEau;
  private float orduresMenageres;
  private float entretienPartiesCommunes;
  private float eclairagePartiesCommunes;
  private float eauPartieFixe;
  private float prixEau;
  private float ancienIndexEau;
  private float provisionSurCharge;

  // Calcule le prix total de l'eau pour un mois en fonction de la consommation de
  // l'utilisateur
  public float totalEau() {
    return (this.prixEau + this.eauPartieFixe) * this.eauConsommation();
  }

  // Calcule le total des charges à payer sur le mois
  public float totalCharges() {
    return this.totalEau() + this.eclairagePartiesCommunes + this.entretienPartiesCommunes + this.orduresMenageres;
  }

  // Ramène les provisions sur charges mensuelles à un résultat annuel
  public float provisionSurChargeAnnuel() {
    return this.provisionSurCharge * 12;
  }

  // Réévalue les provisions sur charges à prévoir pour payer le juste prix des
  // charges
  // au vu de la consommation du / des locataires
  public float propositionNouvelleProvisionSurCharge() {
    return this.totalEau() + this.totalCharges();
  }

  // Calcule le restant dû du / des locataires par rapport au prix de la
  // consommation réelle de ceux-ci envers le propriétaire
  public float restantDu() {
    return this.totalCharges() * 12 - this.provisionSurChargeAnnuel();
  }

  // Calcule la partie variable du prix de l'eau
  public float eauPartieVariable() {
    return Math.abs(this.eauPartieFixe - this.prixEau);
  }

  // Calcule la consommation d'eau du/des locataires
  public float eauConsommation() {
    return this.nouvelIndexEau - this.ancienIndexEau;
  }

}
