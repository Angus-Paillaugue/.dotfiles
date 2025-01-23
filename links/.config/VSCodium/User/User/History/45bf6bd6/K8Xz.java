package dao;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import jdbc.Connector;
import modele.Logement;
import modele.Loyer;
import modele.ModeDePaiment;
import utils.Logger;

public class LoyerDAO implements GenericDAO<Loyer> {

  @Override
  public int create(Loyer t) {
    try {
      Connector db = Connector.getInstance();
      String query =
          "INSERT INTO Loyer (montantHorsCharges, jourVersement, dateDerniereRevision, dateProchaineRevision, modeDePaiement, idBienLouable) VALUES (?, ?, ?, ?, ?, ?)";
      int idLoyer =
          db.executeUpdate(
              query,
              Arrays.asList(
                  t.getMontantHorsCharge(),
                  t.getJourVersement(),
                  t.getDateDerniereRevision(),
                  t.getDateProchaineRevision(),
                  t.getModeDePaiment(),
                  t.getId()));

      return idLoyer;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return -1;
  }

  @Override
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
              (float) result.get("montantHorsCharges"),
              (int) result.get("jourVersement"),
              (LocalDate) result.get("dateDerniereRevision"),
              (LocalDate) result.get("dateProchaineRevision"),
              (ModeDePaiment) result.get("modeDePaiement"));

      return loyer;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }

  @Override
  public void update(Loyer t) {
    // This is used to keep a record of the old values in the database
    create(t);
  }

  @Override
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
      String query = "SELECT * FROM Loyer WHERE idBienLouable = ?";
      List<Map<String, Object>> results =
          db.executeQuery(query, Arrays.asList(String.valueOf(logement.getId())));

      if (results == null || results.isEmpty()) {
        return null;
      }

      List<Loyer> loyers = new ArrayList<>();

      for (Map<String, Object> result : results) {
        Loyer loyer =
            new Loyer(
                (float) result.get("montantHorsCharges"),
                (int) result.get("jourVersement"),
                (LocalDate) result.get("dateDerniereRevision"),
                (LocalDate) result.get("dateProchaineRevision"),
                (ModeDePaiment) result.get("modeDePaiement"));
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
      String query = "SELECT * FROM Loyer WHERE idBienLouable = ? ORDER BY dateProchaineRevision DESC";
      Map<String, Object> result = db.getFirst(query, Arrays.asList(id));

      System.out.println(result);

      if (result == null) {
        return null;
      }

      Loyer loyer = new Loyer(
          (float) result.get("montantHorsCharges"),
          (int) result.get("jourVersement"),
          (LocalDate) result.get("dateDerniereRevision"),
          (LocalDate) result.get("dateProchaineRevision"),
          (ModeDePaiment) result.get("modeDePaiement"));

      return loyer;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }

  @Override
  public List<Loyer> findAll() {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT * FROM Loyer";
      List<Map<String, Object>> results = db.executeQuery(query, null);

      if (results == null || results.isEmpty()) {
        return null;
      }

      List<Loyer> loyers = new ArrayList<>();

      for (Map<String, Object> result : results) {
        Loyer loyer =
            new Loyer(
                (float) result.get("montantHorsCharges"),
                (int) result.get("jourVersement"),
                (LocalDate) result.get("dateDerniereRevision"),
                (LocalDate) result.get("dateProchaineRevision"),
                (ModeDePaiment) result.get("modeDePaiement"));
        loyers.add(loyer);
      }

      return loyers;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }
}
