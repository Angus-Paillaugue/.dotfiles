package dao;

import java.sql.SQLException;
import java.util.Arrays;

import dao.definitions.GarantDAODef;
import jdbc.Connector;
import modele.Location;
import modele.Personne;
import utils.Logger;

public class GarantDAO implements GarantDAODef {

  @Override
  public Location ajouterGarant(Personne garant, Location location, Boolean isColocation) {
    try {
      Connector db = Connector.getInstance();
      String query;
      if (isColocation) {
        query = "INSERT INTO CoGarantir (idColocation, idCoGarant) VALUES (?, ?)";
      } else {
        query = "INSERT INTO Garantir (idLocation, idGarant) VALUES (?, ?)";
      }
      db.executeUpdate(query, Arrays.asList(location.getId(), garant.getIdLocataire()));
      location.addGarant(garant);
      return location;
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }

  @Override
  public Location supprimerGarant(Personne garant, Location location, Boolean isColocation) {
    try {
      Connector db = Connector.getInstance();
      String query;
      if (isColocation) {
        query = "DELETE FROM CoGarantir WHERE idColocation = ? AND idCoGarant = ?";
      } else {
        query = "DELETE FROM Garantir WHERE idLocation = ? AND idGarant = ?";
      }
      db.executeUpdate(query, Arrays.asList(location.getId(), garant.getIdLocataire()));
      query = "DELETE FROM Personne WHERE id = ?";
      db.executeUpdate(query, Arrays.asList(garant.getIdLocataire()));
      location.removeGarant(garant);
      return location;
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }

  @Override
  public Location supprimerTousLesGarants(Location location, Boolean isColocation) {
    try {
      Connector db = Connector.getInstance();
      String query;
      if (isColocation) {
        query = "DELETE FROM Garantir WHERE idLocation = ?";
      } else {
        query = "DELETE FROM CoGarantir WHERE idColocation = ?";
      }
      db.executeUpdate(query, Arrays.asList(location.getId()));
      query =
          "DELETE FROM Personne WHERE id IN (SELECT " + (isColocation ? "idCoGarant" : "idGarant")
              + " FROM " + (isColocation ? "CoGarantir" : "Garantir")
              + " WHERE " + (isColocation ? "idColocation" : "idLocation")
              + " = ?)";
      db.executeUpdate(query, Arrays.asList(location.getId()));
      location.clearGarants();
      return location;
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }

  @Override
  public List<Garant> findForLocation(int idLocation) {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT * FROM Garantir WHERE idLocation = ?";
      ResultSet rs = db.executeQuery(query, Arrays.asList(idLocation));
      List<Garant> garants = new ArrayList<>();
      while (rs.next()) {
        garants.add(new GarantDAO().find(rs.getInt("idGarant")));
      }
      return garants;
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }
}
