package vues;

import java.awt.*;
import javax.swing.*;

import dao.LoyerDAO;
import dao.ProprietaireDAO;
import jdbc.SharedState;
import modele.Logement;
import modele.Proprietaire;

public class Loyers extends JFrame {

  private static final long serialVersionUID = 1L;

  public static void main(String[] args) {
    AppTheme.setup();
    // TODO: Remove this
    ProprietaireDAO proprietaireDAO = new ProprietaireDAO();
    Proprietaire proprietaire = proprietaireDAO.findByMail("test@test.fr");
    SharedState.getInstance().setProprietaire(proprietaire);
    EventQueue.invokeLater(
        () -> {
          try {
            Loyers frame = new Loyers((Logement) proprietaire.getBatiment().get(0).getBiensLouables().get(0));
            frame.setVisible(true);
          } catch (Exception e) {
            e.printStackTrace();
          }
        });
  }

  public Loyers(Logement logement) {
    setTitle("Loyers");
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setSize(500, 450);
    setLocationRelativeTo(null);
    setLayout(new BorderLayout());

    JPanel panel = new JPanel();
    panel.setLayout(new BorderLayout());

    // Title Label
    JLabel titleLabel = new JLabel("Loyers");
    titleLabel.setFont(Constants.WINDOW_TITLE_FONT);
    titleLabel.setForeground(Constants.HEADING_COLOR);
    panel.add(titleLabel, BorderLayout.NORTH);

    // History table
    String[] columnNames = {
        "Montant hors charges",
        "Jour versement",
        "Dernière révision",
        "Prochaine révision",
        "Mode de payment"
    };
    LoyerDAO loyerDao = new LoyerDAO();
    Object[][] data = loyerDao.findAllForLogement(logement).stream()
      .map(loyer -> new Object[]{
        loyer.getMontantHorsCharge(),
        loyer.getJourVersement(),
        loyer.getDateDerniereRevision(),
        loyer.getDateProchaineRevision(),
        loyer.getModeDePaiment()
      })
      .toArray(Object[][]::new);
    JTable table = new JTable(data, columnNames);
    JScrollPane scrollPane = new JScrollPane(table);
    table.setFillsViewportHeight(true);
    scrollPane.setLayout(new BorderLayout());
    scrollPane.add(table.getTableHeader(), BorderLayout.PAGE_START);
    scrollPane.add(table, BorderLayout.CENTER);

    // Rent review
    add(panel, BorderLayout.CENTER);
  }
}
