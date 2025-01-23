
public class Charges {

  private int provisionSurCharge;

  private int totalEau;

  private int totalCharges;

  private int provisionSurChargeAnnuel;

  private int propositionNouvelleProvisionSurCharge;

  private int restantDu;

  private int eauPartieVariable;

  private int eauConsommation;



  public Charges(int provisionSurCharge, int totalEau, int totalCharges, int provisionSurChargeAnnuel, int propositionNouvelleProvisionSurCharge, int restantDu, int eauPartieVariable, int eauConsommation) {

    this.provisionSurCharge = provisionSurCharge;

    this.totalEau = totalEau;

    this.totalCharges = totalCharges;

    this.provisionSurChargeAnnuel = provisionSurChargeAnnuel;

    this.propositionNouvelleProvisionSurCharge = propositionNouvelleProvisionSurCharge;

    this.restantDu = restantDu;

    this.eauPartieVariable = eauPartieVariable;

    this.eauConsommation = eauConsommation;

  }



  public int getProvisionSurCharge() {

    return provisionSurCharge;

  }



  public int totalEau() {

    return totalEau;

  }



  public int totalCharges() {

    return totalCharges;

  }



  public int provisionSurChargeAnnuel() {

    return provisionSurChargeAnnuel;

  }



  public int propositionNouvelleProvisionSurCharge() {

    return propositionNouvelleProvisionSurCharge;

  }



  public int restantDu() {

    return restantDu;

  }



  public int eauPartieVariable() {

    return eauPartieVariable;

  }



  public int eauConsommation() {

    return eauConsommation;

  }



  public void setNouvelIndexEau(int nouvelIndexEau) {

    this.eauConsommation = nouvelIndexEau - this.eauConsommation;

  }

}
