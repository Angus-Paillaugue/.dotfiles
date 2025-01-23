package dao.definitions;

import java.util.List;

import modele.Assurance;

public interface AssuranceDAODef {

  Assurance create(Assurance Assurance);

  Assurance find(int id);

  void update(Assurance Assurance);

  void delete(int id);

  List<Assurance> findAll();

}
