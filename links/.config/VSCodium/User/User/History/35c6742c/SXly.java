package vues;

import java.awt.*;
import javax.swing.*;
import javax.swing.table.TableColumnModel;

import dao.LoyerDAO;
import dao.ProprietaireDAO;
import jdbc.SharedState;
import modele.Logement;
import modele.Proprietaire;
import vues.composants.Button;

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
    setSize(750, 500);
    setLocationRelativeTo(null);
    JPanel panel = new JPanel();
    panel.setLayout(new BorderLayout());
    panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

    // Title Label
    JLabel titleLabel = new JLabel("Loyers");
    titleLabel.setFont(Constants.WINDOW_TITLE_FONT);
    titleLabel.setForeground(Constants.HEADING_COLOR);
    titleLabel.setBorder(BorderFactory.createEmptyBorder(0, 0, 10, 0));
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
    Integer[] columnsSizes = {170, 130, 150, 150, 150};
    TableColumnModel columnModel = table.getColumnModel();
    for (int i = 0; i < columnNames.length; i++) {
      columnModel.getColumn(i).setMaxWidth(columnsSizes[i]);
    }
    JScrollPane scrollPane = new JScrollPane(table);
    table.setFillsViewportHeight(true);
    table.setEdi
    scrollPane.add(table.getTableHeader());

    // Rent review
    JPanel rentPanel = new JPanel();
    rentPanel.setBorder(BorderFactory.createEmptyBorder(10, 0, 0, 0));
    rentPanel.setLayout(new BorderLayout());
    JButton reviewRentButton = new Button("Réviser loyer").build();
    reviewRentButton.setName("reviserLoyer");
    rentPanel.add(reviewRentButton, BorderLayout.CENTER);

    panel.add(scrollPane, BorderLayout.CENTER);
    panel.add(rentPanel, BorderLayout.SOUTH);

    add(panel);
  }
}
