package DAO;

import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import jcdb.Connector;
import modele.Adresse;
import modele.Proprietaire;


public class ProprietaireDAO {
	private Proprietaire proprietaire;

	public ProprietaireDAO(String nom, String prenom, Adresse adresse, String mail, String telephone) {
		this.proprietaire = new Proprietaire(nom, prenom, adresse, mail, telephone);
	}

	public Proprietaire getProprietaire() {
		return this.proprietaire;
		try {
 	  	Connector db = Connector.getInstance();
			String query = "SELECT * FROM users WHERE nom = ? AND prenom = ?;";
			List<Map<String, Object>> results = db.executeQuery(query,
			Arrays.asList(this.proprietaire.getNom(), this.proprietaire.getPrenom()));
			results.forEach(System.out::println);
			db.closeConnection();
		} catch (SQLException e) {
			System.out.println("✗ "+e.getMessage());
		}
	}

	public void update(Proprietaire proprietaire) {
		this.proprietaire = proprietaire;
	}

	public void delete() {
		this.proprietaire = null;
	}

	public void create(Proprietaire proprietaire) {
		this.proprietaire = proprietaire;
	}
}
