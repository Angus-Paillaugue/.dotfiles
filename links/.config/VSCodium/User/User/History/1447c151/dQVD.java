package dao.definitions;

import modele.Batiment;

public interface BatimentDAODef {

  Batiment create(Batiment b);

  Batiment find(int id);
}
