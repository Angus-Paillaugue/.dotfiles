package modele;

import java.util.Objects;

public class Charges {
  private int id;
  private float orduresMenageres;
  private float entretienPartiesCommunes;
  private float eclairagePartiesCommunes;
  private float eauPartieFixeAnnuelle;
  private float provisionSurCharge;
  private int indexEau;

  public Charges(
      // float nouvelIndexEau,
      float orduresMenageres,
      float entretienPartiesCommunes,
      float eclairagePartiesCommunes,
      float eauPartieFixe,
      float provisionSurCharge) {
    this.orduresMenageres = orduresMenageres;
    this.entretienPartiesCommunes = entretienPartiesCommunes;
    this.eclairagePartiesCommunes = eclairagePartiesCommunes;
    this.eauPartieFixeAnnuelle = eauPartieFixe;
    this.provisionSurCharge = provisionSurCharge;
  }

  public Charges(
      int id,
      float orduresMenageres,
      float entretienPartiesCommunes,
      float eclairagePartiesCommunes,
      float eauPartieFixe,
      float provisionSurCharge) {
    this.id = id;
    this.orduresMenageres = orduresMenageres;
    this.entretienPartiesCommunes = entretienPartiesCommunes;
    this.eclairagePartiesCommunes = eclairagePartiesCommunes;
    this.eauPartieFixeAnnuelle = eauPartieFixe;
    this.provisionSurCharge = provisionSurCharge;
  }

  @Override
  public String toString() {
    return "Charges [id="
        + id
        + ", orduresMenageres="
        + orduresMenageres
        + ", entretienPartiesCommunes="
        + entretienPartiesCommunes
        + ", eclairagePartiesCommunes="
        + eclairagePartiesCommunes
        + ", eauPartieFixeAnnuelle="
        + eauPartieFixeAnnuelle
        + ", provisionSurCharge="
        + provisionSurCharge
        + "]";
  }

  @Override
  public int hashCode() {
    return Objects.hash(
        eauPartieFixeAnnuelle,
        eclairagePartiesCommunes,
        entretienPartiesCommunes,
        id,
        orduresMenageres,
        provisionSurCharge);
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null) return false;
    if (getClass() != obj.getClass()) return false;
    Charges other = (Charges) obj;
    return Float.floatToIntBits(eauPartieFixeAnnuelle)
            == Float.floatToIntBits(other.eauPartieFixeAnnuelle)
        && Float.floatToIntBits(eclairagePartiesCommunes)
            == Float.floatToIntBits(other.eclairagePartiesCommunes)
        && Float.floatToIntBits(entretienPartiesCommunes)
            == Float.floatToIntBits(other.entretienPartiesCommunes)
        && id == other.id
        && Float.floatToIntBits(orduresMenageres) == Float.floatToIntBits(other.orduresMenageres)
        && Float.floatToIntBits(provisionSurCharge)
            == Float.floatToIntBits(other.provisionSurCharge);
  }

  public int getId() {
    return this.id;
  }

  public float getOrduresMenageres() {
    return this.orduresMenageres;
  }

  public float getEntretienPartiesCommunes() {
    return this.entretienPartiesCommunes;
  }

  public float getEclairagePartiesCommunes() {
    return this.eclairagePartiesCommunes;
  }

  public float getEauPartieFixe() {
    return this.eauPartieFixeAnnuelle;
  }

  public float getProvisionSurCharge() {
    return this.provisionSurCharge;
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setOrduresMenageres(float orduresMenageres) {
    this.orduresMenageres = orduresMenageres;
  }

  public void setEntretienPartiesCommunes(float entretienPartiesCommunes) {
    this.entretienPartiesCommunes = entretienPartiesCommunes;
  }

  public void setEclairagePartiesCommunes(float eclairagePartiesCommunes) {
    this.eclairagePartiesCommunes = eclairagePartiesCommunes;
  }

  public void setEauPartieFixe(float eauPartieFixe) {
    this.eauPartieFixeAnnuelle = eauPartieFixe;
  }

  public float getTotalPartieFixe() {
    return this.getEauPartieFixe()
        + this.getEclairagePartiesCommunes()
        + this.getEntretienPartiesCommunes()
        + this.getOrduresMenageres();
  }

  // Ramène les provisions sur charges mensuelles à un résultat annuel
  public float provisionSurChargeAnnuel() {
    return this.provisionSurCharge * 12;
  }

  // Setter de la nouvelle valeur des provisions sur charge
  public void setProvisionsSurCharges(float nouvelleProvisionsSurCharges) {
    this.provisionSurCharge = nouvelleProvisionsSurCharges;
  }

  public float calculEauVariable(float newIndex, float prix) {
    // TODO Auto-generated method stub
    float total = (newIndex - this.ancienIndexEau) * prix;
    this.ancienIndexEau = newIndex;
    return total;
  }

  // Calcule le restant dû du / des locataires par rapport au prix de la
  // consommation réelle de ceux-ci envers le propriétaire
  // public float restantDu() {
  //   return this.totalCharges() * 12 - this.provisionSurChargeAnnuel();
  // }

  // Calcule la partie variable du prix de l'eau
  // public float eauPartieVariable() {
  //   return this.eauConsommation() * this.prixEau;
  // }

  // Calcule la consommation d'eau du/des locataires sur l'année
  // public float eauConsommation() {
  //   return this.nouvelIndexEau - this.ancienIndexEau;
  // }

  // setter du nouvel index de l'eau
  // public void setNouvelIndexEau(float nouvelIndexEau) {
  //   this.ancienIndexEau = this.nouvelIndexEau;
  //   this.nouvelIndexEau = nouvelIndexEau;
  // }
}
