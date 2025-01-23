package modele;

import java.util.Date;

public class Loyer {

  private float montantHorsCharge;
  private Date dateVersement;
  private Date dateDerniereRevision;
  private Date dateProchaineRevision;
  private ModeDePaiment modeDePaiment;



  public Loyer(float montantHorsCharge, Date dateVersement, String dateDerniereRevision, Date dateProchaineRevision,
      String modeDePaiment, float provisionSurChargesMensuel) {
    this.montantHorsCharge = montantHorsCharge;
    this.dateVersement = dateVersement;
    this.dateDerniereRevision = dateDerniereRevision;
    this.dateProchaineRevision = dateProchaineRevision;
    this.modeDePaiment = modeDePaiment;
    this.provisionSurChargesMensuel = provisionSurChargesMensuel;
  }

    public Loyer(float montantHorsCharge, int jourVersement, LocalDate dateDerniereRevision, LocalDate dateProchaineRevision,
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

  public String getDateDerniereRevision() {
    return this.dateDerniereRevision;
  }

  public void setMontantHorsCharge(float montantHorsCharge) {
    this.montantHorsCharge = montantHorsCharge;
  }

	public int getDateVersement() {
		return this.dateVersement;
	}

  public void setDateDerniereRevision(String dateDerniereRevision) {
    this.dateDerniereRevision = dateDerniereRevision;
  }

	public LocalDate getDateProchaineRevision() {
		return dateProchaineRevision;
	}

	public ModeDePaiment getModeDePaiment() {
		return modeDePaiment;
	}

}
