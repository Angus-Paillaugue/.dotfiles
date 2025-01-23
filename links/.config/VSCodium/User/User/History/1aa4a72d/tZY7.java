package dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import dao.definitions.ProprietaireDAODef;
import modele.Adresse;
import modele.Batiment;
import modele.Logement;
import modele.Proprietaire;
import modele.TypeDeBatiment;
import utils.Logger;
import jdbc.Connector;

public class ProprietaireDAO implements ProprietaireDAODef {

  public Proprietaire create(Proprietaire proprietaire) {
    try {
      Connector db = Connector.getInstance();
      proprietaire.setAdresse(new AdresseDAO().create(proprietaire.getAdresse()));
      String query =
          "INSERT INTO Proprietaire (nom, prenom, mail, telephone, hashMotDePasse, idAdresse) VALUES (?, ?, ?, ?, ?, ?)";
      int idProprietaire =
          db.executeUpdate(
              query,
              Arrays.asList(
                  proprietaire.getNom(),
                  proprietaire.getPrenom(),
                  proprietaire.getMail(),
                  proprietaire.getTelephone(),
                  proprietaire.getPasswordHash(),
                  proprietaire.getAdresse().getId()));

      proprietaire.setId(idProprietaire);

      return proprietaire;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }

  public Proprietaire find(int id) {
    try {
      Connector db = Connector.getInstance();
      String query =
          "SELECT P.*, A.* FROM Proprietaire P JOIN Adresse A ON P.idAdresse = A.id WHERE P.id = ?;";
      Map<String, Object> row = db.getFirst(query, Arrays.asList(id));
      if (row == null) {
        return null;
      }

      Adresse adresseProprio = new AdresseDAO().find((int) row.get("idAdresse"));
      Proprietaire proprietaire =
          new Proprietaire(
              (int) row.get("id"),
              (String) row.get("nom"),
              (String) row.get("prenom"),
              adresseProprio,
              (String) row.get("mail"),
              (String) row.get("telephone"),
              (String) row.get("hashMotDePasse"));
      String getBatimentsSQL = "SELECT * FROM Batiment";
      List<Map<String, Object>> batiments = db.executeQuery(getBatimentsSQL, null);
      for (Map<String, Object> batiment : batiments) {
        Adresse adresseBatiment = new AdresseDAO().find((int) batiment.get("idAdresse"));
        Batiment b =
            new Batiment(
                TypeDeBatiment.valueOf((String) batiment.get("typeBatiment")),
                adresseBatiment,
                (String) batiment.get("numeroContrat"));
        b.setId((int) batiment.get("id"));
        proprietaire.addBatiment(b);
      }
      List<Logement> logements = new LogementDAO().findAll();
      for (Logement l : logements) {
        Batiment b = proprietaire.getBatiment().stream().filter(bat -> bat.getId() == l.getIdBatiment()).findFirst().orElse(null);
        if (b == null) {
          continue;
        }
        proprietaire.addLogement(l, b);
      }
      return proprietaire;
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }

  public void update(Proprietaire proprietaire) {
    try {
      Proprietaire oldProprietaire = find(proprietaire.getId());
      if (oldProprietaire == null) {
        return;
      }

      AdresseDAO adresseDAO = new AdresseDAO();
      Adresse oldAdresse = oldProprietaire.getAdresse();
      Adresse newAdresse = proprietaire.getAdresse();
      if (!oldAdresse.equals(newAdresse)) {
        adresseDAO.update(newAdresse);
      }
      Connector db = Connector.getInstance();
      String query =
          "UPDATE Proprietaire SET nom = ?, prenom = ?, mail = ?, telephone = ?, idAdresse = ? WHERE id = ?";
      db.executeUpdate(
          query,
          Arrays.asList(
              proprietaire.getNom(),
              proprietaire.getPrenom(),
              proprietaire.getMail(),
              proprietaire.getTelephone(),
              proprietaire.getId(),
              proprietaire.getAdresse()));
    } catch (SQLException e) {
      Logger.error(e);
    }
  }

  public void delete(int id) {
    try {
      Connector db = Connector.getInstance();
      String query = "DELETE FROM Proprietaire WHERE id = ?";
      db.executeUpdate(query, Arrays.asList(id));
    } catch (SQLException e) {
      Logger.error(e);
    }
  }

  public List<Proprietaire> findAll() {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT P.*, A.* FROM Proprietaire P JOIN Adresse A ON P.idAdresse = A.id;";
      List<Map<String, Object>> results = db.executeQuery(query, null);
      if (results.size() == 0) {
        return null;
      }

      List<Proprietaire> proprietaires = new ArrayList<>();
      for (Map<String, Object> row : results) {
        Adresse adresse =
            new Adresse(
                (String) row.get("numero"),
                (String) row.get("rue"),
                (String) row.get("complement"),
                (String) row.get("ville"),
                (String) row.get("codePostal"));
        Proprietaire proprietaire =
            new Proprietaire(
                (int) row.get("id"),
                (String) row.get("nom"),
                (String) row.get("prenom"),
                adresse,
                (String) row.get("mail"),
                (String) row.get("telephone"),
                (String) row.get("hashMotDePasse"));
        proprietaires.add(proprietaire);
      }

      return proprietaires;
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }

  public Proprietaire findByMail(String mail) {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT P.id FROM Proprietaire P WHERE P.mail = ?;";
      Map<String, Object> row = db.getFirst(query, Arrays.asList(mail));
      if (row == null) {
        return null;
      }
      Proprietaire proprietaire = find((int) row.get("id"));
      return proprietaire;
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }

  public Proprietaire addBatiment(Proprietaire proprietaire, Batiment batiment) {
    BatimentDAO batimentDAO = new BatimentDAO();
    batiment = batimentDAO.create(batiment);
    proprietaire.addBatiment(batiment);
    return proprietaire;
  }

  public Proprietaire addLogement(Proprietaire p, Logement l, Batiment b) {
    LogementDAO logementDAO = new LogementDAO();
    l = logementDAO.create(l, b.getId());
    p.addLogement(l, b);
    return p;
  }
}
