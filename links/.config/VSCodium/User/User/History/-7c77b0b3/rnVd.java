package DAO;

import java.util.ArrayList;
import java.util.List;
import modele.Batiment;
import modele.BienLouable;
import modele.Adresse;


public class Proprietaire {
	private Proprietaire proprietaire;

	public Proprietaire(String nom, String prenom, Adresse adresse, String mail, String telephone) {
		this.proprietaire = new Proprietaire(nom, prenom, adresse, mail, telephone);
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
}
