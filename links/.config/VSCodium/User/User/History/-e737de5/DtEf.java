package dao;

import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import modele.Adresse;
import modele.Batiment;
import modele.TypeDeBatiment;
import utils.Logger;
import jdbc.Connector;

public class BatimentDAO implements GenericDAO<Batiment> {

  public Batiment create(Batiment b) {
    try {
      Connector db = Connector.getInstance();
      String query = "INSERT INTO Batiment (typeBatiment, numeroContrat, idAdresse) VALUES (?, ?)";
      int insertedRowId =
          db.executeUpdate(
              query,
              Arrays.asList(b.getTypeDeBatiment().toString(), b.getAdresse().getId()));

      b.setId(insertedRowId);
      return b;
    } catch (SQLException e) {
      Logger.error(e);
    }

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

      Adresse adresse = new AdresseDAO().find((int) row.get("idAdresse"));
      Batiment batiment =
          new Batiment(TypeDeBatiment.valueOf((String) row.get("typeBatiment")), adresse);
      batiment.setId(id);

      return batiment;
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }

  public void update(Batiment b) {}

  public void delete(int id) {}

  public List<Batiment> findAll() {
    return null;
  }
}
