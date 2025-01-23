package modele;

import java.time.LocalDate;

public class Loyer {

  private float montantHorsCharge;
  private int jourVersement;
  private LocalDate dateDerniereRevision;
  private LocalDate dateProchaineRevision;
  private ModeDePaiment modeDePaiment;

  public Loyer(float montantHorsCharge, int jourVersement,
      LocalDate dateDerniereRevision,
      LocalDate dateProchaineRevision,
      ModeDePaiment modeDePaiment) {
    this.montantHorsCharge = montantHorsCharge;
    this.jourVersement = jourVersement;
    this.dateDerniereRevision = dateDerniereRevision;
    this.dateProchaineRevision = dateProchaineRevision;
    this.modeDePaiment = modeDePaiment;
  }

  public float getMontantHorsCharge() {
    return this.montantHorsCharge;
  }

  public int getDateVersement() {
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

  public void setDateVersement(int jourVersement) {
    this.jourVersement = jourVersement;
  }

}
