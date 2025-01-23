package dao;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import dao.definitions.LogementDAODef;
import jdbc.Connector;
import modele.Adresse;
import modele.Charges;
import modele.Colocation;
import modele.Location;
import modele.Logement;
import modele.Loyer;
import modele.noteEnergetique;
import utils.Logger;

public class LogementDAO implements LogementDAODef {

  public Logement create(Logement l, int idBatiment) {
    try {
      Connector db = Connector.getInstance();
      AdresseDAO adresseDAO = new AdresseDAO();
      l.setAdresse(adresseDAO.create(l.getAdresse()));
      String query =
          "INSERT INTO Bien_louable (idAdresse, refCadastrale, bati, numeroFiscal, taxeFonciere, idBatiment, surfaceTotale, surfaceHabitable, typeLogement, nbPieces) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      int idBienLouable =
          db.executeUpdate(
              query,
              Arrays.asList(
                  l.getAdresse().getId(),
                  l.getRefCadastrale(),
                  l.isBati(),
                  l.getNumeroFiscal(),
                  l.getTaxeFonciere(),
                  idBatiment,
                  l.getSurfaceTotale(),
                  l.getSurfaceHabitable(),
                  l.isLocation() ? "Location" : "Colocation",
                  l.getNbPieces()));
      // Creating adresse
      l.setAdresse(new AdresseDAO().create(l.getAdresse()));

      query =
          "INSERT INTO Logement (id, datePermisConstruction, dateConstruction, constatAmiante, constatPlomb, constatElectricite, constatEnergetique, emissionGazEffetDeSerre, referenceLogement, meuble, equipementAccesTechnologie) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      db.executeUpdate(
          query,
          Arrays.asList(
              idBienLouable,
              l.getDatePermisConstruction(),
              l.getDateConstruction(),
              l.getConstatAmiante(),
              l.getConstatPlomb(),
              l.getConstatElectricite(),
              l.getConstatEnergetique(),
              l.getEmissionGazEffetDeSerre(),
              l.getReferenceLogement(),
              l.isMeuble(),
              l.getEquipementAccesTechnologie()));

      ChargesDAO chargesDAO = new ChargesDAO();
      Charges charges = chargesDAO.create(l.getCharges(), idBienLouable);
      LoyerDAO loyerDAO = new LoyerDAO();
      Loyer loyer = loyerDAO.create(l.getLoyer(), idBienLouable);
      l.setCharges(charges);
      l.setLoyer(loyer);
      l.getAdresse().setId(l.getAdresse().getId());

      l.setId(idBienLouable);
      return l;
    } catch (Exception e) {
      Logger.error(e);
    }

