package modele;

import java.time.LocalDate;
import java.util.Objects;

public class Loyer {
  @Override
  public int hashCode() {
    return Objects.hash(
        dateDerniereRevision,
        dateProchaineRevision,
        id,
        idBienLouable,
        jourVersement,
        modeDePaiment,
        montantHorsCharge,
        provisionSurChargesMensuel);
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null) return false;
    if (getClass() != obj.getClass()) return false;
    Loyer other = (Loyer) obj;
    return Objects.equals(dateDerniereRevision, other.dateDerniereRevision)
        && Objects.equals(dateProchaineRevision, other.dateProchaineRevision)
        && Objects.equals(id, other.id)
        && Objects.equals(idBienLouable, other.idBienLouable)
        && Objects.equals(jourVersement, other.jourVersement)
        && Objects.equals(modeDePaiment, other.modeDePaiment)
        && Float.floatToIntBits(montantHorsCharge) == Float.floatToIntBits(other.montantHorsCharge)
        && Float.floatToIntBits(provisionSurChargesMensuel)
            == Float.floatToIntBits(other.provisionSurChargesMensuel);
  }

  private int id;
  private int idBienLouable;
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
      ModeDePaiment modeDePaiment,
      int idBienLouable) {
    this.id = id;
    this.montantHorsCharge = montantHorsCharge;
    this.jourVersement = jourVersement;
    this.dateDerniereRevision = dateDerniereRevision;
    this.dateProchaineRevision = dateProchaineRevision;
    this.modeDePaiment = modeDePaiment;
    this.idBienLouable = idBienLouable;
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

  public void setId(int id) {
    this.id = id;
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

  public void setIdBienLouable(int id) {
    this.id = id;
  }

  @Override
  public String toString() {
    return "Loyer [id="
        + id
        + ", dateDerniereRevision="
        + dateDerniereRevision
        + ", dateProchaineRevision="
        + dateProchaineRevision
        + ", jourVersement="
        + jourVersement
        + ", modeDePaiment="
        + modeDePaiment
        + ", montantHorsCharge="
        + montantHorsCharge
        + ", idBienLouable="
        + idBienLouable
        + "]";
  }
}
