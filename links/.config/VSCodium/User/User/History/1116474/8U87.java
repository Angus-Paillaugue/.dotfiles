package dao.definitions;

import java.util.List;

import modele.Logement;
import modele.Loyer;

public interface LoyerDAODef {

  Loyer create(Loyer loyer, int idbienLouable);

  Loyer find(int id);

  void update(Loyer loyer, int idbienLouable);

  void delete(int id);

  List<Loyer> findAllForLogement(Logement logement)

  Loyer findLatestForLogement(int id);

  List<Loyer> findAll();

}
