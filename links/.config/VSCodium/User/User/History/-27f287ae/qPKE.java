package dao;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jdbc.Connector;
import modele.Adresse;
import modele.Charges;
import utils.Logger;

public class ChargesDAO implements GenericDAO<Charges> {

  @Override
  public Charges create(Charges c, int inParent) {
    try {
      Connector db = Connector.getInstance();
      String query =
          "INSERT INTO Charges (ordureMenageres, entretienPartiesCommunes, eclairagePartiesCommunes, eauPartieFixe, provisionSurCharge, idBienLouable) VALUES (?, ?, ?, ?, ?, ?)";
      int chargeId =
          db.executeUpdate(
              query,
              Arrays.asList(
                  c.getOrduresMenageres(),
                  c.getEntretienPartiesCommunes(),
                  c.getEclairagePartiesCommunes(),
                  c.getEauPartieFixe(),
                  c.getProvisionSurCharge(),
                  inParent));

      c.setId(chargeId);
      return c;
    } catch (Exception e) {
      Logger.error(e);
    }

    return -1;
  }

  @Override
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
          ((Number) result.get("provisionSurCharge")).floatValue());
    } catch (Exception e) {
      Logger.error(e);
    }

    return null;
  }

  public int update(Charges c, int idBienLouable) {
    // This is used to keep a record of the old values in the database
    int createdId = create(c, idBienLouable);

    return createdId;
  }

  @Override
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
      String query = "SELECT * FROM Charges";
      List<Map<String, Object>> results = db.executeQuery(query, null);
      if (results == null) {
        return null;
      }

      return results.stream()
          .map(
              result ->
                  new Charges(
                      (int) result.get("id"),
                      ((Double) result.get("ordureMenageres")).floatValue(),
                      ((Double) result.get("entretienPartiesCommunes")).floatValue(),
                      ((Double) result.get("eclairagePartiesCommunes")).floatValue(),
                      ((Double) result.get("eauPartieFixe")).floatValue(),
                      ((Double) result.get("provisionSurCharge")).floatValue()))
          .collect(Collectors.toList());
    } catch (Exception e) {
      Logger.error(e);
    }

    return null;
  }

  public List<Charges> findByBienLouable(int bienLouableId) {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT * FROM Charges WHERE idBienLouable = ? ORDER BY id DESC";
      List<Map<String, Object>> results =
          db.executeQuery(query, Arrays.asList(Integer.toString(bienLouableId)));
      if (results == null) {
        return null;
      }

      return results.stream()
          .map(
              result ->
                  new Charges(
                      (int) result.get("id"),
                      ((Double) result.get("ordureMenageres")).floatValue(),
                      ((Double) result.get("entretienPartiesCommunes")).floatValue(),
                      ((Double) result.get("eclairagePartiesCommunes")).floatValue(),
                      ((Double) result.get("eauPartieFixe")).floatValue(),
                      ((Double) result.get("provisionSurCharge")).floatValue()))
          .collect(Collectors.toList());
    } catch (Exception e) {
      Logger.error(e);
    }

    return null;
  }
}
