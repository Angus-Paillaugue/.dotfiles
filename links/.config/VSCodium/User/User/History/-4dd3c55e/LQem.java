package dao.definitions;

import java.util.List;

import modele.Colocation;
import modele.Logement;

public interface ColocationDAODef {

  Colocation create(Colocation colocation);

  Colocation findByLogement(Logement logement);

  void update(Colocation colocation);

  void delete(int id);

  List<Colocation> findAll();
}
