package dao.definitions;

import java.util.List;
import modele.Loyer;

public interface LoyerDAODef {

  Loyer create(Loyer loyer);

  Loyer find(int id);

  void update(Loyer loyer);

  void delete(int id);

  List<Loyer> findAll();

}
