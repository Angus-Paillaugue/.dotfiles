package modele;
import java.util.ArrayList;
import java.util.List;
import com.modeliosoft.modelio.javadesigner.annotations.objid;

@objid ("96a4b86a-d706-469c-9eed-7fd20b3b5d4b")
public class Batiment {
    @objid ("d0fe84ff-dd78-48f7-9a79-20233a48fd1a")
    private TypeDeBatiment TypeBatiment;

    @objid ("0bf83825-bbf3-4f79-b2a4-0f9bb8c87ef1")
    private Adresse adresse;

    @objid ("4aeda167-6051-4c10-a2a6-3d0fa55714e6")
    private int numeroFiscal;

    @objid ("fc436336-bfbb-4b9f-a920-2fe6b2917e48")
    private List<BienLouable> biensLouables = new ArrayList<BienLouable> ();

    @objid ("695ef9b5-a665-479f-8ab1-927b83d2de63")
    private List<Travaux> travaux = new ArrayList<Travaux> ();

    @objid ("3c606966-c2c6-4330-a75b-5af92ae59e80")
    private List<Assurance> assurance = new ArrayList<Assurance> ();

    @objid ("630ca968-f41f-4c40-9f9f-40ff9815ae14")
    public Batiment(TypeDeBatiment typeBatiment, Adresse adresse) {
    }

    @objid ("ef08251c-6817-4e55-b423-25bab054e54f")
    public Batiment(TypeDeBatiment typeBatiment, Adresse adresse, int numeroFiscal) {
    }

    @objid ("d245d02f-83a4-462c-84c1-549920d48793")
    public float totalCoutAssurance() {
    }

}
