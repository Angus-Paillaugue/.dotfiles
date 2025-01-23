package modele;

import java.time.LocalDate;

public class Loyer {
  private int id;
  private float montantHorsCharge;
  private int jourVersement;
  private LocalDate dateDerniereRevision;
  private LocalDate dateProchaineRevision;
  private ModeDePaiment modeDePaiment;

  public Loyer(
      float montantHorsCharge,
      int jourVersement,
      LocalDate dateDerniereRevision,
      LocalDate dateProchaineRevision,
      ModeDePaiment modeDePaiment) {
    this.montantHorsCharge = montantHorsCharge;
    this.jourVersement = jourVersement;
    this.dateDerniereRevision = dateDerniereRevision;
    this.dateProchaineRevision = dateProchaineRevision;
    this.modeDePaiment = modeDePaiment;
  }

  public Loyer(
    int id,
      float montantHorsCharge,
      int jourVersement,
      LocalDate dateDerniereRevision,
      LocalDate dateProchaineRevision,
      ModeDePaiment modeDePaiment) {
    this.id = id;
    this.montantHorsCharge = montantHorsCharge;
    this.jourVersement = jourVersement;
    this.dateDerniereRevision = dateDerniereRevision;
    this.dateProchaineRevision = dateProchaineRevision;
    this.modeDePaiment = modeDePaiment;
  }

  public int getId() {
    return this.id;
  }

  public float getMontantHorsCharge() {
    return this.montantHorsCharge;
  }

  public int getJourVersement() {
    return this.jourVersement;
  }

  public LocalDate getDateDerniereRevision() {
    return this.dateDerniereRevision;
  }

  public LocalDate getDateProchaineRevision() {
    return dateProchaineRevision;
  }

  public ModeDePaiment getModeDePaiment() {
    return modeDePaiment;
  }

  public void setDateDerniereRevision(LocalDate dateDerniereRevision) {
    this.dateDerniereRevision = dateDerniereRevision;
  }

  public void setDateProchaineRevision(LocalDate dateProchaineRevision) {
    this.dateProchaineRevision = dateProchaineRevision;
  }

  public void setModeDePaiment(ModeDePaiment modeDePaiment) {
    this.modeDePaiment = modeDePaiment;
  }

  private float provisionSurChargesMensuel;

  public void setMontantHorsCharge(float montant) {
    this.montantHorsCharge = montant;
  }

  public void setProvisionSurChargeMensuel(float provision) {
    this.provisionSurChargesMensuel = provision;
  }

  public float loyerCC() {
    return montantHorsCharge + provisionSurChargesMensuel;
  }

  public void setDateVersement(int jourVersement) {
    this.jourVersement = jourVersement;
  }

  @Override
  public String toString() {
    return "Loyer [dateDerniereRevision="
        + dateDerniereRevision
        + ", dateProchaineRevision="
        + dateProchaineRevision
        + ", jourVersement="
        + jourVersement
        + ", modeDePaiment="
        + modeDePaiment
        + ", montantHorsCharge="
        + montantHorsCharge
        + "]";
  }
}
