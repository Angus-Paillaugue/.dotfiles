package dao.definitions;

import java.util.List;

import modele.Batiment;

public interface BatimentDAODef {

  Batiment create(Batiment batiment);

  Batiment find(int id);

  void update(Batiment batiment);

  void delete(int id);

  List<Batiment> findAll();

}
