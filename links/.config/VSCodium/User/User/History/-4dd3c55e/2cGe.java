package dao.definitions;

import java.util.List;

import modele.Colocation;

public interface ColocationDAODef {

  Colocation create(Colocation colocation);

  Colocation find(int id);

  void update(Colocation colocation);

  void delete(int id);

  List<Colocation> findAll();

}