    return null;
  }

  public Logement find(int id) {
    try {
      Connector db = Connector.getInstance();
      String query =
          "SELECT L.*, BL.idAdresse, BL.refCadastrale, BL.bati, BL.numeroFiscal, BL.taxeFonciere, BL.typeLogement, BL.idBatiment, BL.numeroContrat, BL.surfaceTotale, BL.surfaceHabitable, BL.nbPieces FROM Logement L, Bien_louable BL WHERE BL.id = L.id AND L.id = ? ORDER BY L.id DESC";
      Map<String, Object> result = db.getFirst(query, Arrays.asList(id));
      if (result == null) {
        return null;
      }
      Adresse adresse = new AdresseDAO().find((int) result.get("idAdresse"));
      Loyer loyer = new LoyerDAO().findLatestForLogement(id);
      Charges charges = new ChargesDAO().findByBienLouable(id).get(0);
      Logement logement =
          new Logement(
              adresse,
              ((Double) result.get("surfaceHabitable")).floatValue(),
              ((Double) result.get("surfaceTotale")).floatValue(),
              (String) result.get("refCadastrale"),
              ((int) result.get("bati")) == 1,
              (String) result.get("numeroFiscal"),
              ((Number) result.get("taxeFonciere")).floatValue(),
              loyer,
              charges,
              LocalDate.parse((String) result.get("datePermisConstruction")),
              LocalDate.parse((String) result.get("dateConstruction")),
              (String) result.get("constatAmiante"),
              (String) result.get("constatPlomb"),
              (String) result.get("constatElectricite"),
              noteEnergetique.valueOf((String) result.get("constatEnergetique")),
              noteEnergetique.valueOf((String) result.get("emissionGazEffetDeSerre")),
              (String) result.get("referenceLogement"),
              ((int) result.get("meuble")) == 1,
              (String) result.get("equipementAccesTechnologie"));
      logement.setId((int) result.get("id"));
      logement.setIdBatiment((int) result.get("idBatiment"));
      logement.setNbPieces((int) result.get("nbPieces"));
      if (((String) result.get("typeLogement")).equals("Location")) {
        logement.setIsLocation();
        logement.addLocation(findLocationByLogement(id));
      } else {
        logement.setIsCoLocation();
        Colocation colocation = new ColocationDAO().findByLogement(logement);
        logement.addColocation(colocation);
      }
      Logger.log(logement.getId());
      return logement;
    } catch (Exception e) {
      Logger.error(e);
    }

    return null;
  }

  public void update(Logement l) {
    try {
      Connector db = Connector.getInstance();
      String query =
          "UPDATE Bien_louable SET idAdresse = ?, refCadastrale = ?, bati = ?, numeroFiscal = ?, taxeFonciere = ?, idBatiment = ?, surfaceTotale = ?, surfaceHabitable = ?, typeLogement = ? WHERE id = ?";
      db.executeUpdate(
          query,
          Arrays.asList(
              l.getAdresse().getId(),
              l.getRefCadastrale(),
              l.isBati(),
              l.getNumeroFiscal(),
              l.getTaxeFonciere(),
              l.getIdBatiment(),
              l.getSurfaceTotale(),
              l.getSurfaceHabitable(),
              l.getTypeLogement(),
                  l.getId()));

      query =
          "UPDATE Logement SET datePermisConstruction = ?, dateConstruction = ?, constatAmiante = ?, constatPlomb = ?, constatElectricite = ?, constatEnergetique = ?, emissionGazEffetDeSerre = ?, referenceLogement = ?, meuble = ?, equipementAccesTechnologie = ? WHERE id = ?";
      db.executeUpdate(
          query,
          Arrays.asList(
              l.getDatePermisConstruction(),
              l.getDateConstruction(),
              l.getConstatAmiante(),
              l.getConstatPlomb(),
              l.getConstatElectricite(),
              l.getConstatEnergetique(),
              l.getEmissionGazEffetDeSerre(),
              l.getReferenceLogement(),
              l.isMeuble(),
              l.getEquipementAccesTechnologie(),
              l.getId()));

    } catch (Exception e) {
      Logger.error(e);
    }
  }

  public void delete(int id) {
    // TODO: Handle deletion of inherited Bien_louable
    try {
      Connector db = Connector.getInstance();
      String query = "DELETE FROM Logement WHERE id = ?";
      db.executeUpdate(query, Arrays.asList(id));
    } catch (Exception e) {
      Logger.error(e);
    }
  }

  public List<Logement> findAll() {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT l.*, bl.* FROM Logement l JOIN Bien_louable bl ON l.id = bl.id";
      List<Map<String, Object>> results = db.executeQuery(query, Arrays.asList());

      List<Logement> logements = new LinkedList<>();

      for (Map<String, Object> result : results) {
        Logement l = find((int) result.get("id"));
        logements.add(l);
      }
      return logements;
    } catch (Exception e) {
      Logger.error(e);
    }

    return new LinkedList<>();
  }

  public Location findLocationByLogement(int idLogement) {
    try {
      Connector db = Connector.getInstance();
      Map<String, Object> loc =
          db.getFirst("SELECT id FROM Location WHERE idLogement = ?", Arrays.asList(idLogement));
      if (loc == null) {
        return null;
      }
      return new LocationDAO().find((int) loc.get("id"));
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }
}
