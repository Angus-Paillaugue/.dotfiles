package dao.definitions;

import java.util.List;

import modele.Colocation;
import modele.Logement;
import modele.Personne;

public interface ColocationDAODef {

  Colocation create(Colocation colocation, Logement logement);

  Colocation findByLogement(Logement logement);

  void update(Colocation t, Personne p);

  void delete(int id);

  List<Colocation> findAll();
}
