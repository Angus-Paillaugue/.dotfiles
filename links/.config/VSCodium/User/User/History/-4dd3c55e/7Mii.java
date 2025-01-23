package dao.definitions;

import java.util.List;

import modele.Colocation;
import modele.Location;
import modele.Logement;
import modele.Personne;

public interface ColocationDAODef {

  Location create(Location l, int idLogement);

  Colocation findByLogement(Logement logement);

  void update(Colocation t, Personne p);

  void delete(Colocation colocation);

  List<Colocation> findAll();

  Colocation addColoc(Logement logement, Location l);

  Colocation delColoc(Colocation c, Personne p);
}
