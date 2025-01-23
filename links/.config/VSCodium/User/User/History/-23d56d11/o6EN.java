package dao;

import java.util.Arrays;
import java.util.List;

import jdbc.Connector;
import modele.BienLouable;
import utils.Logger;

public class BienLouableDAO implements GenericDAO<BienLouable> {

  @Override
  public int create(BienLouable b) {
    try {
      Connector db = Connector.getInstance();
      String query = "INSERT INTO Bien_louable (IdAdresse, refCadastrale, bati, numeroFiscal, taxeFonciere, idLoyer, idCharges) VALUES (?, ?, ?, ?, ?, ?, ?)";
      int chargeId = db.executeUpdate(query, Arrays.asList(
        b.getRefCadastrale(),
        b.get(),
        b.getMontantDepotGarantie(),
        b.getNumeroFiscal(),
        b.getTaxeFonciere(),
        b.getNumeroContrat(),
        b.getAdresse().getId()
      ));
    } catch (Exception e) {
      Logger.error(e);
    }

    return -1;
  }

  @Override
  public BienLouable read(int id) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'read'");
  }

  @Override
  public void update(BienLouable t) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'update'");
  }

  @Override
  public void delete(int id) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'delete'");
  }

  @Override
  public List<BienLouable> findAll() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'findAll'");
  }

}
