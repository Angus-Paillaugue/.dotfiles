package dao;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import dao.definitions.ColocationDAODef;
import jdbc.Connector;
import modele.Adresse;
import modele.Colocation;
import modele.Location;
import modele.Logement;
import modele.Personne;
import utils.Logger;

public class ColocationDAO implements ColocationDAODef {

  public Colocation create(Colocation c, Logement logement) {
    try {
      Connector db = Connector.getInstance();
      for (Location l : c.getContrats()) {
        Logger.log(l.getLocataires());
        String query =
            "INSERT INTO Colocation (dateContrat, caution, idLieuContrat, idLogement) VALUES (?, ?, ?, ?)";
        int id =
            db.executeUpdate(
                query,
                Arrays.asList(
                    l.dateContrat, l.getCaution(), l.getLieuDeContrat().getId(), logement.getId()));
        l.setId(id);
        query = "INSERT INTO CoLouer (idCoLocation, idCoLocataire) VALUES (?, ?)";
        db.executeUpdate(query, Arrays.asList(l.getId(), l.getLocataires().get(0).getIdLocataire()));
        Logger.log(l.getGarants());
        if (l.getGarants() != null) {
          query = "INSERT INTO Garantir (idCoLocation, idCoGarant) VALUES (?, ?)";
          for (Personne p : l.getGarants()) {
            db.executeUpdate(query, Arrays.asList(l.getId(), p.getIdLocataire()));
          }
        }
      }
    } catch (SQLException e) {
      Logger.error(e);
    }

    return c;
  }

  public Colocation findByLogement(Logement logement) {
    try {
      Connector db = Connector.getInstance();

      String query = "SELECT * FROM Colocation WHERE idLogement = ?";
      List<Map<String, Object>> results = db.executeQuery(query, Arrays.asList(logement.getId()));
      if (results.size() == 0) {
        return null;
      }
      List<Location> locations = new LinkedList<>();
      for (Map<String, Object> row : results) {
        Adresse rLieu = new AdresseDAO().find((int) row.get("idLieuContrat"));
        Location _loc =
            new Location(
                (int) row.get("id"), LocalDate.parse((String) row.get("dateContrat")), rLieu);
        _loc.setIdLogement((int) row.get("idLogement"));
        List<Map<String, Object>> locatairesID =
            (List<Map<String, Object>>)
                db.executeQuery(
                    "SELECT * FROM CoLouer WHERE idColocation = ?", Arrays.asList(row.get("id")));
        List<Personne> locataires =
            locatairesID.stream()
                .map(_locID -> (int) _locID.get("idColocataire"))
                .map(_locID -> new PersonneDAO().find(_locID))
                .collect(Collectors.toList());

        List<Map<String, Object>> garantsID =
            (List<Map<String, Object>>)
                db.executeQuery(
                    "SELECT * FROM CoGarantir WHERE idColocation = ?",
                    Arrays.asList(row.get("id")));
        List<Personne> garants =
            garantsID.stream()
                .map(_locID -> (int) _locID.get("idCoGarant"))
                .map(_locID -> new PersonneDAO().find(_locID))
                .collect(Collectors.toList());

        for (Personne p : garants) _loc.addGarant(p);
        for (Personne p : locataires) _loc.addLocataire(p);

        locations.add(_loc);
      }

      return new Colocation(locations);
    } catch (SQLException e) {
      Logger.error(e);
    }
    return null;
  }

  public Colocation findByLogementArchive(Logement logement) {
	    try {
	      Connector db = Connector.getInstance();

	      String query = "SELECT * FROM AncienneColocation WHERE idLogement = ? LIMIT 1";
	      List<Map<String, Object>> results = db.executeQuery(query, Arrays.asList(logement.getId()));
	      if (results.size() == 0) {
	        return null;
	      }
	      List<Location> locations = new LinkedList<>();
	      for (Map<String, Object> row : results) {
	        Adresse rLieu = new AdresseDAO().find((int) row.get("idLieuContrat"));
	        Location _loc =
	            new Location(
	                (int) row.get("id"), LocalDate.parse((String) row.get("dateContrat")), rLieu);
	        _loc.setCaution((float)((double)row.get("caution")));
	        _loc.setIdLogement((int) row.get("idLogement"));
	        List<Map<String, Object>> locatairesID =
	                db.executeQuery(
	                    "SELECT * FROM AncienCoLouer WHERE idColocation = ?", Arrays.asList((int)row.get("id")));
	        List<Personne> locataires =
	            locatairesID.stream()
	                .map(_locID -> (int) _locID.get("idColocataire"))
	                .map(_locID -> new PersonneDAO().find(_locID))
	                .collect(Collectors.toList());

	        List<Map<String, Object>> garantsID =
	            (List<Map<String, Object>>)
	                db.executeQuery(
	                    "SELECT * FROM AncienCoGarantir WHERE idColocation = ?",
	                    Arrays.asList(row.get("id")));
	        List<Personne> garants =
	            garantsID.stream()
	                .map(_locID -> (int) _locID.get("idCoGarant"))
	                .map(_locID -> new PersonneDAO().find(_locID))
	                .collect(Collectors.toList());

	        for (Personne p : garants) _loc.addGarant(p);
	        _loc.addLocataire(locataires.get(0));

	        locations.add(_loc);
	      }

	      return new Colocation(locations);
	    } catch (SQLException e) {
	      Logger.error(e);
	    }
	    return null;
	  }

