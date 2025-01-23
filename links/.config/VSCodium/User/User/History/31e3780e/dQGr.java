package dao.definitions;

import java.util.List;
import modele.Jurisprudence;

public interface LocationDAODef {

  Jurisprudence create(Jurisprudence location);

  Jurisprudence find(int id);

  void update(Jurisprudence location);

  void delete(int id);

  List<Jurisprudence> findAll();

}
