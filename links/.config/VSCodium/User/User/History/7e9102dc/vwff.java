package dao.definitions;

import java.util.List;
import modele.Garage;

public interface GarageDAODef {

  Garage create(Garage garage);

  Garage find(int id);

  void update(Garage garage);

  void delete(int id);

  List<Garage> findAll();

}
