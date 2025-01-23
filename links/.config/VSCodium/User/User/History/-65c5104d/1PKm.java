package vues;

import java.awt.*;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.util.HashMap;
import java.util.Map;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.TitledBorder;

import controleurs.AjouterLogementControleur;
import jdbc.SharedState;
import modele.ModeDePaiment;
import modele.noteEnergetique;
import vues.composants.Button;
import vues.composants.DateField;
import vues.composants.FilePicker;
import vues.composants.MoneyTextField;
import vues.composants.TextField;

public class AjouterLogement extends JFrame {
  private static final long serialVersionUID = 1L;

  public JPanel mainPanel;

  private Map<String, String> files;

  public static void main(String[] args) {
    AppTheme.setup();
    EventQueue.invokeLater(
        () -> {
          try {
            AjouterLogement frame = new AjouterLogement();
            frame.setVisible(true);
          } catch (Exception e) {
            e.printStackTrace();
          }
        });
  }

  public AjouterLogement() {
    setTitle("Ajouter un logement");
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setSize(1000, 1000);

    AjouterLogementControleur controleur = new AjouterLogementControleur(this);

    this.files = new HashMap<>();

    mainPanel = new JPanel(new GridBagLayout());
    mainPanel.setBorder(new EmptyBorder(20, 20, 20, 20));
    mainPanel.setBackground(Color.WHITE);

    GridBagConstraints gbc = new GridBagConstraints();
    gbc.insets = new Insets(5, 5, 5, 5);
    gbc.fill = GridBagConstraints.HORIZONTAL;
    gbc.anchor = GridBagConstraints.NORTHWEST;

    // Window title
    JLabel titleLabel = new JLabel("Ajouter un logement");
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
    addLabelAndTextField(formPanel, gbc, "complementAdresse", "Complément d'adresse", 3);
    // Superficie field
    gbc.gridx = 0;
    gbc.gridy = 4;
    gbc.gridwidth = 1;
    gbc.weightx = 1.0;
    formPanel.add(new JLabel("Surface habitable"), gbc);
    JTextField superficieField = new JTextField();
    superficieField.setName("surfaceHabitable");
    gbc.gridx = 1;
    gbc.gridwidth = 1;
    formPanel.add(superficieField, gbc);
    JLabel unitLabel = new JLabel("m²");
    gbc.gridx = 2;
    formPanel.add(unitLabel, gbc);
    gbc.gridx = 0;
    addLabelAndTextField(formPanel, gbc, "surfaceTotale", "Surface totale", 5);
    addLabelAndTextField(formPanel, gbc, "nbPieces", "Nombre de pièces", 6);
    addLabelAndTextField(formPanel, gbc, "referenceLogement", "Référence logement", 8);
    addLabelAndTextField(formPanel, gbc, "refCadastrale", "Référence cadastrale", 9);
    // Numéro fiscal field
    gbc.gridx = 0;
    gbc.gridy = 10;
    gbc.gridwidth = 1;
    formPanel.add(new JLabel("Numéro fiscal"), gbc);
    JFormattedTextField formattedTextField = new JFormattedTextField();
    formattedTextField.setName("numeroFiscal");
    formattedTextField.addKeyListener(
        new KeyAdapter() {

          @Override
          public void keyTyped(KeyEvent e) {
            char c = e.getKeyChar();
            String inputValue = formattedTextField.getText();
            if (!Character.isDigit(c) && c != KeyEvent.VK_BACK_SPACE && c != KeyEvent.VK_DELETE) {
              e.consume();
            }

            if (inputValue.length() >= 12) {
              e.consume();
            }
          }
        });
    formattedTextField.setText("");
    gbc.gridx = 1;
    gbc.gridwidth = 2;
    formPanel.add(formattedTextField, gbc);
    addLabelAndComboBox(
        formPanel, gbc, "noteEnergetique", "Note énergétique", noteEnergetique.getNames(), 13);
    addLabelAndComboBox(
        formPanel,
        gbc,
        "emissionGazEffetDeSerre",
        "Emissions gaz à effet de serre",
        noteEnergetique.getNames(),
        14);
    addLabelAndRadioButtons(formPanel, gbc, "bati", "Bâti", new String[] {"Oui", "Non"}, 15);
    addLabelAndRadioButtons(formPanel, gbc, "meuble", "Meublé", new String[] {"Oui", "Non"}, 16);
    addLabelAndCustomField(
        formPanel,
        gbc,
        "Montant taxe foncière",
        new MoneyTextField(null, null, "taxeFonciere").build(),
        18);
    addLabelAndCustomField(
        formPanel,
        gbc,
        "Date permis de construire",
        new DateField(null, "datePermisConstruire").build(),
        19);
    addLabelAndCustomField(
        formPanel,
        gbc,
        "Date construction bâtiment",
        new DateField(null, "dateConstructionBatiment").build(),
        20);
    addLabelAndTextField(formPanel, gbc, "accesTechnologique", "Accès technologique", 22);
    addLabelAndComboBox(
        formPanel,
        gbc,
        "batiment",
        "Bâtiment",
        SharedState.getInstance().getProprietaire().getBatiment().stream()
            .map((b) -> b.getAdresse().toString())
            .toArray(String[]::new),
        23);

    // Money related fields panel
    JPanel rentPanel = new JPanel(new GridBagLayout());
    rentPanel.setBackground(null);
    TitledBorder locataireBorder = BorderFactory.createTitledBorder("Loyer");
    locataireBorder.setTitleFont(Constants.BASE_FONT);
    locataireBorder.setTitleColor(Constants.BODY_COLOR);
    rentPanel.setBorder(
        BorderFactory.createCompoundBorder(
            locataireBorder, BorderFactory.createEmptyBorder(5, 5, 5, 5)));
    GridBagConstraints rentGbc = new GridBagConstraints();
    rentGbc.insets = new Insets(5, 5, 5, 5);
    rentGbc.fill = GridBagConstraints.HORIZONTAL;
    rentGbc.weightx = 1.0;
    // Adding rent fields to the rent panel
    addLabelAndCustomField(
        rentPanel,
        gbc,
        "Montant hors charges",
        new MoneyTextField(null, null, "montantHorsCharges").build(),
        0);
    addLabelAndCustomField(
        rentPanel,
        gbc,
        "Date prochaine révision",
        new DateField(null, "dateProchaineRevision").build(),
        4);
    addLabelAndComboBox(
        rentPanel, gbc, "modeDePayment", "Mode de paiement", ModeDePaiment.getValues(), 6);
    addLabelAndCustomField(
        rentPanel,
        gbc,
        "Jour versement",
        new TextField(null, "5", null, "jourVersement").build(),
        8);

    // Charges panel
    JPanel chargesPanel = new JPanel(new GridBagLayout());
    chargesPanel.setBackground(null);
    TitledBorder chargesBorder = BorderFactory.createTitledBorder("Charges");
    chargesBorder.setTitleFont(Constants.BASE_FONT);
    chargesBorder.setTitleColor(Constants.BODY_COLOR);
    chargesPanel.setBorder(
        BorderFactory.createCompoundBorder(
            chargesBorder, BorderFactory.createEmptyBorder(5, 5, 5, 5)));
    GridBagConstraints chargesGbc = new GridBagConstraints();
    chargesGbc.insets = new Insets(5, 5, 5, 5);
    chargesGbc.fill = GridBagConstraints.HORIZONTAL;
    chargesGbc.weightx = 1.0;
    // Adding charges fields to the charges panel
    addLabelAndCustomField(
        chargesPanel,
        gbc,
        "Éclairage commun :",
        new MoneyTextField(null, null, "eclairageCommun").build(),
        0);
    addLabelAndCustomField(
        chargesPanel,
        gbc,
        "Éclairage commun :",
        new MoneyTextField(null, null, "eclairageCommun").build(),
        1);
    addLabelAndCustomField(
        chargesPanel,
        gbc,
        "Entretien commun :",
        new MoneyTextField(null, null, "entretienPartiesCommunes").build(),
        3);
    addLabelAndCustomField(
        chargesPanel,
        gbc,
        "Ordures ménagères :",
        new MoneyTextField(null, null, "orduresMenageres").build(),
        2);
    addLabelAndCustomField(
        chargesPanel,
        gbc,
        "Eau partie fixe : ",
        new MoneyTextField(null, null, "eauPartieFixe").build(),
        4);
    addLabelAndTextField(
        chargesPanel, gbc, "indexEau", "Entrez le nouvel index de l'eau (m3) :", 5);
    addLabelAndTextField(chargesPanel, gbc, "prixEauMetreCube", "Index eau", 6);
    addLabelAndCustomField(
        chargesPanel,
        gbc,
        "Provision sur charges : ",
        new MoneyTextField(null, null, "provisionSurCharge").build(),
        7);

    // Charges panel
    JPanel assurancePanel = new JPanel(new GridBagLayout());
    assurancePanel.setBackground(null);
    TitledBorder assuranceBorder = BorderFactory.createTitledBorder("Assurance");
    assuranceBorder.setTitleFont(Constants.BASE_FONT);
    assuranceBorder.setTitleColor(Constants.BODY_COLOR);
    assurancePanel.setBorder(
        BorderFactory.createCompoundBorder(
            assuranceBorder, BorderFactory.createEmptyBorder(5, 5, 5, 5)));
    GridBagConstraints assuranceGbc = new GridBagConstraints();
    assuranceGbc.insets = new Insets(5, 5, 5, 5);
    assuranceGbc.fill = GridBagConstraints.HORIZONTAL;
    assuranceGbc.weightx = 1.0;
            // "typeAssurance"
            // "nomAssureur"
            // "numeroContractAssurance"
            // "assurance"
    // Adding charges fields to the charges panel
    addLabelAndCustomField(
        assurancePanel,
        assuranceGbc,
        "Type assurance :",
        new MoneyTextField(null, null, "typeAssurance").build(),
        0);
    addLabelAndCustomField(
        assurancePanel,
        assuranceGbc,
        "Type assurance :",
        new MoneyTextField(null, null, "nomAssureur").build(),
        0);
    addLabelAndCustomField(
      assurancePanel,
      assuranceGbc,
      "Type assurance :",
      new MoneyTextField(null, null, "numeroContractAssurance").build(),
      0);
    addLabelAndCustomField(
        assurancePanel,
        assuranceGbc,
        "Type assurance :",
        new MoneyTextField(null, null, "typeAssurance").build(),
        0);

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

    // Adding file inputs to the file inputs panel
    addLabelAndFilePicker(fileInputsPanel, gbc, "constatAmiante", "Constat amiante", 0);
    addLabelAndFilePicker(fileInputsPanel, gbc, "constatPlomb", "Constat plomb", 1);
    addLabelAndFilePicker(fileInputsPanel, gbc, "constatElectricite", "Constat électricité", 2);

    // Add panels to main panel
    gbc.gridx = 0;
    gbc.gridy = 2;
    gbc.gridwidth = 1;
    gbc.gridheight = 3;
    gbc.weightx = 0.5;
    gbc.weighty = 1;
    gbc.fill = GridBagConstraints.BOTH;
    mainPanel.add(formPanel, gbc);
    // Rent panel
    gbc.gridx = 1;
    gbc.gridy = 2; // Set the row position for the rentPanel
    gbc.weightx = 0.5;
    gbc.weighty = 0.5;
    gbc.gridheight = 1;
    mainPanel.add(rentPanel, gbc);

    gbc.gridy = 3;
    gbc.weighty = 0.5;
    mainPanel.add(chargesPanel, gbc);

    gbc.gridy = 4;
    gbc.weighty = 0.5;
    mainPanel.add(assurancePanel, gbc);
    // File inputs panel
    gbc.gridx = 0;
    gbc.gridy = 5;
    gbc.gridwidth = 2;
    gbc.weightx = 0.1;
    gbc.gridheight = 2;
    gbc.fill = GridBagConstraints.BOTH;
    mainPanel.add(fileInputsPanel, gbc);

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
    JButton cancelButton = new Button("Annuler").build();
    cancelButton.setName("cancel");
    cancelButton.addActionListener(controleur);
    buttonPanel.add(cancelButton);
    // Submit button
    JButton submitButton = new Button("Ajouter").build();
    submitButton.addActionListener(controleur);
    buttonPanel.add(submitButton);

    add(mainPanel);
    setLocationRelativeTo(null);
    setVisible(true);
  }

