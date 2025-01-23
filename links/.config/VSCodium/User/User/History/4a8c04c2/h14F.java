package dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import modele.Adresse;
import utils.Logger;
import jdbc.Connector;

public class AdresseDAO implements GenericDAO<Adresse> {

  public int create(Adresse adresse) {
    try {
      Connector db = Connector.getInstance();
      String query =
          "INSERT INTO Adresse (codePostal, complement, rue, numero, ville) VALUES (?, ?, ?, ?, ?)";
      int insertedRowId =
          db.executeUpdate(
              query,
              Arrays.asList(
                  adresse.getCp(),
                  adresse.getComplement(),
                  adresse.getRue(),
                  adresse.getNumero(),
                  adresse.getVille()));
      return insertedRowId;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return -1;
  }

  public Adresse find(int id) {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT * FROM Adresse WHERE id = ? LIMIT 1";
      List<Map<String, Object>> results = db.executeQuery(query, Arrays.asList(id));
      if (results.size() == 0) {
        return null;
      }

      Map<String, Object> row = results.get(0);
      Adresse adresse =
          new Adresse(
              (int) row.get("id"),
              (String) row.get("numero"),
              (String) row.get("rue"),
              (String) row.get("complement"),
              (String) row.get("ville"),
              (String) row.get("codePostal"));

      return adresse;
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }

  public void update(Adresse adresse) {
    Connector db;
    try {
      db = Connector.getInstance();
      String query =
          "UPDATE Adresse SET codePostal = ?, complement = ?, rue = ?, numero = ?, ville WHERE id = ?";
      db.executeUpdate(
          query,
          Arrays.asList(
              adresse.getCp(),
              adresse.getComplement(),
              adresse.getRue(),
              adresse.getNumero(),
              adresse.getVille(),
              adresse.getId()));
    } catch (SQLException e) {
      Logger.error(e);
    }
  }

  public void delete(int id) {
    try {
      Connector db = Connector.getInstance();
      String query = "DELETE FROM Adresse WHERE id = ?";
      db.executeUpdate(query, Arrays.asList(id));
      db.closeConnection();
    } catch (SQLException e) {
      Logger.error(e);
    }
  }

  public List<Adresse> findAll() {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT * FROM Adresse";
      List<Map<String, Object>> results = db.executeQuery(query, null);
      db.closeConnection();
      List<Adresse> adresses = new ArrayList<>();
      for (Map<String, Object> row : results) {
        Adresse adresse =
            new Adresse(
                (String) row.get("numero"),
                (String) row.get("rue"),
                (String) row.get("complement"),
                (String) row.get("ville"),
                (String) row.get("codePostal"));
        adresses.add(adresse);
      }
      return adresses;
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }
}
