package modele;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Location {

    public Date dateContrat;
    private Adresse lieuDeContrat;
    private List<Personne> locataires;
    private List<Personne> garants;
    private float caution;

    // Constructeur pour une seule personne
    public Location(Personne locataire1, List<Personne> garants, Date dateContrat, Adresse lieuDeContrat, float caution) {

    	this.locataires = new ArrayList<Personne> ();
    	this.locataires.add(locataire1);
    	this.garants = new ArrayList<Personne> ();
    	this.dateContrat = dateContrat;
    	this.lieuDeContrat = lieuDeContrat;
    	this.caution = caution;
    }

    // Contructeur pour deux peronnes
    public Location(Personne locataire1, Personne locataire2, List<Personne> garants, Date dateContrat, Adresse lieuDeContrat, float caution) {
    	this.locataires = new ArrayList<Personne> ();
    	this.locataires.add(locataire1);
    	this.locataires.add(locataire2);
    	this.garants = new ArrayList<Personne> ();
    	this.dateContrat = dateContrat;
    	this.lieuDeContrat = lieuDeContrat;
    	this.caution = caution;

    }

    //Getter de la date du contrat
    public Date getDateContrat() {
		return this.dateContrat;
	}

    //Getter du LieuDeContrat
	public Adresse getLieuDeContrat() {
		return this.lieuDeContrat;
	}

	//Getter de la liste des locataires
	public List<Personne> getLocataires() {
		return this.locataires;
	}

	//Getter de la liste des garants
	public List<Personne> getGarants() {
		return this.garants;
	}

	public float getCaution() {
		return this.caution;
	}

	//Ajouter un garant
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
