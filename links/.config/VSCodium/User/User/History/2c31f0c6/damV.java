package vues;

import java.awt.Color;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.util.Map;

import javax.swing.BorderFactory;
import javax.swing.ButtonGroup;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.JSeparator;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;
import javax.swing.border.TitledBorder;

import controleurs.ModifierLogementControleur;
import modele.Logement;
import modele.noteEnergetique;
import vues.composants.Button;
import vues.composants.FilePicker;
import vues.composants.MoneyTextField;

public class ModifierLogement extends JFrame {
  private static final long serialVersionUID = 1L;
  public Logement logement;
  public JPanel mainPanel;

  private Map<String, String> files;

  public ModifierLogement(Logement l) {
    this.logement = l;
    setTitle("Modifier un logement");
    setSize(1000, 620);
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setLocationRelativeTo(null);

    ModifierLogementControleur controleur = new ModifierLogementControleur(this);

    mainPanel = new JPanel(new GridBagLayout());
    mainPanel.setBorder(new EmptyBorder(20, 20, 20, 20));
    mainPanel.setBackground(Color.WHITE);

    mainPanel = new JPanel(new GridBagLayout());
    mainPanel.setBorder(new EmptyBorder(20, 20, 20, 20));
    mainPanel.setBackground(Color.WHITE);

    GridBagConstraints gbc = new GridBagConstraints();
    gbc.insets = new Insets(5, 5, 5, 5);
    gbc.fill = GridBagConstraints.HORIZONTAL;
    gbc.anchor = GridBagConstraints.NORTHWEST;

    // Window title
    JLabel titleLabel = new JLabel("Modifier un logement");
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

    JPanel formPanel = new JPanel(new GridBagLayout());
    formPanel.setBackground(null);
    TitledBorder formBorder = BorderFactory.createTitledBorder("Informations générales");
    formBorder.setTitleFont(Constants.BASE_FONT);
    formBorder.setTitleColor(Constants.BODY_COLOR);
    formPanel.setBorder(
        BorderFactory.createCompoundBorder(
            formBorder, BorderFactory.createEmptyBorder(5, 5, 5, 5)));
    formPanel.setBackground(Color.WHITE);

    GridBagConstraints formGbc = new GridBagConstraints();
    formGbc.insets = new Insets(5, 5, 5, 5);
    formGbc.fill = GridBagConstraints.HORIZONTAL;
    formGbc.weightx = 1.0;

    // General informations fields
    gbc.gridx = 0;
    gbc.gridy = 3;
    gbc.gridwidth = 1;
    formPanel.add(new JLabel("Complément d'adresse"), gbc);
    JTextField textFieldComplement = new JTextField();
    textFieldComplement.setName("complementAdresse");
    textFieldComplement.setText(String.valueOf(this.logement.getAdresse().getComplement()));
    gbc.gridx = 1;
    gbc.gridwidth = 2;
    formPanel.add(textFieldComplement, gbc);

    // SuperficieTotale field
    gbc.gridx = 0;
    gbc.gridy = 4;
    gbc.gridwidth = 1;
    gbc.weightx = 1.0;
    formPanel.add(new JLabel("Surface habitable"), gbc);
    JTextField superficieField = new JTextField();
    superficieField.setName("surfaceHabitable");
    superficieField.setText(String.valueOf(this.logement.getSurfaceHabitable()));
    gbc.gridx = 1;
    gbc.gridwidth = 1;
    formPanel.add(superficieField, gbc);
    JLabel unitLabel = new JLabel("m²");
    gbc.gridx = 2;
    formPanel.add(unitLabel, gbc);
    gbc.gridx = 0;

    // Surface totale
    addLabelAndTextField(
        formPanel, gbc, "surfaceTotale", "Surface totale", 5, this.logement.getSurfaceTotale());

    // Note energetique
    gbc.gridx = 0;
    gbc.gridy = 13;
    gbc.gridwidth = 1;
    formPanel.add(new JLabel("Note énergétique"), gbc);

    JComboBox<String> comboBoxNoteEnergetique = new JComboBox<>(noteEnergetique.getNames());
    comboBoxNoteEnergetique.setName("noteEnergetique");
    comboBoxNoteEnergetique.setSelectedItem(this.logement.getConstatEnergetique().toString());
    gbc.gridx = 1;
    gbc.gridwidth = 2;
    formPanel.add(comboBoxNoteEnergetique, gbc);

    // Note gaz a effet de serre
    gbc.gridx = 0;
    gbc.gridy = 14;
    gbc.gridwidth = 1;
    formPanel.add(new JLabel("Emissions gaz à effet de serre"), gbc);

    JComboBox<String> comboBox = new JComboBox<>(noteEnergetique.getNames());
    comboBox.setName("emissionGazEffetDeSerre");
    comboBox.setSelectedItem(this.logement.getEmissionGazEffetDeSerre().toString());
    gbc.gridx = 1;
    gbc.gridwidth = 2;
    formPanel.add(comboBox, gbc);

    // Radio bouton meuble
    gbc.gridx = 0;
    gbc.gridy = 16;
    gbc.gridwidth = 2;
    formPanel.add(new JLabel("Meublé"), gbc);

    ButtonGroup buttonGroup = new ButtonGroup();
    String[] options = {"Oui", "Non"};
    for (int i = 0; i < options.length; i++) {
      JRadioButton radioButton = new JRadioButton(options[i]);
      radioButton.setName("meuble" + "-" + options[i]);
      buttonGroup.add(radioButton);
      gbc.gridx = 1 + i;
      gbc.gridwidth = 1;
      if (i == 0 && this.logement.isMeuble()) {
        radioButton.setSelected(true);
      } else if (i == 1 && !this.logement.isMeuble()) {
        radioButton.setSelected(true);
      }

      formPanel.add(radioButton, gbc);
    }

    // Taxe fonciere
    gbc.gridx = 0;
    gbc.gridy = 18;
    gbc.gridwidth = 1;
    formPanel.add(new JLabel("Montant taxe foncière"), gbc);

    gbc.gridx = 1;
    gbc.gridwidth = 2;
    MoneyTextField taxeFonciere = new MoneyTextField(null, null, "taxeFonciere");
    taxeFonciere.setName("taxeFonciere");
    taxeFonciere.setText(String.valueOf(this.logement.getTaxeFonciere()));
    formPanel.add(taxeFonciere, gbc);

    // File inputs panel
    JPanel fileInputsPanel = new JPanel(new GridBagLayout());
    fileInputsPanel.setBackground(null);
    TitledBorder fileInputsBorder = BorderFactory.createTitledBorder("Documents");
    fileInputsBorder.setTitleFont(Constants.BASE_FONT);
    fileInputsBorder.setTitleColor(Constants.BODY_COLOR);
    fileInputsPanel.setBorder(
        BorderFactory.createCompoundBorder(
            fileInputsBorder, BorderFactory.createEmptyBorder(5, 5, 5, 5)));
    GridBagConstraints fileInputsGbc = new GridBagConstraints();
    fileInputsGbc.insets = new Insets(5, 5, 5, 5);
    fileInputsGbc.fill = GridBagConstraints.HORIZONTAL;
    fileInputsGbc.weightx = 1.0;

    // Footer buttons
    JPanel buttonPanel = new JPanel(new GridBagLayout());
    buttonPanel.setBackground(null);
    gbc.gridx = 0;
    gbc.gridy = 6;
    gbc.weightx = 0.1;
    gbc.gridwidth = 2;
    gbc.weighty = 0.1;
    gbc.gridheight = 1;
    gbc.anchor = GridBagConstraints.SOUTH;
    gbc.fill = GridBagConstraints.HORIZONTAL;
    mainPanel.add(buttonPanel, gbc);
    // Cancel button
    JButton cancelBtn = new Button("Annuler").build();
    cancelBtn.setName("cancelBtn");
    cancelBtn.addActionListener(controleur);
    buttonPanel.add(cancelBtn);
    // Submit button
    JButton saveBtn = new Button("Enregistrer").build();
    saveBtn.setName("saveBtn");
    saveBtn.addActionListener(controleur);
    buttonPanel.add(saveBtn);
    // Adding file inputs to the file inputs panel
    addLabelAndFilePicker(
        fileInputsPanel,
        gbc,
        "constatAmiante",
        "Constat amiante",
        0,
        this.logement.getConstatAmiante());
    addLabelAndFilePicker(
        fileInputsPanel, gbc, "constatPlomb", "Constat plomb", 1, this.logement.getConstatPlomb());
    addLabelAndFilePicker(
        fileInputsPanel,
        gbc,
        "constatElectricite",
        "Constat électricité",
        2,
        this.logement.getConstatElectricite());

    // Add panels to main panel
    gbc.gridx = 0;
    gbc.gridy = 2;
    gbc.gridwidth = 1;
    gbc.gridheight = 2;
    gbc.weightx = 0.5;
    gbc.weighty = 1;
    gbc.fill = GridBagConstraints.BOTH;
    mainPanel.add(formPanel, gbc);

    // File inputs panel
    gbc.gridx = 0;
    gbc.gridy = 4;
    gbc.gridwidth = 2;
    gbc.weightx = 0.1;
    gbc.gridheight = 2;
    gbc.fill = GridBagConstraints.BOTH;
    mainPanel.add(fileInputsPanel, gbc);

    add(mainPanel);
    setLocationRelativeTo(null);
    setVisible(true);
  }

