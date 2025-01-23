package dao.definitions;

import java.util.List;

import modele.Changes;

public interface ChangesDAODef {

  Changes create(Changes Changes);

  Changes find(int id);

  void update(Changes Changes);

  void delete(int id);

  List<Changes> findAll();

}
