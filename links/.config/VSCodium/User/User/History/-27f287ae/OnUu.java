package dao;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import dao.definitions.ChargesDAODef;
import jdbc.Connector;
import modele.Charges;
import utils.Logger;

public class ChargesDAO implements ChargesDAODef {

  public Charges create(Charges c, int idBienLouable) {
    try {
      Connector db = Connector.getInstance();
      String query =
          "INSERT INTO Charges (ordureMenageres, entretienPartiesCommunes, eclairagePartiesCommunes, eauPartieFixe, provisionSurCharge, indexEau, idBienLouable) VALUES (?, ?, ?, ?, ?, ?, ?)";
      int chargeId =
          db.executeUpdate(
              query,
              Arrays.asList(
                  c.getOrduresMenageres(),
                  c.getEntretienPartiesCommunes(),
                  c.getEclairagePartiesCommunes(),
                  c.getEauPartieFixe(),
                  c.getProvisionSurCharge(),
                  c.getIndexEau(),
                      idBienLouable));

      c.setId(chargeId);
      return c;
    } catch (Exception e) {
      Logger.error(e);
    }

    return null;
  }

  public Charges find(int id) {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT * FROM Charges WHERE id = ?";
      Map<String, Object> result = db.getFirst(query, Arrays.asList(Integer.toString(id)));
      if (result == null) {
        return null;
      }

      return new Charges(
          (int) result.get("id"),
          ((Number) result.get("ordureMenageres")).floatValue(),
          ((Number) result.get("entretienPartiesCommunes")).floatValue(),
          ((Number) result.get("eclairagePartiesCommunes")).floatValue(),
          ((Number) result.get("eauPartieFixe")).floatValue(),
          ((Number) result.get("provisionSurCharge")).floatValue(),
          (int) result.get("indexEau"),
          ((Number) result.get("prixEau")).floatValue(),
          LocalDate.parse((String) result.get("dateRevision")));
    } catch (Exception e) {
      Logger.error(e);
    }

    return null;
  }

  public Charges update(Charges c, int inParent) {
    // This is used to keep a record of the old values in the database
    c = create(c, inParent);

    return c;
  }

  public void delete(int id) {
    try {
      Connector db = Connector.getInstance();
      String query = "DELETE FROM Charges WHERE id = ?";
      db.executeUpdate(query, Arrays.asList(Integer.toString(id)));
    } catch (Exception e) {
      Logger.error(e);
    }
  }

  public List<Charges> findAll() {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT id FROM Charges";
      List<Map<String, Object>> results = db.executeQuery(query, null);
      if (results == null) {
        return null;
      }

      List<Charges> charges = new LinkedList<>();

      for (Map<String, Object> c : results) {
        Charges charge = find((int) c.get("id"));
        charges.add(charge);
      }

      return charges;
    } catch (Exception e) {
      Logger.error(e);
    }

    return null;
  }

  public List<Charges> findByBienLouable(int bienLouableId) {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT id FROM Charges WHERE idBienLouable = ? ORDER BY id DESC";
      List<Map<String, Object>> results =
          db.executeQuery(query, Arrays.asList(Integer.toString(bienLouableId)));
      if (results == null) {
        return null;
      }

      List<Charges> charges = new LinkedList<>();

      for (Map<String, Object> c : results) {
        Charges charge = find((int) c.get("id"));
        charges.add(charge);
      }

      return charges;
    } catch (Exception e) {
      Logger.error(e);
    }

    return null;
  }

}
