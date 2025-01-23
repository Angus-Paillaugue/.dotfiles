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
import vues.composants.TextField;

public class ReviserLoyer extends JFrame {

  private static final long serialVersionUID = 1L;

  private Logement logement;

  public static void main(String[] args) {
    AppTheme.setup();
    // TODO: Remove this
    ProprietaireDAO proprietaireDAO = new ProprietaireDAO();
    Proprietaire proprietaire = proprietaireDAO.findByMail("test@test.fr");
    SharedState.getInstance().setProprietaire(proprietaire);
    EventQueue.invokeLater(
        () -> {
          try {
            ReviserLoyer frame =
                new ReviserLoyer(
                    (Logement) proprietaire.getBatiment().get(0).getBiensLouables().get(0));
            frame.setVisible(true);
          } catch (Exception e) {
            e.printStackTrace();
          }
        });
  }

  public ReviserLoyer(Logement logement) {
    this.logement = logement;
    setTitle("Réviser loyers");
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setSize(350, 300);
    setLocationRelativeTo(null);
    JPanel panel = new JPanel();
    panel.setLayout(new BorderLayout());
    panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

    // Main panel
    JPanel mainPanel = new JPanel();
    mainPanel.setLayout(new BorderLayout());

    // Text at the top
    int nbPiecesLogement = logement.getNbPieces();
    JLabel label = new JLabel("Entrez l'IRL pour un bâtiment de " + nbPiecesLogement + " pièce" + (nbPiecesLogement > 0 ? "s" : ""));
    mainPanel.add(label, BorderLayout.NORTH);

    // Inputs
    JPanel inputsPanel = new JPanel(new GridBagLayout());
    GridBagConstraints gbc = new GridBagConstraints();
    gbc.insets = new Insets(5, 5, 5, 5);
    gbc.fill = GridBagConstraints.HORIZONTAL;
    gbc.anchor = GridBagConstraints.NORTHWEST;
    gbc.gridx = 0;
    gbc.gridy = 0;
    gbc.gridwidth = 2;
    JPanel oldIrlInput = new TextField("Ancien IRL", "", "", "oldIrlValue").build();
    inputsPanel.add(oldIrlInput, gbc);
    JPanel newIrlInput = new TextField("Nouveau IRL", "", "", "newIewValue").build();
    inputsPanel.add(newIrlInput, BorderLayout.SOUTH);
    mainPanel.add(inputsPanel, BorderLayout.CENTER);

    // Footer Panel
    JPanel footerPanel = new JPanel();
    footerPanel.setLayout(new BorderLayout());

    mainPanel.add(footerPanel, BorderLayout.SOUTH);
    panel.add(mainPanel, BorderLayout.CENTER);
    add(panel);
  }

  public Logement getLogement() {
    return this.logement;
  }
}
