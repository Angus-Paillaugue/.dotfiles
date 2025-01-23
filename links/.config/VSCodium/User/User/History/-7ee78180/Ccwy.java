package vues;

import java.awt.*;
import javax.swing.*;

import vues.composants.Button;
import vues.composants.DateField;
import vues.composants.IntegerTextField;
import vues.composants.MoneyTextField;
import controleurs.ControleurAjouterLocataire;
import modele.Logement;
import modele.SituationFamiliale;
import modele.TypeDeContratDeTravail;

public class AjouterLocataire extends JFrame {
  private static final long serialVersionUID = 1L;
  public Logement logement;
  public JPanel panel;

  public AjouterLocataire(Logement l) {
    this.logement = l;
    setTitle("Ajouter un locataire");
    setSize(800, 800);
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setLocationRelativeTo(null);

    // Main container panel
    panel = new JPanel();
    panel.setLayout(new GridLayout(0, 3, 10, 10));
    panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

    addField(panel, "nom", "Nom:", new JTextField());
    addField(panel, "prenom", "Prénom:", new JTextField());
    addField(
        panel,
        "dateNaissance",
        "Date de naissance:",
        new DateField("03/05/1955", "dateNaissance").build());
    addField(panel, "lieuNaissance", "Lieu de naissance:", new JTextField());

    JComboBox<String> situationFamiliale = new JComboBox<>(SituationFamiliale.getValues());
    situationFamiliale.setSelectedItem("Marié");
    addField(panel, "situationFamille", "Situation familiale:", situationFamiliale);

    addField(panel, "profession", "Profession:", new JTextField());
    addField(panel, "employeur", "Employeur:", new JTextField());

    JComboBox<String> contratTravail = new JComboBox<>(TypeDeContratDeTravail.getNames());
    contratTravail.setSelectedItem("CDD");
    addField(panel, "contratDeTravail", "Contrat de travail:", contratTravail);

    addField(
        panel,
        "remNet",
        "Rémunération mensuelle NET:",
        new MoneyTextField(null, null, "remNet").build());
    addField(panel, "id", "Identifiant:", new IntegerTextField("id").build());
    addField(
        panel,
        "autreRemuneration",
        "Autre rémunération:",
        new MoneyTextField(null, null, "autreRemuneration").build());
    addField(panel, "numero", "Numero:", new IntegerTextField("numero").build());
    addField(panel, "rue", "Rue:", new JTextField());
    addField(panel, "complement", "Complément:", new JTextField());
    addField(panel, "cp", "Code postal:", new JTextField());
    addField(panel, "ville", "Ville:", new JTextField());
    addField(panel, "email", "E-mail:", new JTextField());
    addField(panel, "telephone", "Téléphone:", new JTextField());

    addField(
        panel, "caution", "Caution versée:", new MoneyTextField(null, null, "caution").build());

    // Button panel
    JPanel buttonPanel = new JPanel();
    ControleurAjouterLocataire c = new ControleurAjouterLocataire(this);
    JButton saveButton = new Button("Enregistrer").build();
    saveButton.setName("saveButton");
    saveButton.addActionListener(c);
    JButton annulerButton = new Button("Annuler").build();
    annulerButton.setName("cancelButton");
    annulerButton.addActionListener(c);
    buttonPanel.add(annulerButton);
    buttonPanel.add(saveButton);

    // Add components to frame
    add(panel, BorderLayout.CENTER);
    add(buttonPanel, BorderLayout.SOUTH);
  }

  private void addField(JPanel panel, String nom, String labelText, JComponent field) {
    panel.add(new JLabel(labelText));
    field.setName(nom);
    panel.add(field);
    panel.add(Box.createHorizontalStrut(15)); // Empty space for alignment
  }
}
