package dao;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import dao.definitions.PersonneDAODef;
import jdbc.Connector;
import modele.Adresse;
import modele.Personne;
import modele.SituationFamiliale;
import modele.TypeDeContratDeTravail;
import utils.Logger;

public class PersonneDAO implements PersonneDAODef {

  public Personne create(Personne p, int idAdresseNaissance) {
    try {
      Connector db = Connector.getInstance();

      String query =
          "INSERT INTO Personne (id, nom, prenom, dateNaissance, situationFamiliale, profession, employeur, typeContratDeTravail, remunerationMensuelleNette, autreRevenus, email, telephone, idAdresseResidence, adresseNaissance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      int idPersonne =
          db.executeUpdate(
              query,
              Arrays.asList(
                  p.getIdLocataire(),
                  p.getNom(),
                  p.getPrenom(),
                  p.getDateNaissance(),
                  p.getSituationFamiliale().getDescription(),
                  p.getProfession(),
                  p.getEmployeur(),
                  p.getTypeDeContratDeTravail().getDescription(),
                  p.getRemunerationMensuelleNette(),
                  p.getAutresRevenus(),
                  p.getEmail(),
                  p.getTelephone(),
                  p.getAdresse().getId(),
                  idAdresseNaissance));
      p.setIdLocataire(idPersonne);
      return p;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }

  public Personne find(int id) {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT * FROM Personne WHERE id = ?";
      Map<String, Object> result = db.getFirst(query, Arrays.asList(String.valueOf(id)));

      if (result == null) {
        return null;
      }
      AdresseDAO adresseDAO = new AdresseDAO();
      Adresse adresse = adresseDAO.find((int) result.get("idAdresseResidence"));
      Personne p =
          new Personne(
              (String) result.get("nom"),
              (String) result.get("prenom"),
              (int) result.get("id"),
              (LocalDate) LocalDate.parse((String) result.get("dateNaissance")),
              (String) result.get("lieuNaissance"),
              SituationFamiliale.fromDescription((String) result.get("situationFamiliale")),
              (String) result.get("profession"),
              (String) result.get("employeur"),
              TypeDeContratDeTravail.fromDescription((String) result.get("typeContratDeTravail")),
              ((Double) result.get("remunerationMensuelleNette")).floatValue(),
              ((Double) result.get("autreRevenus")).floatValue(),
              (String) result.get("email"),
              (String) result.get("telephone"),
              adresse);

      p.setIdLocataire((int) result.get("id"));

      return p;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }

  public Personne update(Personne p, int idAdresseResidence) {
    try {
      Connector db = Connector.getInstance();
      AdresseDAO adresseDAO = new AdresseDAO();
      adresseDAO.update(p.getAdresse());
      String query =
          "UPDATE Personne SET nom = ?, prenom = ?, dateNaissance = ?, profession = ?, employeur = ?, typeContratDeTravail = ?, remunerationMensuelleNette = ?, autreRevenus = ?, email = ?, telephone = ?, IdAdresseResidence = ?, IdAdresseNaissance = ? WHERE id = ?";
      db.executeUpdate(
          query,
          Arrays.asList(
              p.getNom(),
              p.getPrenom(),
              p.getDateNaissance(),
              p.getProfession(),
              p.getEmployeur(),
              p.getTypeDeContratDeTravail(),
              p.getRemunerationMensuelleNette(),
              p.getAutresRevenus(),
              p.getEmail(),
              p.getTelephone(),
              idAdresseResidence,
              p.getAdresse().getId(),
              p.getIdLocataire()));
      return p;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }

  public List<Personne> findAll() {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT id FROM Personne";
      List<Map<String, Object>> results = db.executeQuery(query, null);

      if (results.size() == 0) {
        return new LinkedList<>();
      }

      List<Personne> personnes = new LinkedList<>();

      for (Map<String, Object> result : results) {
        Personne p = find((int) result.get("id"));
        personnes.add(p);
      }

      return personnes;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return new LinkedList<>();
  }
}
