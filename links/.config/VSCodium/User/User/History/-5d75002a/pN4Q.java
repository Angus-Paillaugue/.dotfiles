package modele;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Location {

    public Date dateContrat;


    private Adresse lieuDeContrat;


    private List<Personne> locataires = new ArrayList<Personne> ();


    private List<Personne> garants = new ArrayList<Personne> ();


    public Location(Personne locataire1) {
    }


    public Location(Personne locataire1, Personne locataire2) {
    }


    public float TotalRevenus() {
    }

}
