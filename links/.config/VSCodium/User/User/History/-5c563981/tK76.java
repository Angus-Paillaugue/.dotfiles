package vues;

import java.awt.*;
import javax.swing.*;

import controleurs.MesDocumentsControlleur;

public class MesDocuments extends JFrame {
  private static final long serialVersionUID = 1L;

  public static void main(String[] args) {
    AppTheme.setup();
    EventQueue.invokeLater(
        () -> {
          try {
            MesDocuments frame = new MesDocuments();
            frame.setVisible(true);
          } catch (Exception e) {
            e.printStackTrace();
          }
        });
  }

  public MesDocuments() {
    setTitle("Mes documents");
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setSize(400, 450);
    setLocationRelativeTo(null);
    setLayout(new BorderLayout());

    MesDocumentsControlleur controleur = new MesDocumentsControlleur(this);

    JPanel panel = new JPanel();
    panel.setLayout(new BorderLayout());

    // Title Label
    JLabel label = new JLabel("Mes documents");
    label.setFont(Constants.WINDOW_TITLE_FONT);
    label.setForeground(Constants.HEADING_COLOR);
    JPanel titlePanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
    titlePanel.add(label);
    panel.add(titlePanel, BorderLayout.NORTH);

    // Button Panel
    JPanel buttonPanel = new JPanel(new GridBagLayout());
    GridBagConstraints gbc = new GridBagConstraints();
    gbc.insets = new Insets(10, 10, 10, 10); // Add padding between components

    JButton importLoyersCSVButton = new JButton("Importer loyers");
    importLoyersCSVButton.setName("importerLoyersButton");
    importLoyersCSVButton.addActionListener(controleur);
    gbc.gridx = 0;
    gbc.gridy = 0;
    gbc.anchor = GridBagConstraints.CENTER;
    gbc.fill = GridBagConstraints.NONE;
    buttonPanel.add(importLoyersCSVButton, gbc);

    // Contrat de location Button
    JButton contractDeLocationButton = new JButton("Contrats de location");
    contractDeLocationButton.setName("contratDeLocationButton");
    contractDeLocationButton.addActionListener(controleur);
    gbc.gridx = 0;
    gbc.gridy = 1;
    gbc.anchor = GridBagConstraints.CENTER;
    gbc.fill = GridBagConstraints.NONE;
    buttonPanel.add(contractDeLocationButton, gbc);

    // Quitance de loyer Button
    JButton quittanceDeLoyerButton = new JButton("Quittances de loyer");
    quittanceDeLoyerButton.setName("quittanceDeLoyerButton");
    quittanceDeLoyerButton.addActionListener(controleur);
    gbc.gridx = 0;
    gbc.gridy = 2;
    gbc.anchor = GridBagConstraints.CENTER;
    gbc.fill = GridBagConstraints.NONE;
    buttonPanel.add(quittanceDeLoyerButton, gbc);

    // Récapitulatif fiscal Button
    JButton recapitulatifFiscalButton = new JButton("Récapitulatif fiscal");
    gbc.gridy = 5;
    gbc.anchor = GridBagConstraints.CENTER;
    gbc.fill = GridBagConstraints.NONE;
    buttonPanel.add(recapitulatifFiscalButton, gbc);

    panel.add(buttonPanel, BorderLayout.CENTER);

    // Close Button
    JButton closeButton = new JButton("Fermer");
    closeButton.setName("cancelButton");
    closeButton.addActionListener(controleur);
    JPanel closePanel = new JPanel(new FlowLayout(FlowLayout.CENTER));
    closePanel.add(closeButton);
    panel.add(closePanel, BorderLayout.SOUTH);

    add(panel, BorderLayout.CENTER);
  }
}
