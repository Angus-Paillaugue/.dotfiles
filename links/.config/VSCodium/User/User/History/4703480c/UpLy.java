package vues;

import java.awt.*;
import javax.swing.*;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import modele.Batiment;
import modele.BienLouable;
import modele.Logement;
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
                new GenererQuittanceDeLoyer();
            frame.setVisible(true);
          } catch (Exception e) {
            e.printStackTrace();
          }
        });
  }

  public GenererQuittanceDeLoyer() {
    setTitle("Générer une quittance de loyer");
    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    setSize(850, 800);
    setLocationRelativeTo(null);
    GenererQuittanceDeLoyerControleur controleur = new GenererQuittanceDeLoyerControleur(this);
    Proprietaire proprietaire = SharedState.getInstance().getProprietaire();

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

    List<Logement> logements =
        proprietaire.getBatiment().stream()
          .flatMap(b -> b.getBiensLouables().stream())
          .filter(l -> l instanceof Logement)
          .map(l -> (Logement) l)
          .collect(Collectors.toList());

    int nbLocation = Math.max(logements.stream().filter(Logement::isLocation).collect(Collectors.toList()).size(), 1);
    int nbColocation = Math.max(logements.stream().filter(Logement::isColocation).collect(Collectors.toList()).size(), 1);

    radioPanelLocation = new JPanel(
        new GridLayout(0, nbLocation, 10, 10));
    radioPanelColocation =
        new JPanel(
            new GridLayout(0, nbColocation, 10, 10));

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
