package dao.definitions;

import java.util.List;
import modele.Location;

public interface LocationDAODef {

  Location create(Location location);

  Location find(int id);

  void update(Location location);

  void delete(int id);

  List<Location> findAll();

}
