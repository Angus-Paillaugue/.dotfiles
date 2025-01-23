package vues;

import java.awt.BorderLayout;
import java.awt.GridLayout;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.TitledBorder;

import controleurs.ControleurSupprimerLocataire;
import modele.Logement;
import modele.Personne;
import utils.Logger;
import vues.composants.Button;

public class SupprimerLocataire extends JFrame {
  private static final long serialVersionUID = 1L;
  public Logement logement;

  public JPanel locatairePanel;

  public SupprimerLocataire(Logement l) {
    this.logement = l;
    Logger.log(l.getColocation().getContrats());
    setTitle("Supprimer un locataire");
    setSize(800, 400);
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setLocationRelativeTo(null);

    // Panel principal avec un GridLayout

    this.locatairePanel =
        new JPanel(new GridLayout(8, 1, 10, 10)); // 8 lignes max, une par locataire
    TitledBorder locataireBorder = BorderFactory.createTitledBorder("Locataires");
    locataireBorder.setTitleFont(Constants.BASE_FONT);
    locataireBorder.setTitleColor(Constants.BODY_COLOR);
    locatairePanel.setBorder(
        BorderFactory.createCompoundBorder(
            locataireBorder, BorderFactory.createEmptyBorder(5, 5, 5, 5)));

    // Remplir le locatairePanel avec des sous-panneaux
    for (Personne p : l.getColocation().getColocataires()) {
      // Panneau horizontal pour chaque locataire
      JPanel locataireSubPanel = new JPanel(new BorderLayout(5, 0));
      JCheckBox checkBox = new JCheckBox();
      checkBox.setName(String.valueOf(p.getIdLocataire()));
      JLabel locataireLabel = new JLabel(p.getNom() + " " + p.getPrenom());
      locataireSubPanel.add(checkBox, BorderLayout.WEST);
      locataireSubPanel.add(locataireLabel, BorderLayout.CENTER);
      locatairePanel.add(locataireSubPanel);
    }

    // Ajouter le panel principal au CENTER
    add(locatairePanel, BorderLayout.CENTER);

    JPanel btnPanel = new JPanel(new GridLayout(0, 2, 10, 10));
    ControleurSupprimerLocataire c = new ControleurSupprimerLocataire(this);
    JButton saveButton = new Button("Supprimer").build();
    saveButton.setName("suppButton");
    saveButton.addActionListener(c);
    JButton annulerButton = new Button("Annuler").build();
    annulerButton.setName("cancelButton");
    annulerButton.addActionListener(c);

    btnPanel.add(annulerButton, BorderLayout.WEST);
    btnPanel.add(saveButton, BorderLayout.CENTER);

    add(btnPanel, BorderLayout.SOUTH);
  }
}
