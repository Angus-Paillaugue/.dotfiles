package dao;

import java.sql.SQLException;
import java.util.Arrays;
import java.util.Map;

import dao.definitions.BatimentDAODef;
import modele.Adresse;
import modele.Batiment;
import modele.TypeDeBatiment;
import utils.Logger;
import jdbc.Connector;

public class BatimentDAO implements BatimentDAODef {

  public Batiment create(Batiment batiment) {
    try {
      Connector db = Connector.getInstance();
      AdresseDAO adresseDAO = new AdresseDAO();
      Adresse adresse = adresseDAO.create(batiment.getAdresse());
      batiment.setAdresse(adresse);
      String query =
          "INSERT INTO Batiment (typeBatiment, numeroContrat, idAdresse, numeroContrat) VALUES (?, ?, ?, ?)";
      int insertedRowId =
          db.executeUpdate(
              query,
              Arrays.asList(
                  batiment.getTypeBatiment(),
                  batiment.getNumeroFiscal(),
                  batiment.getAdresse().getId(),
                  batiment.getNumeroFiscal()));

      batiment.setId(insertedRowId);
      return batiment;
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
          new Batiment(TypeDeBatiment.valueOf((String) row.get("typeBatiment")), adresse, (String) row.get("numeroContrat"));
      batiment.setId(id);

      return batiment;
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }
}
