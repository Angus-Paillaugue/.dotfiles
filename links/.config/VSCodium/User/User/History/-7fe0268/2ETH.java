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
      String query = "INSERT INTO " + (isColocation ? "CoGarantir" : "Garantir") + " (idLocation, idGarant) VALUES (?, ?)";
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
      if(isColocation) {
        query = "DELETE FROM Garantir WHERE idLocation = ? AND idGarant = ?";
      }else {
        query = "DELETE FROM CoGarantir WHERE idCoLocation = ? AND idCoGarant = ?";
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
        query = "DELETE FROM CoGarantir WHERE idCoLocation = ?";
      }
      db.executeUpdate(query, Arrays.asList(location.getId()));
      query =
          "DELETE FROM Personne WHERE id IN (SELECT " + (isColocation ? "CoGarantir" : "Garantir")
              + " FROM " + (isColocation ? "CoGarantir" : "Garantir")
              + " WHERE idLocation = ?)";
      db.executeUpdate(query, Arrays.asList(location.getId()));
      location.clearGarants();
      return location;
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }
}
