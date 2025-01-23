package modele;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Proprietaire {
  private String nom;
  private String prenom;
  private Adresse adresse;
  private String mail;
  private String telephone;
  private List<Batiment> batiment;

  public Proprietaire(String nom, String prenom, Adresse adresse, String mail, String telephone) {
    super();
    this.nom = nom;
    this.prenom = prenom;
    this.adresse = adresse;
    this.mail = mail;
    this.telephone = telephone;
    this.batiment = new ArrayList<Batiment>();
  }

  public String getNom() {
    return this.nom;
  }

  public String getPrenom() {
    return this.prenom;
  }

  public Adresse getAdresse() {
    return this.adresse;
  }

  public String getMail() {
    return this.mail;
  }

  public String getTelephone() {
    return this.telephone;
  }

  public List<Batiment> getBatiment() {
    return this.batiment;
  }

  // Permet d'ajouter un batiment à la liste des batiment du propriétaire.
  public void addBatiment(Batiment batiment) {
    this.getBatiment().add(batiment);
  }

  public List<String> adressebiensLouables() {
    List<String> biens = new ArrayList<String>();
    for (Batiment bat : this.getBatiment()) {
      for (BienLouable bien : bat.getBiensLouables()) {
        biens.add(bien.getAdresse().toString());
      }
    }
    return biens;
  }

	public HashMap<Integer,Personne> getLocataires() {
		HashMap<Integer, Personne> locataires = new HashMap<Integer, Personne>();
		for (Batiment bat : this.getBatiment()) {
			for (BienLouable bien : bat.getBiensLouables()) {
				if(bien.isColocation()) {
					locataires.putAll(bien.getLocation().getLocataires());
				} else {
					locataires.addAll(bien.getLocation().getLocataires());
				}
			}
		}
		return locataires;
	}
}
