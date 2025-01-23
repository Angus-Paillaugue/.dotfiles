package dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import modele.Adresse;
import modele.Batiment;
import utils.Logger;
import jdbc.Connector;

public class BatimentDAO implements GenericDAO<Batiment> {

  public Adresse create(Adresse adresse) {
    return null;
  }

  public Batiment find(int id) {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT * FROM Batiment WHERE id = ? LIMIT 1";
      Map<String, Object> row = db.getFirst(query, Arrays.asList(id));
      if (row == null) {
        return null;
      }

      Batiment batiment = new Batiment((String) row.get("nom"), (String) row.get("type"));
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }

  public void update(Adresse adresse) {
    try {
      Connector db = Connector.getInstance();
      String query =
          "UPDATE Adresse SET codePostal = ?, complement = ?, rue = ?, numero = ?, ville = ? WHERE id = ?";
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
    } catch (SQLException e) {
      Logger.error(e);
    }
  }

  public List<Adresse> findAll() {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT * FROM Adresse";
      List<Map<String, Object>> results = db.executeQuery(query, null);
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
