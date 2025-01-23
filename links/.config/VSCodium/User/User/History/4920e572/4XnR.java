package modele;

<<<<<<< HEAD
import java.util.Date;

public class Loyer {

  private float montantHorsCharge;
  private Date dateVersement;
  private String dateDerniereRevision;
  private Date dateProchaineRevision;
  private String modeDePaiment;
  private float provisionSurChargesMensuel;
=======
import java.time.LocalDate;

public class Loyer {

    private float montantHorsCharge;
    private int jourVersement;
    private LocalDate dateDerniereRevision;
    private LocalDate dateProchaineRevision;
    private ModeDePaiment modeDePaiment;


>>>>>>> 8807d31344faf786f8b7a71fd411e939266f6793

  public Loyer(float montantHorsCharge, Date dateVersement, String dateDerniereRevision, Date dateProchaineRevision,
      String modeDePaiment, float provisionSurChargesMensuel) {
    this.montantHorsCharge = montantHorsCharge;
    this.dateVersement = dateVersement;
    this.dateDerniereRevision = dateDerniereRevision;
    this.dateProchaineRevision = dateProchaineRevision;
    this.modeDePaiment = modeDePaiment;
    this.provisionSurChargesMensuel = provisionSurChargesMensuel;
  }

<<<<<<< HEAD
  public float loyerCC() {
    return this.montantHorsCharge + this.provisionSurChargesMensuel;
  }
=======
    public Loyer(float montantHorsCharge, int jourVersement, LocalDate dateDerniereRevision, LocalDate dateProchaineRevision,
    		ModeDePaiment modeDePaiment) {
		this.montantHorsCharge = montantHorsCharge;
		this.jourVersement = jourVersement;
		this.dateDerniereRevision = dateDerniereRevision;
		this.dateProchaineRevision = dateProchaineRevision;
		this.modeDePaiment = modeDePaiment;
	}
>>>>>>> 8807d31344faf786f8b7a71fd411e939266f6793

  public float getMontantHorsCharge() {
    return this.montantHorsCharge;
  }

<<<<<<< HEAD
  public Date getDateVersement() {
    return this.dateVersement;
  }
=======
>>>>>>> 8807d31344faf786f8b7a71fd411e939266f6793

  public String getDateDerniereRevision() {
    return this.dateDerniereRevision;
  }

<<<<<<< HEAD
  public Date getDateProchaineRevision() {
    return this.dateProchaineRevision;
  }
=======
	public float getMontantHorsCharge() {
		return montantHorsCharge;
	}
>>>>>>> 8807d31344faf786f8b7a71fd411e939266f6793

  public String getModeDePaiment() {
    return this.modeDePaiment;
  }

<<<<<<< HEAD
  public float getProvisionSurChargesMensuel() {
    return this.provisionSurChargesMensuel;
  }
=======
>>>>>>> 8807d31344faf786f8b7a71fd411e939266f6793

  public void setMontantHorsCharge(float montantHorsCharge) {
    this.montantHorsCharge = montantHorsCharge;
  }

<<<<<<< HEAD
  public void setDateVersement(Date dateVersement) {
    this.dateVersement = dateVersement;
  }
=======
	public int getJourVersement() {
		return jourVersement;
	}
>>>>>>> 8807d31344faf786f8b7a71fd411e939266f6793

  public void setDateDerniereRevision(String dateDerniereRevision) {
    this.dateDerniereRevision = dateDerniereRevision;
  }

<<<<<<< HEAD
  public void setDateProchaineRevision(Date dateProchaineRevision) {
    this.dateProchaineRevision = dateProchaineRevision;
  }

  public void setModeDePaiment(String modeDePaiment) {
    this.modeDePaiment = modeDePaiment;
  }

  public void setProvisionSurChargesMensuel(float provisionSurChargesMensuel) {
    this.provisionSurChargesMensuel = provisionSurChargesMensuel;
  }
=======


	public LocalDate getDateDerniereRevision() {
		return dateDerniereRevision;
	}




	public LocalDate getDateProchaineRevision() {
		return dateProchaineRevision;
	}




	public ModeDePaiment getModeDePaiment() {
		return modeDePaiment;
	}





>>>>>>> 8807d31344faf786f8b7a71fd411e939266f6793

}
