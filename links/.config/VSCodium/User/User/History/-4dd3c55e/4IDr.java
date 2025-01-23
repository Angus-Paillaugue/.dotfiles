package dao.definitions;

import java.util.List;

import modele.Colocation;
import modele.Location;
import modele.Logement;
import modele.Personne;

public interface ColocationDAODef {

  Colocation create(Colocation colocation, Logement logement);

  Colocation findByLogement(Logement logement);

  void update(Colocation t, Personne p);

  void delete(Colocation colocation);

  List<Colocation> findAll();

  void addColoc(Location l, Personne p);

  void delColoc(Colocation c, Personne p);
}
