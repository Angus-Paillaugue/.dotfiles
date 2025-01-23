package dao.definitions;

import java.util.List;

import modele.Char
ges;

public interface ChangesDAODef {

  Char
  ges create(Char
  ges charges);

  Char
  ges find(int id);

  void update(Char
  ges charges);

  void delete(int id);

  List<Char
  ges> findAll();

}
