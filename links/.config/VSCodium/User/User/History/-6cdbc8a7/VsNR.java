package modele;

import java.util.ArrayList;
import java.util.List;

public class Batiment {

    private TypeDeBatiment TypeBatiment;
    private Adresse adresse;
    private int numeroFiscal;
    private List<BienLouable> biensLouables = new ArrayList<BienLouable> ();
    private List<Travaux> travaux = new ArrayList<Travaux> ();
    private List<Assurance> assurance = new ArrayList<Assurance> ();

    public Batiment(TypeDeBatiment typeBatiment, Adresse adresse) {
    }

    public Batiment(TypeDeBatiment typeBatiment, Adresse adresse, int numeroFiscal) {
    }

    public float totalCoutAssurance() {
    	return 0F;
    }

}
