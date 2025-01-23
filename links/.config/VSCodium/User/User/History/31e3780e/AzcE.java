package dao.definitions;

import java.util.List;
import modele.Location;
import modele.Logement;
import modele.Personne;

public interface LocationDAODef {

  Location create(Location location);

  Location find(int id);

  void update(Location location);

  void delete(int id);

  List<Location> findAll();

  List<Personne> findLocataires(Logement l);

  List<Personne> findGarants(Logement l);

  void ajouterLocataire(Location l, Personne p);

  void supprimerLocataires(Logement l);

}
