package dao;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jdbc.Connector;
import modele.Adresse;
import modele.Personne;
import modele.SituationFamiliale;
import modele.TypeDeContratDeTravail;
import utils.Logger;

public class PersonneDAO {

  public int create(Personne p, int idAdresseResidence) {
    try {
      Connector db = Connector.getInstance();
      AdresseDAO adresseDAO = new AdresseDAO();
      int idAdresse = adresseDAO.create(p.getAdresse());

      String query =
          "INSERT INTO Personne (nom, prenom, dateNaissance, profession, employeur, typeContratDeTravail, remunerationMensuelleNette, autreRevenus, email, telephone, id_1, id_2, IdAdresseResidence, IdAdresseNaissance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      int idPersonne =
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
                  p.getIdLocataire(),
                  p.getIdLocataire(),
                  idAdresseResidence,
                  idAdresse));

      return idPersonne;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return -1;
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
      Adresse adresse = adresseDAO.find((int) result.get("IdAdresseResidence"));
      Personne p =
          new Personne(
              (String) result.get("nom"),
              (String) result.get("prenom"),
              (int) result.get("id"),
              (LocalDate) result.get("dateNaissance"),
              (String) result.get("lieuNaissance"),
              (SituationFamiliale) result.get("situationFamiliale"),
              (String) result.get("profession"),
              (String) result.get("employeur"),
              (TypeDeContratDeTravail) result.get("typeContratDeTravail"),
              (float) result.get("remunerationMensuelleNette"),
              (float) result.get("autreRevenus"),
              (String) result.get("email"),
              (String) result.get("telephone"),
              adresse);

      return p;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }

  public void update(Personne p, int idAdresseResidence) {
    try {
      Connector db = Connector.getInstance();
      AdresseDAO adresseDAO = new AdresseDAO();
      adresseDAO.update(p.getAdresse());
      String query =
          "UPDATE Personne SET nom = ?, prenom = ?, dateNaissance = ?, profession = ?, employeur = ?, typeContratDeTravail = ?, remunerationMensuelleNette = ?, autreRevenus = ?, email = ?, telephone = ?, id_1 = ?, id_2 = ?, IdAdresseResidence = ?, IdAdresseNaissance = ? WHERE id = ?";
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
              p.getIdLocataire(),
              p.getIdLocataire(),
              idAdresseResidence,
              p.getAdresse().getId(),
              p.getId()));
    } catch (SQLException e) {
      Logger.error(e);
    }
  }

  public void delete(int id) {
    try {
      Connector db = Connector.getInstance();
      String query = "DELETE FROM Personne WHERE id = ?";
      db.executeUpdate(query, Arrays.asList(String.valueOf(id)));
    } catch (SQLException e) {
      Logger.error(e);
    }
  }

  public List<Personne> findAll() {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT * FROM Personne";
      List<Map<String, Object>> results = db.executeQuery(query, null);
      db.closeConnection();

      if (results == null) {
        return null;
      }

      AdresseDAO adresseDAO = new AdresseDAO();
      List<Personne> personnes =
          results.stream()
              .map(
                  result -> {
                    Adresse adresse = adresseDAO.find((int) result.get("IdAdresseResidence"));
                    return new Personne(
                        (String) result.get("nom"),
                        (String) result.get("prenom"),
                        (int) result.get("id"),
                        (LocalDate) result.get("dateNaissance"),
                        (String) result.get("lieuNaissance"),
                        (SituationFamiliale) result.get("situationFamiliale"),
                        (String) result.get("profession"),
                        (String) result.get("employeur"),
                        (TypeDeContratDeTravail) result.get("typeContratDeTravail"),
                        (float) result.get("remunerationMensuelleNette"),
                        (float) result.get("autreRevenus"),
                        (String) result.get("email"),
                        (String) result.get("telephone"),
                        adresse);
                  })
              .collect(Collectors.toList());

      return personnes;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }
}
