package modele;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Location {

    public Date dateContrat;
    private Adresse lieuDeContrat;
    private List<Personne> locataires;
    private List<Personne> garants;

    public Location(Personne locataire1, List<Personne> garants, Date dateContrat, Adresse lieuDeContrat) {

    	this.locataires = new ArrayList<Personne> ();
    	this.locataires.add(locataire1);
    	this.garants = new ArrayList<Personne> ();
    	this.dateContrat = dateContrat;
    	this.lieuDeContrat = lieuDeContrat;
    }

    public Location(Personne locataire1, Personne locataire2) {
    }

    public Date getDateContrat() {
		return this.dateContrat;
	}

	public Adresse getLieuDeContrat() {
		return this.lieuDeContrat;
	}

	public List<Personne> getLocataires() {
		return this.locataires;
	}

	public List<Personne> getGarants() {
		return this.garants;
	}

	public void addGarant(Personne garant) {
    	this.garants.add(garant);
    }

    public float TotalRevenusLocataires() {

    	int total = 0;
    	for (Personne l : this.getGarants()) {
    		total += l.totalRevenus();
    	}
    	return total;
    }

}
