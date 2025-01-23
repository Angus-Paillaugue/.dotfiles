package vues;

import java.awt.Color;
import java.awt.EventQueue;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSeparator;
import javax.swing.border.EmptyBorder;

import controleurs.SelectionTypeDeContratControleur;
import modele.Logement;
import vues.composants.Button;

public class SelectionTypeDeContrat extends JFrame {
  private static final long serialVersionUID = 1L;
  public Logement logement;
  public JPanel mainPanel;

  public SelectionTypeDeContrat(Logement l) {
    this.logement = l;
    setTitle("Selection du type de contrat");
    setSize(400, 300);
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setLocationRelativeTo(null);

    SelectionTypeDeContratControleur c = new SelectionTypeDeContratControleur(this);

    mainPanel = new JPanel(new GridBagLayout());
    mainPanel.setBorder(new EmptyBorder(20, 20, 20, 20));
    mainPanel.setBackground(Color.WHITE);

    GridBagConstraints gbc = new GridBagConstraints();
    gbc.insets = new Insets(5, 5, 5, 5);
    gbc.fill = GridBagConstraints.HORIZONTAL;
    gbc.anchor = GridBagConstraints.NORTHWEST;

    // Window title
    JLabel titleLabel = new JLabel("Type de Contrat");
    titleLabel.setFont(Constants.HEADING_FONT);
    gbc.gridx = 0;
    gbc.gridy = 0;
    gbc.gridwidth = 2;
    mainPanel.add(titleLabel, gbc);
    // Separator
    JSeparator separator = new JSeparator();
    gbc.gridy++;
    gbc.fill = GridBagConstraints.HORIZONTAL;
    mainPanel.add(separator, gbc);

    // Cancel button
    gbc.gridy++;
    gbc.fill = GridBagConstraints.HORIZONTAL;
    JButton locationBtn = new Button("Location").build();
    locationBtn.setName("locationBtn");
    locationBtn.addActionListener(c);
    mainPanel.add(locationBtn, gbc);

    // Cancel button
    gbc.gridx = 1;
    gbc.gridy = 3;
    gbc.gridwidth = 1;
    JButton colocationBtn = new Button("Colocation").build();
    colocationBtn.setName("colocationBtn");
    colocationBtn.addActionListener(c);
    mainPanel.add(colocationBtn, gbc);

    // Cancel button
    gbc.gridy++;
    gbc.fill = GridBagConstraints.HORIZONTAL;
    JButton cancelBtn = new Button("Annuler").build();
    cancelBtn.setName("cancelBtn");
    cancelBtn.addActionListener(c);
    mainPanel.add(cancelBtn, gbc);

    add(mainPanel);
    setLocationRelativeTo(null);
    setVisible(true);
  }

  public static void main(String[] args) {
    AppTheme.setup();
    EventQueue.invokeLater(
        () -> {
          try {
            SelectionTypeDeContrat frame = new SelectionTypeDeContrat();
            frame.setVisible(true);
          } catch (Exception e) {
            e.printStackTrace();
          }
        });
  }
}
