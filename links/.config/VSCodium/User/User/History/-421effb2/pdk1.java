package DAO;

import java.sql.SQLException;
import java.time.LocalDate;

import static org.junit.Assert.assertEquals;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import dao.ChargesDAO;
import jdbc.Connector;
import modele.Charges;

public class GarantDAOTests {

  private GarantDAO garantDAO;
  private Connector connector;

  @Before
  public void setUp() throws SQLException {
    this.connector = Connector.getInstance();
    this.connector.getConnection().setAutoCommit(false);
    garantDAO = new GarantDAO();
  }
}
