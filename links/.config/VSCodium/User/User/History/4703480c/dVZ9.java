package vues;

import java.awt.*;
import javax.swing.*;
import java.util.Collections;
import modele.Batiment;
import modele.BienLouable;
import modele.Proprietaire;
import vues.composants.Button;
import vues.composants.SimpleDateField;
import controleurs.GenererQuittanceDeLoyerControleur;
import jdbc.SharedState;

public class GenererQuittanceDeLoyer extends JFrame {
  private static final long serialVersionUID = 1L;

  private ButtonGroup group;
  public JPanel panel;
  public JPanel radioPanelLocation;
  public JPanel radioPanelColocation;
  public JButton genererButton;

  public static void main(String[] args) {
    AppTheme.setup();
    EventQueue.invokeLater(
        () -> {
          try {
            GenererQuittanceDeLoyer frame =
                new GenererQuittanceDeLoyer(SharedState.getInstance().getProprietaire());
            frame.setVisible(true);
          } catch (Exception e) {
            e.printStackTrace();
          }
        });
  }

  public GenererQuittanceDeLoyer(Proprietaire proprietaire) {
    setTitle("Générer une quittance de loyer");
    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    setSize(850, 800);
    setLocationRelativeTo(null);
    GenererQuittanceDeLoyerControleur controleur = new GenererQuittanceDeLoyerControleur(this);

    setLayout(new BorderLayout());

    this.panel = new JPanel(new GridBagLayout());
    GridBagConstraints gbc = new GridBagConstraints();
    gbc.insets = new Insets(10, 10, 10, 10);
    gbc.gridx = 0;
    gbc.gridy = 0;
    gbc.anchor = GridBagConstraints.NORTHWEST;
    gbc.fill = GridBagConstraints.HORIZONTAL;

    // Title Label
    JLabel label = new JLabel("Générer une quittance de loyer");
    label.setFont(Constants.WINDOW_TITLE_FONT);
    label.setForeground(Constants.HEADING_COLOR);
    JPanel titlePanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
    titlePanel.add(label);
    panel.add(titlePanel, gbc);

    gbc.gridy++;
    gbc.anchor = GridBagConstraints.NORTHWEST;

    // Quittance du mois de ...
    JLabel lab_date = new JLabel("Quittance du mois de : ");
    gbc.gridx = 0;
    gbc.gridy = 1;
    panel.add(lab_date, gbc);
    SimpleDateField date = new SimpleDateField(null, "dateQuittance");
    gbc.gridx = 0;
    gbc.gridy = 2;
    panel.add(date.build(), gbc);
    // Radio buttons
    group = new ButtonGroup();
    int nbLocation = 0;
    for (int i = 0; i < proprietaire.getBatiment().size(); i++) {
      Batiment batiment = proprietaire.getBatiment().get(i);
      for (int j = 0; j < batiment.getBiensLouables().size(); j++) {
        BienLouable bien = batiment.getBiensLouables().get(j);
        if (bien.isLocation()) {
          nbLocation++;
        }
      }
    }

    radioPanelLocation =
        new JPanel(
            new GridLayout(0, nbLocation, 10, 10)); // Grid layout with three columns and spacing

    for (int i = 0; i < proprietaire.getBatiment().size(); i++) {
      Batiment batiment = proprietaire.getBatiment().get(i);
      for (int j = 0; j < batiment.getBiensLouables().size(); j++) {
        BienLouable bien = batiment.getBiensLouables().get(j);
        addBien(bien, i * batiment.getBiensLouables().size() + j);
      }
    }
    int nbColocation = 0;
    for (int i = 0; i < proprietaire.getBatiment().size(); i++) {
      Batiment batiment = proprietaire.getBatiment().get(i);
      for (int j = 0; j < batiment.getBiensLouables().size(); j++) {
        BienLouable bien = batiment.getBiensLouables().get(j);
        if (bien.isLocation()) {
          nbColocation++;
        }
      }
    }

    radioPanelColocation =
        new JPanel(
            new GridLayout(0, nbColocation, 10, 10)); // Grid layout with three columns and spacing

    for (int i = 0; i < proprietaire.getBatiment().size(); i++) {
      Batiment batiment = proprietaire.getBatiment().get(i);
      for (int j = 0; j < batiment.getBiensLouables().size(); j++) {
        BienLouable bien = batiment.getBiensLouables().get(j);
        addBien(bien, i * batiment.getBiensLouables().size() + j);
      }
    }

    gbc.gridy++;
    JLabel label1 = new JLabel("Location :");
    panel.add(label1, gbc);
    gbc.gridy++;
    panel.add(radioPanelLocation, gbc);
    gbc.gridy++;
    JLabel label2 = new JLabel("Colocation :");
    panel.add(label2, gbc);
    gbc.gridy++;
    panel.add(radioPanelColocation, gbc);

    add(panel, BorderLayout.NORTH);

    // bottom button Panel
    JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER));
    add(buttonPanel, BorderLayout.SOUTH);

    // Cancel button
    JButton cancelButton = new Button("Annuler").build();
    cancelButton.setName("cancelButton");
    cancelButton.addActionListener(controleur);
    buttonPanel.add(cancelButton);

    // Generate Button
    genererButton = new Button("Générer").build();
    genererButton.setName("genererButton");
    genererButton.setEnabled(false);
    genererButton.addActionListener(controleur);
    buttonPanel.add(genererButton);

    // Add action listener to enable the button when a radio button is selected
    for (AbstractButton button : Collections.list(group.getElements())) {
      button.addActionListener(controleur);
    }
  }

  private void addBien(BienLouable bien, int index) {
    // Check that the property has a tenant
    if (bien.isLocation() && !bien.isColocation()) {
      JRadioButton radioButtonLocation = new JRadioButton(bien.getAdresse().toString());
      group.add(radioButtonLocation);
      radioButtonLocation.setName(String.valueOf(index));
      radioPanelLocation.add(radioButtonLocation);
    }
    if (bien.isColocation() && !bien.isLocation()) {
      JRadioButton radioButtonColocation = new JRadioButton(bien.getAdresse().toString());
      group.add(radioButtonColocation);
      radioButtonColocation.setName(String.valueOf(index));
      radioPanelColocation.add(radioButtonColocation);
    }
  }
}
