package dao;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jdbc.Connector;
import modele.Adresse;
import modele.Location;
import modele.Logement;
import modele.Personne;
import utils.Logger;

public class LocationDAO implements GenericDAO<Location> {

  @Override
  public Location create(Location l) {
    try {
      Connector db = Connector.getInstance();
      String query =
          "INSERT INTO Location (dateContrat, caution, idLieuContrat, idLogement) VALUES (?, ?, ?, ?)";
      int id =
          db.executeUpdate(
              query,
              Arrays.asList(
                  l.dateContrat, l.getCaution(), l.getLieuDeContrat().getId(), l.getIdLogement()));
      l.setId(id);
      query = "INSERT INTO Louer (idLocation, idLocataire) VALUES (?, ?)";
      for (Personne p : l.getLocataires()) {
        db.executeUpdate(query, Arrays.asList(l.getId(), p.getIdLocataire()));
      }
      query = "INSERT INTO Garantir (idLocation, idGarant) VALUES (?, ?)";
      for (Personne p : l.getGarants()) {
        db.executeUpdate(query, Arrays.asList(l.getId(), p.getIdLocataire()));
      }
    } catch (SQLException e) {
      Logger.error(e);
    }
    return l;
  }

  @Override
  public Location find(int id) {
    try {
      Connector db = Connector.getInstance();

      String query = "SELECT * FROM Location WHERE id = ? LIMIT 1";
      List<Map<String, Object>> results = db.executeQuery(query, Arrays.asList(id));
      if (results.size() == 0) {
        return null;
      }
      Map<String, Object> row = results.get(0);

      Adresse rLieu = new AdresseDAO().find((int) row.get("idLieuContrat"));
      Location _loc = null;
      if (row.get("dateContrat") != null) {
        _loc =
            new Location(
                (int) row.get("id"), LocalDate.parse((String) row.get("dateContrat")), rLieu);

        _loc.setIdLogement((int) row.get("idLogement"));
        List<Map<String, Object>> locatairesID =
            (List<Map<String, Object>>)
                db.executeQuery(
                    "SELECT * FROM Louer WHERE idLocation = ?", Arrays.asList(row.get("id")));
        List<Personne> locataires =
            locatairesID.stream()
                .map(_locID -> (int) _locID.get("idLocataire"))
                .map(_locID -> new PersonneDAO().find(_locID))
                .collect(Collectors.toList());

        List<Map<String, Object>> garantsID =
            (List<Map<String, Object>>)
                db.executeQuery(
                    "SELECT * FROM Garantir WHERE idLocation = ?", Arrays.asList(row.get("id")));
        List<Personne> garants =
            garantsID.stream()
                .map(_locID -> (int) _locID.get("idGarant"))
                .map(_locID -> new PersonneDAO().find(_locID))
                .collect(Collectors.toList());

        for (Personne p : garants) _loc.addGarant(p);
        for (Personne p : locataires) _loc.addLocataire(p);
      }

      return _loc;
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }

  @Override
  public void update(Location t) {
    String query = "UPDATE Location SET dateContrat = ?, caution = ?, idLieuContrat = ?";
    try {
      Connector db = Connector.getInstance();
      db.executeUpdate(
          query,
          Arrays.asList(
              t.getDateContrat().toString(), t.getCaution(), t.getLieuDeContrat().getId()));
    } catch (SQLException e) {
      Logger.error(e);
    }
  }

  @Override
  public void delete(int id) {
    try {
      Connector db = Connector.getInstance();
      String query = "DELETE FROM Location WHERE id = ?";
      db.executeUpdate(query, Arrays.asList(id));
    } catch (SQLException e) {
      Logger.error(e);
    }
  }

  @Override
  public List<Location> findAll() {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT * FROM Location";
      List<Map<String, Object>> results = db.executeQuery(query, null);
      List<Location> locations = new ArrayList<>();
      for (Map<String, Object> row : results) {
        Location location = find((int) row.get("id"));
        locations.add(location);
      }
      return locations;
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }

  public List<Personne> findLocataires(Logement l) {
    // 1. recup location
    // 2. recup locataires
    try {
      Connector db = Connector.getInstance();
      Map<String, Object> results =
          db.getFirst("SELECT * FROM Location WHERE idLogement = ?", Arrays.asList(l.getId()));
      List<Map<String, Object>> locatairesID =
          (List<Map<String, Object>>)
              db.executeQuery(
                  "SELECT * FROM Louer WHERE idLocation = ?", Arrays.asList(results.get("id")));
      return locatairesID.stream()
          .map(_locID -> (int) _locID.get("idLocataire"))
          .map(_locID -> new PersonneDAO().find(_locID))
          .collect(Collectors.toList());
    } catch (SQLException e) {
      Logger.error(e);
    }
    return new ArrayList<Personne>();
  }

  public List<Personne> findGarants(Logement l) {
    // 1. recup location
    // 2. recup garants
    try {
      Connector db = Connector.getInstance();
      Map<String, Object> results =
          db.getFirst("SELECT * FROM Location WHERE idLogement = ?", Arrays.asList(l.getId()));
      List<Map<String, Object>> garantsID =
          (List<Map<String, Object>>)
              db.executeQuery(
                  "SELECT * FROM Garantir WHERE idLocation = ?", Arrays.asList(results.get("id")));
      return garantsID.stream()
          .map(_locID -> (int) _locID.get("idGarant"))
          .map(_locID -> new PersonneDAO().find(_locID))
          .collect(Collectors.toList());
    } catch (SQLException e) {
      Logger.error(e);
    }
    return new ArrayList<Personne>();
  }

  public void ajouterLocataire(Location l, Personne p) {
    try {
      Connector db = Connector.getInstance();
      String query = "INSERT INTO Louer (idLocation, idLocataire) VALUES (?, ?)";
      db.executeUpdate(query, Arrays.asList(l.getId(), p.getIdLocataire()));
    } catch (SQLException e) {
      Logger.error(e);
    }
  }

  public void supprimerLocataires(Logement l) {
    try {
      Connector db = Connector.getInstance();
      for (Personne p : findLocataires(l)) {
        String query = "DELETE FROM Louer WHERE idLocation = ? AND idLocataire = ?";
        db.executeUpdate(query, Arrays.asList(logements.get("id"), p.getIdLocataire()));
      }
    } catch (SQLException e) {
      Logger.error(e);
    }
  }
}
