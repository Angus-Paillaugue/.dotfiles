package dao.definitions;

import modele.Batiment;

public interface BatimentDAODef {

  Batiment create(Batiment batiment);

  Batiment find(int id);
}
