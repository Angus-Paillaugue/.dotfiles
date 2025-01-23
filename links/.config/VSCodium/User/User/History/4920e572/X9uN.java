package modele;

import java.util.Date;

public class Loyer {

  private float montantHorsCharge;
  private Date dateVersement;
  private Date dateDerniereRevision;
  private Date dateProchaineRevision;
  private ModeDePaiment modeDePaiment;

  public Loyer(float montantHorsCharge, Date dateVersement,
      Date dateDerniereRevision, Date dateProchaineRevision,
      ModeDePaiment modeDePaiment, float provisionSurChargesMensuel) {
    this.montantHorsCharge = montantHorsCharge;
    this.dateVersement = dateVersement;
    this.dateDerniereRevision = dateDerniereRevision;
    this.dateProchaineRevision = dateProchaineRevision;
    this.modeDePaiment = modeDePaiment;
    this.provisionSurChargesMensuel = provisionSurChargesMensuel;
  }

  public Loyer(float montantHorsCharge, Date dateVersement, Date dateDerniereRevision, Date dateProchaineRevision,
      ModeDePaiment modeDePaiment) {
    this.montantHorsCharge = montantHorsCharge;
    this.dateVersement = dateVersement;
    this.dateDerniereRevision = dateDerniereRevision;
    this.dateProchaineRevision = dateProchaineRevision;
    this.modeDePaiment = modeDePaiment;
  }

  public float getMontantHorsCharge() {
    return this.montantHorsCharge;
  }

  public Date getDateVersement() {
    return this.dateVersement;
  }

  public Date getDateDerniereRevision() {
    return this.dateDerniereRevision;
  }

  public Date getDateProchaineRevision() {
    return dateProchaineRevision;
  }

  public ModeDePaiment getModeDePaiment() {
    return modeDePaiment;
  }

  public void setMontantHorsCharge(float montantHorsCharge) {
    this.montantHorsCharge = montantHorsCharge;
  }

  public void setDateDerniereRevision(Date dateDerniereRevision) {
    this.dateDerniereRevision = dateDerniereRevision;
  }

}
