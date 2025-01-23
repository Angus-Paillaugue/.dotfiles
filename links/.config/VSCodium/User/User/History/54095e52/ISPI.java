package vues;

import java.awt.*;

import javax.swing.*;
import javax.swing.table.TableColumnModel;

import dao.ChargesDAO;
import dao.ProprietaireDAO;
import jdbc.SharedState;
import modele.BienLouable;
import modele.Proprietaire;
import vues.composants.Button;

public class HistoriqueDesCharges extends JFrame {

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
            HistoriqueDesCharges frame =
                new HistoriqueDesCharges(
                    proprietaire.getBatiment().get(0).getBiensLouables().get(0));
            frame.setVisible(true);
          } catch (Exception e) {
            e.printStackTrace();
          }
        });
  }

  public BienLouable b;

  public HistoriqueDesCharges(BienLouable b) {
    this.b = b;
    setTitle("Charges");
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setSize(750, 500);
    setLocationRelativeTo(null);
    JPanel panel = new JPanel();
    panel.setLayout(new BorderLayout());
    panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

    // Title Label
    JLabel titleLabel = new JLabel("Charges");
    titleLabel.setFont(Constants.WINDOW_TITLE_FONT);
    titleLabel.setForeground(Constants.HEADING_COLOR);
    titleLabel.setBorder(BorderFactory.createEmptyBorder(0, 0, 10, 0));
    panel.add(titleLabel, BorderLayout.NORTH);

    // History table
    String[] columnNames = {
      "Date",
      "Provisions sur charges",
      "Éclairage parties communes",
      "Entretien parties communes",
      "Ordures ménagères",
      "Eaux partie fixe"
    };
    ChargesDAO chargesDao = new ChargesDAO();
    Object[][] data =
        chargesDao.findByBienLouable(b.getId()).stream()
            .map(
                charge ->
                    new Object[] {
                      charge.getDateRevision(),
                      charge.getProvisionSurCharge(),
                      charge.getEclairagePartiesCommunes(),
                      charge.getEntretienPartiesCommunes(),
                      charge.getOrduresMenageres(),
                      charge.getEauPartieFixe()
                    })
            .toArray(Object[][]::new);
    JTable table = new JTable(data, columnNames);
    Integer[] columnsSizes = {170, 130, 150, 150, 150, 100};

    TableColumnModel columnModel = table.getColumnModel();
    for (int i = 0; i < columnNames.length; i++) {
      columnModel.getColumn(i).setMaxWidth(columnsSizes[i]);
    }
    JScrollPane scrollPane = new JScrollPane(table);
    table.setFillsViewportHeight(true);
    table.setEnabled(false);
    scrollPane.add(table.getTableHeader());

    // Rent review
    JPanel rentPanel = new JPanel(new BorderLayout());
    GridBagConstraints gbc = new GridBagConstraints();
    gbc.gridx = 0;
    gbc.gridy = 0;
    rentPanel.setBorder(BorderFactory.createEmptyBorder(10, 0, 0, 0));
    JButton reviewRentButton = new Button("Réviser charges").build();
    reviewRentButton.setName("reviserCharges");
    reviewRentButton.addActionListener(
        e -> {
          new RegularisationDesCharges(this.b).setVisible(true);
          this.dispose();
        });
    rentPanel.add(reviewRentButton, BorderLayout.CENTER);

    panel.add(scrollPane, BorderLayout.CENTER);
    panel.add(rentPanel, BorderLayout.SOUTH);

    add(panel);
  }
}
