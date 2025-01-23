package vues;

import java.awt.*;
import javax.swing.*;

import controleurs.ReviserLoyerControleur;
import modele.Logement;
import vues.composants.Button;
import vues.composants.TextField;

public class ReviserLoyer extends JFrame {

  private static final long serialVersionUID = 1L;

  private Logement logement;
  public JPanel mainPanel;

  public ReviserLoyer(Logement logement) {
    this.logement = logement;
    setTitle("Réviser loyers");
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setSize(350, 300);
    setLocationRelativeTo(null);
    JPanel panel = new JPanel();
    panel.setLayout(new BorderLayout());
    panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

    ReviserLoyerControleur controleur = new ReviserLoyerControleur(this);

    // Main panel
    this.mainPanel = new JPanel();
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
    JPanel oldIrlInput = new TextField("Ancien IRL", "", "euro-16x16-body.png", "oldIrlValue").build();
    inputsPanel.add(oldIrlInput, gbc);
    gbc.gridy = 1;
    JPanel newIrlInput = new TextField("Nouveau IRL", "", "euro-16x16-body.png", "newIewValue").build();
    inputsPanel.add(newIrlInput, gbc);
    mainPanel.add(inputsPanel, BorderLayout.CENTER);

    // Footer Panel
    JPanel footerPanel = new JPanel();
    footerPanel.setLayout(new BorderLayout());
    JButton cancelButton = new Button("Annuler").build();
    cancelButton.setName("cancel");
    cancelButton.addActionListener(controleur);
    footerPanel.add(cancelButton, BorderLayout.WEST);
    JButton confirmButton = new Button("Modifier").build();
    confirmButton.setName("modifier");
    confirmButton.addActionListener(controleur);
    footerPanel.add(confirmButton, BorderLayout.EAST);

    mainPanel.add(footerPanel, BorderLayout.SOUTH);
    panel.add(mainPanel, BorderLayout.CENTER);
    add(panel);
  }

  public Logement getLogement() {
    return this.logement;
  }
}
