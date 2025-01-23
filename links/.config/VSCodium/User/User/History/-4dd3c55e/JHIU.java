package dao.definitions;

import java.util.List;

import modele.Colocation;
import modele.Location;
import modele.Logement;
import modele.Personne;

public interface ColocationDAODef {

  void create(Location l, Logement logement);

  Colocation findByLogement(Logement logement);

  void update(Colocation colocation);

  void update(Colocation colocation, Personne personne);

  List<Colocation> findAll();

  Colocation addColoc(Colocation c, Location l, Personne p);

  Colocation delColoc(Colocation c, Personne p);
}