  public void update(Colocation t)
  {
	    String query =
	            "UPDATE Colocation SET dateContrat = ?, caution = ?, idLieuContrat = ?, idLogement = ?";
	        try {
	          Connector db = Connector.getInstance();
	          for(Personne p : t.getColocataires())
		          db.executeUpdate(
		              query,
		              Arrays.asList(
		                  t.getDateContrat(p).toString(),
		                  t.getColocataires().stream().filter(coloc -> coloc.equals(p)).limit(1),
		                  t.getLieuDeContrat(p).getId(),
		                  t.getContrats().stream()
		                  	.filter(coloc -> coloc.getLocataires().get(0).equals(p))
		                  	.limit(1)
		                  	.collect(Collectors.toList())
		                  	.get(0).getIdLogement()));
	        } catch (SQLException e) {
	          Logger.error(e);
            }
  }

  public void update(Colocation t, Personne p) {
    String query =
        "UPDATE Colocation SET dateContrat = ?, caution = ?, idLieuContrat = ?, idLogement = ?";
    try {
      Connector db = Connector.getInstance();
      db.executeUpdate(
          query,
          Arrays.asList(
              t.getDateContrat(p).toString(),
              t.getColocataires().stream().filter(coloc -> coloc.equals(p)).limit(1),
              t.getLieuDeContrat(p).getId(),
              t.getContrats().stream()
                  .filter(coloc -> coloc.equals(p))
                  .limit(1)
                  .collect(Collectors.toList())
                  .get(0)
                  .getIdLogement()));
    } catch (SQLException e) {
      Logger.error(e);
    }
  }

  public void delete(Colocation colocation) {

	  for(Location _loc: colocation.getContrats())
	  {
		  int id = _loc.getId();
		    try {
		        Connector db = Connector.getInstance();
                String query =
		      		  "INSERT INTO AncienneCoLocation (dateContrat, caution, idLieuContrat, idLogement) VALUES (?, ?, ?, ?)";
		        db.executeUpdate(query, Arrays.asList(_loc.dateContrat, _loc.getCaution(), _loc.getLieuDeContrat().getId(), _loc.getIdLogement()));
		  	  for(Personne _locataire : _loc.getLocataires())
		  	  {
		  		  query = "INSERT INTO AncienCoLouer (idColocation, idColocataire) VALUES (?, ?)";
                  db.executeUpdate(query, Arrays.asList(id, _locataire.getIdLocataire()));
		  	  }
		  	  for(Personne _garant : _loc.getGarants())
		  	  {
		  		  query = "INSERT INTO AncienCoGarantir(idColocation, idGarant) VALUES (?, ?)";
		  		  db.executeUpdate(query, Arrays.asList(id, _garant.getIdLocataire()));
		  	  }
		        query = "DELETE FROM Colocation WHERE id = ?";
		        db.executeUpdate(query, Arrays.asList(id));
		        query = "DELETE FROM CoLouer WHERE idColocation = ?";
		  	  db.executeUpdate(query, Arrays.asList(id));
		        query = "DELETE FROM CoGarantir WHERE idColocation = ?";
		  	  db.executeUpdate(query, Arrays.asList(id));
		      } catch (SQLException e) {
		        Logger.error(e);
		      }
    }
  }

  public List<Colocation> findAll() {
    String query = "SELECT * FROM Colocation GROUP BY idLogement";
    List<Colocation> colocations = new LinkedList<>();
    try {
      Connector db = Connector.getInstance();
      List<Map<String, Object>> results = db.executeQuery(query, null);
      LogementDAO logementDAO = new LogementDAO();
      for (Map<String, Object> row : results) {
        Logement logement = logementDAO.find((int) row.get("idLogement"));
        colocations.add(findByLogement(logement));
      }
      return colocations;
    } catch (SQLException e) {
      Logger.error(e);
    }

    return null;
  }

  public List<Colocation> findAllArchive() {
	    String query = "SELECT * FROM AncienneColocation GROUP BY idLogement";
	    List<Colocation> colocations = new LinkedList<>();
	    try {
	      Connector db = Connector.getInstance();
	      List<Map<String, Object>> results = db.executeQuery(query, null);
	      LogementDAO logementDAO = new LogementDAO();
	      for (Map<String, Object> row : results) {
	        Logement logement = logementDAO.find((int) row.get("idLogement"));
	        colocations.add(findByLogement(logement));
	      }
	      return colocations;
	    } catch (SQLException e) {
	      Logger.error(e);
	    }

	    return null;
	  }


  public Colocation addColoc(Colocation c, Location l, Personne p) {
    c.addColocataire(p, l.getGarants(), l.getDateContrat(), l.getLieuDeContrat(), l.getCaution());
    Logement logement = new LogementDAO().find(l.getId());
    c = create(c, logement);
    return c;
  }

  public Colocation delColoc(Colocation c, Personne p) {
    Location l =
        c.getContrats().stream()
            .filter(loc -> loc.getLocataires().contains(p))
            .limit(1)
            .collect(Collectors.toList())
            .get(0);
    String query = "DELETE FROM CoLouer WHERE idColocation = ?;";
    try {
      Connector db = Connector.getInstance();
      db.executeUpdate(query, Arrays.asList(l.getId()));
    } catch (SQLException e) {
      Logger.error(e);
    }

    query = "DELETE FROM CoGarantir WHERE idColocation = ?;";
    try {
      Connector db = Connector.getInstance();
      db.executeUpdate(query, Arrays.asList(l.getId()));
    } catch (SQLException e) {
      Logger.error(e);
    }

    c.delColoc(p);

    return c;
  }
}
