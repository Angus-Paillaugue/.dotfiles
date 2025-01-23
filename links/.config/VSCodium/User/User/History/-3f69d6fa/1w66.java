package dao.definitions;

import java.util.List;
import modele.Travaux;

public interface TravauxDAODef {

  Travaux create(Travaux travaux);

  Travaux find(int id);

  void update(Travaux travaux);

  void delete(int id);

  List<Travaux> findAll();

}
