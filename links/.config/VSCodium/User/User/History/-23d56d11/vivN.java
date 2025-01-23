package dao;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import jdbc.Connector;
import modele.Adresse;
import modele.BienLouable;
import modele.Loyer;
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

      Adresse adresse = new AdresseDAO().read((int) bien.get("IdAdresse"));
      Loyer loyer = new LoyerDAO().read((int) bien.get("idLoyer"));
      Charges charges = new ChargesDAO().read((int) bien.get("idCharges"));
      return new BienLouable(
        (int) bien.get("id"),
        adresse,
        (String) bien.get("refCadastrale"),
        (boolean) bien.get("bati"),
        (String) bien.get("numeroFiscal"),
        (float) bien.get("taxeFonciere"),
        loyer,
        charges
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
