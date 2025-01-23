package modele;

import java.time.LocalDate;

public class Loyer {

  private float montantHorsCharge;
  private LocalDate dateVersement;
  private LocalDate dateDerniereRevision;
  private LocalDate dateProchaineRevision;
  private ModeDePaiment modeDePaiment;

  public Loyer(float montantHorsCharge, LocalDate dateVersement,
      LocalDate dateDerniereRevision,
      LocalDate dateProchaineRevision,
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

  public LocalDate getDateVersement() {
    return this.dateVersement;
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

  public void setMontantHorsCharge(float montantHorsCharge) {
    this.montantHorsCharge = montantHorsCharge;
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

  public void setDateVersement(LocalDate dateVersement) {
    this.dateVersement = dateVersement;
  }

}
