package DAO;

import modele.Adresse;


public class Proprietaire {
	private Proprietaire proprietaire;

	public Proprietaire(String nom, String prenom, Adresse adresse, String mail, String telephone) {
		this.proprietaire = new Proprietaire(nom, prenom, adresse, mail, telephone);
	}

	public Proprietaire getProprietaire() {
		return this.proprietaire;
	}
}
