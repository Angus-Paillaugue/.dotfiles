package modele;
import java.util.Date;


public class Loyer {

    private float montantHorsCharge;


    private Date dateVersement;


    private String dateDerniereRevision;


    private Date dateProchaineRevision;


    private String modeDePaiment;


    private float provisionSurChargesMensuel;

    public Loyer(float montantHorsCharge, Date dateVersement, String dateDerniereRevision, Date dateProchaineRevision, String modeDePaiment, float provisionSurChargesMensuel) {
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

}
