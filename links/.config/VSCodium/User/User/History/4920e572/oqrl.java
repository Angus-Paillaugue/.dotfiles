package modele;

import java.util.Date;

public class Loyer {

  private float montantHorsCharge;
  private Date dateVersement;
  private String dateDerniereRevision;
  private Date dateProchaineRevision;
  private String modeDePaiment;
  private float provisionSurChargesMensuel;

  public Loyer(float montantHorsCharge, Date dateVersement, String dateDerniereRevision, Date dateProchaineRevision,
      String modeDePaiment, float provisionSurChargesMensuel) {
    this.montantHorsCharge = montantHorsCharge;
    this.dateVersement = dateVersement;
    this.dateDerniereRevision = dateDerniereRevision;
    this.dateProchaineRevision = dateProchaineRevision;
    this.modeDePaiment = modeDePaiment;
    this.provisionSurChargesMensuel = provisionSurChargesMensuel;
  }

  public float loyerCC() {
    return this.montantHorsCharge + this.provisionSurChargesMensuel;
  }

  public float getMontantHorsCharge() {
    return this.montantHorsCharge;
  }

  public Date getDateVersement() {
    return this.dateVersement;
  }

  public String getDateDerniereRevision() {
    return this.dateDerniereRevision;
  }

  public Date getDateProchaineRevision() {
    return this.dateProchaineRevision;
  }

  public String getModeDePaiment() {
    return this.modeDePaiment;
  }

  public float getProvisionSurChargesMensuel() {
    return this.provisionSurChargesMensuel;
  }

  public void setMontantHorsCharge(float montantHorsCharge) {
    this.montantHorsCharge = montantHorsCharge;
  }

  public void setDateVersement(Date dateVersement) {
    this.dateVersement = dateVersement;
  }

  public void setDateDerniereRevision(String dateDerniereRevision) {
    this.dateDerniereRevision = dateDerniereRevision;
  }

  public void setDateProchaineRevision(Date dateProchaineRevision) {
    this.dateProchaineRevision = dateProchaineRevision;
  }

  public void setModeDePaiment(String modeDePaiment) {
    this.modeDePaiment = modeDePaiment;
  }

  public void setProvisionSurChargesMensuel(float provisionSurChargesMensuel) {
    this.provisionSurChargesMensuel = provisionSurChargesMensuel;
  }

}
