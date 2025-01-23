package dao.definitions;

import java.util.List;

import modele.Batiment;

public interface BatimentDAODef {

  Batiment create(Batiment b);

  Batiment find(int id);

  void update(Batiment b);

  void delete(int id);

  List<Batiment> findAll();

}
