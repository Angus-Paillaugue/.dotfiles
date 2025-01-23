package dao;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.LinkedList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import dao.definitions.LoyerDAODef;
import jdbc.Connector;
import modele.Logement;
import modele.Loyer;
import modele.ModeDePaiment;
import utils.Logger;

public class LoyerDAO implements LoyerDAODef {

  public Loyer create(Loyer l, int idbienLouable) {
    try {
      Connector db = Connector.getInstance();
      String query =
          "INSERT INTO Loyer (montantHorsCharges, jourVersement, dateDerniereRevision, dateProchaineRevision, modeDePaiement, idBienLouable) VALUES (?, ?, ?, ?, ?, ?)";
      int idLoyer =
          db.executeUpdate(
              query,
              Arrays.asList(
                  l.getMontantHorsCharge(),
                  l.getJourVersement(),
                  l.getDateDerniereRevision(),
                  l.getDateProchaineRevision(),
                  l.getModeDePaiment(),
                  idbienLouable));
      l.setId(idLoyer);
      return l;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }

  public Loyer find(int id) {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT * FROM Loyer WHERE id = ?";
      Map<String, Object> result = db.getFirst(query, Arrays.asList(String.valueOf(id)));

      if (result == null) {
        return null;
      }

      Loyer loyer =
          new Loyer(
              (int) result.get("id"),
              ((Number) result.get("montantHorsCharges")).floatValue(),
              (int) result.get("jourVersement"),
              LocalDate.parse((String) result.get("dateDerniereRevision")),
              LocalDate.parse((String) result.get("dateProchaineRevision")),
              ModeDePaiment.valueOf((String) result.get("modeDePaiement")),
              (int) result.get("idBienLouable"));
      return loyer;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }

  public Loyer update(Loyer l, int idbienLouable) {
    // This is used to keep a record of the old values in the database
    l = create(l, idbienLouable);
    return l;
  }

  public void delete(int id) {
    try {
      Connector db = Connector.getInstance();
      String query = "DELETE FROM Loyer WHERE id = ?";
      db.executeUpdate(query, Arrays.asList(String.valueOf(id)));
    } catch (SQLException e) {
      Logger.error(e);
    }
  }

  public List<Loyer> findAllForLogement(Logement logement) {
    try {
      Connector db = Connector.getInstance();
      String query =
          "SELECT id FROM Loyer WHERE idBienLouable = ? ORDER BY dateDerniereRevision DESC";
      List<Map<String, Object>> results =
          db.executeQuery(query, Arrays.asList(String.valueOf(logement.getId())));

      if (results == null || results.isEmpty()) {
        return null;
      }

      List<Loyer> loyers = new LinkedList<>();

      for (Map<String, Object> result : results) {
        Loyer loyer = find((int) result.get("id"));
        loyers.add(loyer);
      }

      return loyers;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }

  public Loyer findLatestForLogement(int id) {
    try {
      Connector db = Connector.getInstance();
      String query =
          "SELECT id FROM Loyer WHERE idBienLouable = ? ORDER BY dateProchaineRevision DESC";
      Map<String, Object> result = db.getFirst(query, Arrays.asList(id));

      if (result == null) {
        return null;
      }

      Loyer loyer = find((int) result.get("id"));

      return loyer;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }

  public List<Loyer> findAll() {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT id FROM Loyer";
      List<Map<String, Object>> results = db.executeQuery(query, null);

      if (results == null || results.isEmpty()) {
        return null;
      }

      List<Loyer> loyers = new LinkedList<>();

      for (Map<String, Object> result : results) {
        Loyer loyer = find((int) result.get("id"));
        loyers.add(loyer);
      }

      return loyers;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }
}
