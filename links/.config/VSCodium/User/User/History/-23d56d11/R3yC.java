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
      LoyerDAO loyerDAO = new LoyerDAO();
      ChargesDAO chargesDAO = new ChargesDAO();
      int loyerId = loyerDAO.create(b.getLoyer());
      int chargesId = chargesDAO.create(b.getCharges());
      String query = "INSERT INTO Bien_louable (IdAdresse, refCadastrale, bati, numeroFiscal, taxeFonciere, idLoyer, idCharges) VALUES (?, ?, ?, ?, ?, ?, ?)";
      return db.executeUpdate(query, Arrays.asList(b.getAdresse().getId(), b.getRefCadastrale(), b.isBati(), b.getNumeroFiscal(), b.getTaxeFonciere(), loyerId, chargesId));
    } catch (Exception e) {
      Logger.error(e);
    }

    return -1;
  }

  @Override
  public BienLouable read(int id) {
    try {
      Connector db = Connector.getInstance();
      String query = "SELECT * FROM Bien_louable WHERE id = ?";
      Map<String, Object> bien = db.getFirst(query, Arrays.asList(Integer.toString(id)), BienLouable.class);
      if (bien == null) {
        return null;
      }

      return new BienLouable(
        (int) bien.get("id"),
        (int) bien.get("IdAdresse"),
        (String) bien.get("refCadastrale"),
        (boolean) bien.get("bati"),
        (String) bien.get("numeroFiscal"),
        (float) bien.get("taxeFonciere"),
        (int) bien.get("idLoyer"),
        (int) bien.get("idCharges")
      );
    } catch (Exception e) {
      Logger.error(e);
    }

    return null;
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
