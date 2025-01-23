package dao;

import java.sql.SQLException;
import java.util.Arrays;
import java.util.Map;

import dao.definitions.AssuranceDAODef;
import jdbc.Connector;
import modele.Assurance;
import utils.Logger;

public class AssuranceDAO implements AssuranceDAODef {

  public Assurance create(Assurance assurance) {
    try {
      Connector db = Connector.getInstance();
      String query =
          "INSERT INTO Assurance (numeroContrat, typeContrat, nomAssureur, prime) VALUES (?, ?, ?, ?)";
      db.executeUpdate(
          query,
          Arrays.asList(
              assurance.getNumeroContrat(),
              assurance.getTypeContrat(),
              assurance.getNomAssureur(),
              assurance.getPrime()));
      return assurance;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }

  public Assurance findForLogement(int id) {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT * FROM Assurance WHERE numeroContrat = ? LIMIT 1";
      Map<String, Object> row = db.getFirst(query, Arrays.asList(id));
      if (row == null) {
        return null;
      }

      Assurance assurance = find((int) row.get("numeroContrat"));

      return assurance;
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }

  public void delete(int numeroContrat) {
    try {
      Connector db = Connector.getInstance();
      String query = "DELETE FROM Assurance WHERE numeroContrat = ?";
      db.executeUpdate(query, Arrays.asList(numeroContrat));
    } catch (SQLException e) {
      Logger.error(e);
    }
  }

  public void update(Assurance assurance, int numeroContractOldAssurance) {
    try {
      Connector db = Connector.getInstance();
      String query =
          "INSERT into Assurance (numeroContrat, typeContrat, nomAssureur, prime) VALUES (?, ?, ?, ?);";
      db.executeUpdate(
          query,
          Arrays.asList(
              assurance.getNumeroContrat(),
              assurance.getTypeContrat(),
              assurance.getNomAssureur(),
              assurance.getPrime()));

      if (numeroContractOldAssurance >= 0) {
        query = "DELETE FROM Assurance WHERE numeroContrat = ?";
        db.executeUpdate(query, Arrays.asList(numeroContractOldAssurance));
      }

    } catch (SQLException e) {
      Logger.error(e);
    }
  }

  public Assurance find(int id) {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT * FROM Assurance WHERE numeroContrat = ? LIMIT 1";
      Map<String, Object> row = db.getFirst(query, Arrays.asList(id));
      if (row == null) {
        return null;
      }

      Assurance assurance =
          new Assurance(
              (String) row.get("typeContrat"),
              (String) row.get("nomAssureur"),
              (int) row.get("numeroContrat"),
              (float) row.get("prime"));

      return assurance;
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }
}