  private void addLabelAndTextField(
      JPanel panel,
      GridBagConstraints gbc,
      String name,
      String labelText,
      int gridy,
      float prerempli) {
    gbc.gridx = 0;
    gbc.gridy = gridy;
    gbc.gridwidth = 1;
    panel.add(new JLabel(labelText), gbc);

    JTextField textField = new JTextField();
    textField.setName(name);
    textField.setText(String.valueOf(prerempli));
    gbc.gridx = 1;
    gbc.gridwidth = 2;
    panel.add(textField, gbc);
  }

  private void addLabelAndFilePicker(
      JPanel panel,
      GridBagConstraints gbc,
      String name,
      String labelText,
      int gridy,
      String preRemplissage) {
    gbc.gridx = 0;
    gbc.gridy = gridy;
    gbc.gridwidth = 1;
    panel.add(new JLabel(labelText), gbc);

    JPanel filePickerPanel = new JPanel(new GridBagLayout());
    filePickerPanel.setBackground(null);

    JLabel filePickerLabel = new JLabel(preRemplissage);
    filePickerPanel.add(filePickerLabel, gbc);

    JButton filePickerButton = new Button("Choisir un fichier").build();
    filePickerButton.addActionListener(
        e -> {
          String filePath = FilePicker.pickFile();
          if (filePath != null) filePickerLabel.setText(filePath);
        });

    gbc.gridx = 1;
    gbc.gridwidth = 2;
    filePickerButton.setName(name);
    filePickerPanel.add(filePickerButton, gbc);

    panel.add(filePickerPanel, gbc);
  }

  public Map<String, String> getFiles() {
    return files;
  }

  public String getFile(String name) {
    return files.containsKey(name) ? files.get(name) : "";
  }
}
