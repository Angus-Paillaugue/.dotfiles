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
    setSize(300, 300);
    setLocationRelativeTo(null);
    JPanel panel = new JPanel();
    panel.setLayout(new BorderLayout());
    panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

    // Main panel
    JPanel mainPanel = new JPanel();
    mainPanel.setLayout(new BorderLayout());
    int nbPiecesLogement = logement.getNbPieces();
    JLabel label = new JLabel("Entrez l'IRL pour un bâtiment de " + nbPiecesLogement + " pièce" + (nbPiecesLogement > 0 ? "s" : ""));
    mainPanel.add(label, BorderLayout.NORTH);

    JPanel irlInput = new TextField("IRL", "", "", "irlValue").build();
    mainPanel.add(irlInput, BorderLayout.CENTER);

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
