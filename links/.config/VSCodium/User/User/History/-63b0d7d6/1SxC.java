package modele;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Colocation {

	private Map<Personne,List<Object>> colocataires;


    //Constructeur Colocation
    public Colocation() {
		this.colocataires = new HashMap<>();
	}

  //Getter de la map des colocataire
    public Map<Personne, List<Object>> getColocataires() {
		return colocataires;
	}
    //getter des garants d'un colocataire donné
    public List<Personne> getGarants(Personne coloc) {
    	return (List<Personne>) this.colocataires.get(coloc).get(0);
    }
    //getter de la date de Contrat d'un colocataire donné
    public Date getDateContrat(Personne coloc) {
    	return (Date) this.colocataires.get(coloc).get(1);
    }

    //getter de la durée d'un colocataire donné
    public int getDuree(Personne coloc) {
    	return (int) this.colocataires.get(coloc).get(2);
    }

    //getter du lieudeCOntrat d'un colocataire donné
    public String getLieuDeContrat(Personne coloc) {
    	return (String) this.colocataires.get(coloc).get(3);
    }

    //A Implementer
	public void addColoc(Personne colocataire,List<Personne> garants, Date dateContrat, int duree, String lieuDeContrat) {
		List<Object> informations = new ArrayList<>();
		informations.add(garants);
		informations.add(dateContrat);
		informations.add(duree);
		informations.add(lieuDeContrat);
		this.colocataires.put(colocataire, informations);
    }



	//A Implementer
    public void delColoc(Personne coloc) {
    	this.colocataires.remove(coloc);
    }

}