  private void addLabelAndTextField(
      JPanel panel, GridBagConstraints gbc, String name, String labelText, int gridy) {
    gbc.gridx = 0;
    gbc.gridy = gridy;
    gbc.gridwidth = 1;
    panel.add(new JLabel(labelText), gbc);

    JTextField textField = new JTextField();
    textField.setName(name);
    gbc.gridx = 1;
    gbc.gridwidth = 2;
    panel.add(textField, gbc);
  }

  private void addLabelAndComboBox(
      JPanel panel,
      GridBagConstraints gbc,
      String name,
      String labelText,
      String[] items,
      int gridy) {
    gbc.gridx = 0;
    gbc.gridy = gridy;
    gbc.gridwidth = 1;
    panel.add(new JLabel(labelText), gbc);

    JComboBox<String> comboBox = new JComboBox<>(items);
    comboBox.setName(name);
    gbc.gridx = 1;
    gbc.gridwidth = 2;
    panel.add(comboBox, gbc);
  }

  private void addLabelAndRadioButtons(
      JPanel panel,
      GridBagConstraints gbc,
      String name,
      String labelText,
      String[] options,
      int gridy) {
    gbc.gridx = 0;
    gbc.gridy = gridy;
    gbc.gridwidth = 2;
    panel.add(new JLabel(labelText), gbc);

    ButtonGroup buttonGroup = new ButtonGroup();
    for (int i = 0; i < options.length; i++) {
      JRadioButton radioButton = new JRadioButton(options[i]);
      radioButton.setName(name + "-" + options[i]);
      buttonGroup.add(radioButton);
      gbc.gridx = 1 + i;
      gbc.gridwidth = 1;
      panel.add(radioButton, gbc);
    }
  }

  private void addLabelAndCustomField(
      JPanel panel, GridBagConstraints gbc, String labelText, JPanel customField, int gridy) {
    gbc.gridx = 0;
    gbc.gridy = gridy;
    gbc.gridwidth = 1;
    panel.add(new JLabel(labelText), gbc);

    gbc.gridx = 1;
    gbc.gridwidth = 2;
    panel.add(customField, gbc);
  }

  private void addLabelAndFilePicker(
      JPanel panel, GridBagConstraints gbc, String name, String labelText, int gridy) {
    gbc.gridx = 0;
    gbc.gridy = gridy;
    gbc.gridwidth = 1;
    panel.add(new JLabel(labelText), gbc);

    JPanel filePickerPanel = new JPanel(new GridBagLayout());
    filePickerPanel.setBackground(null);

    JLabel filePickerLabel = new JLabel("");
    filePickerPanel.add(filePickerLabel, gbc);

    JButton filePickerButton = new Button("Choisir un fichier").build();
    filePickerButton.addActionListener(
        e -> {
          String filePath = FilePicker.pickFile();
          if (filePath != null) {
            filePickerLabel.setText(filePath);
            this.files.put(name, filePath);
          }
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
