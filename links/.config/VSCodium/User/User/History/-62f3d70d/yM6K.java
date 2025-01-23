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
            ReviserLoyer frame = new ReviserLoyer((Logement) proprietaire.getBatiment().get(0).getBiensLouables().get(0));
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
    setSize(750, 500);
    setLocationRelativeTo(null);
    JPanel panel = new JPanel();
    panel.setLayout(new BorderLayout());
    panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

    // Main panel
    JPanel mainPanel = new JPanel();
    int nbPiecesLogement = logement.getNbPieces();
    JLabel label = new JLabel("Entrez ");

    // Footer Panel
    JPanel footerPanel = new JPanel();
    footerPanel.setLayout(new BorderLayout());



    panel.add(mainPanel, BorderLayout.CENTER);
    panel.add(footerPanel, BorderLayout.SOUTH);
    add(panel);
  }

  public Logement getLogement() {
    return this.logement;
  }
}
