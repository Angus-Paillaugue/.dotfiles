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

  public Personne create(Personne p, int idAdresseResidence, int idLocation, int idColocation) {
    try {
      Connector db = Connector.getInstance();
      AdresseDAO adresseDAO = new AdresseDAO();
      p.setAdresse(adresseDAO.create(p.getAdresse()));

      String query =
          "INSERT INTO Personne (nom, prenom, dateNaissance, situationFamiliale, profession, employeur, typeContratDeTravail, remunerationMensuelleNette, autreRevenus, email, telephone, idLocation, idCoLocation, idAdresseResidence, idAdresseNaissance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      int idPersonne =
          db.executeUpdate(
              query,
              Arrays.asList(
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
                  idLocation,
                  idColocation,
                  idAdresseResidence,
                  p.setAdresse(null);));
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
      String query = "SELECT * FROM Personne";
      List<Map<String, Object>> results = db.executeQuery(query, null);

      if (results == null) {
        return null;
      }

      AdresseDAO adresseDAO = new AdresseDAO();
      List<Personne> personnes =
          results.stream()
              .map(
                  result -> {
                    Adresse adresse = adresseDAO.find((int) result.get("IdAdresseResidence"));
                    Personne p =
                        new Personne(
                            (String) result.get("nom"),
                            (String) result.get("prenom"),
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
                    p.setIdLocataire((int) result.get("id"));
                    return p;
                  })
              .collect(Collectors.toList());

      return personnes;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }
}
