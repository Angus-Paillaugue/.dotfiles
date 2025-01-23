package ihm;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.TitledBorder;

import modele.noteEnergetique;

import java.awt.*;
import java.awt.event.KeyEvent;
import java.awt.event.KeyAdapter;

public class AddRentalVue extends JFrame {
    private static final long serialVersionUID = 1L;

    public static void main(String[] args) {
        AppTheme.setup();
        EventQueue.invokeLater(new Runnable() {
            public void run() {
                try {
                    AddRentalVue frame = new AddRentalVue();
                    frame.setVisible(true);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public AddRentalVue() {
        setTitle("Ajouter une location");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(900, 900);

        // Main Container
        JPanel mainPanel = new JPanel(new GridBagLayout());
        mainPanel.setBorder(new EmptyBorder(20, 20, 20, 20));
        mainPanel.setBackground(Color.WHITE);

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(5, 5, 5, 5);
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.anchor = GridBagConstraints.NORTHWEST;

        // Title
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

        // Left Panel for Form
        JPanel formPanel = new JPanel(new GridBagLayout());
        formPanel.setBackground(null);
        TitledBorder formBorder = BorderFactory.createTitledBorder("Informations générales");
        formBorder.setTitleFont(Constants.BASE_FONT);
        formBorder.setTitleColor(Constants.BODY_COLOR);
        formPanel.setBorder(
        BorderFactory.createCompoundBorder(formBorder, BorderFactory.createEmptyBorder(5, 5, 5, 5)));
        formPanel.setBackground(Color.WHITE);
        GridBagConstraints formGbc = new GridBagConstraints();
        formGbc.insets = new Insets(5, 5, 5, 5);
        formGbc.fill = GridBagConstraints.HORIZONTAL;
        formGbc.weightx = 1.0; // Make components full width

        // Address
        formGbc.gridx = 0;
        formGbc.gridy = 0;
        formGbc.gridwidth = 1;
        formPanel.add(new JLabel("Adresse"), formGbc);
        JTextField addressField = new JTextField();
        formGbc.gridx = 1;
        formGbc.gridwidth = 2;
        formPanel.add(addressField, formGbc);

        // Type de bâtiment
        formGbc.gridx = 0;
        formGbc.gridy++;
        formGbc.gridwidth = 1;
        formPanel.add(new JLabel("Type de bâtiment"), formGbc);
        JComboBox<String> buildingTypeCombo = new JComboBox<>(new String[]{"Appartement", "Maison", "Studio"});
        formGbc.gridx = 1;
        formGbc.gridwidth = 2;
        formPanel.add(buildingTypeCombo, formGbc);

        // Référence cadastrale
        formGbc.gridx = 0;
        formGbc.gridy++;
        formGbc.gridwidth = 1;
        formPanel.add(new JLabel("Référence cadastrale"), formGbc);
        JTextField referenceField = new JTextField();
        formGbc.gridx = 1;
        formGbc.gridwidth = 2;
        formPanel.add(referenceField, formGbc);

        // Référence logement
        formGbc.gridx = 0;
        formGbc.gridy++;
        formGbc.gridwidth = 1;
        formPanel.add(new JLabel("Référence logement"), formGbc);
        JTextField referenceLogementField = new JTextField();
        formGbc.gridx = 1;
        formGbc.gridwidth = 2;
        formPanel.add(referenceLogementField, formGbc);

        // Numéro fiscal
        formGbc.gridx = 0;
        formGbc.gridy++;
        formGbc.gridwidth = 1;
        formPanel.add(new JLabel("Numéro fiscal"), formGbc);
        JFormattedTextField fiscalNumberField = new JFormattedTextField();
        fiscalNumberField.addKeyListener(new KeyAdapter() {
            @Override
            public void keyTyped(KeyEvent e) {
                char c = e.getKeyChar();
                String inputValue = fiscalNumberField.getText();
                if (!Character.isDigit(c) && c != KeyEvent.VK_BACK_SPACE && c != KeyEvent.VK_DELETE ) {
                    e.consume();
                }

                if(inputValue.length() >= 12) {
                    e.consume();
                }
            }
        });
        fiscalNumberField.setText("0");
        formGbc.gridx = 1;
        formGbc.gridwidth = 2;
        formPanel.add(fiscalNumberField, formGbc);

        // Surface
        formGbc.gridx = 0;
        formGbc.gridy++;
        formGbc.gridwidth = 1;
        formPanel.add(new JLabel("Superficie"), formGbc);
        JTextField surfaceField = new JTextField();
        formGbc.gridx = 1;
        formGbc.gridwidth = 1;
        formPanel.add(surfaceField, formGbc);
        JLabel squareMeterLabel = new JLabel("m²");
        formGbc.gridx = 2;
        formPanel.add(squareMeterLabel, formGbc);

        // Note énergétique
        formGbc.gridx = 0;
        formGbc.gridy++;
        formGbc.gridwidth = 1;
        formPanel.add(new JLabel("Note énergétique"), formGbc);
        JComboBox<String> noteEnergetiqueCombo = new JComboBox<>(noteEnergetique.getNames());
        formGbc.gridx = 1;
        formGbc.gridwidth = 2;
        formPanel.add(noteEnergetiqueCombo, formGbc);

        // Note GES
        formGbc.gridx = 0;
        formGbc.gridy++;
        formGbc.gridwidth = 1;
        formPanel.add(new JLabel("Emissions gaz à effet de serre"), formGbc);
        JComboBox<String> gesCombo = new JComboBox<>(noteEnergetique.getNames());
        formGbc.gridx = 1;
        formGbc.gridwidth = 2;
        formPanel.add(gesCombo, formGbc);

        // Bati Radio
        formGbc.gridx = 0;
        formGbc.gridy++;
        formGbc.gridwidth = 2;
        formPanel.add(new JLabel("Bâti"), formGbc);
        ButtonGroup bgBati = new ButtonGroup();
        JRadioButton batiRadioTrue = new JRadioButton("Oui");
        JRadioButton batiRadioFalse = new JRadioButton("Non");
        bgBati.add(batiRadioTrue);
        bgBati.add(batiRadioFalse);
        formGbc.gridx = 1;
        formGbc.gridwidth = 1;
        formPanel.add(batiRadioTrue, formGbc);
        formGbc.gridx = 2;
        formGbc.gridwidth = 1;
        formPanel.add(batiRadioFalse, formGbc);

        // Meublé Radio
        formGbc.gridx = 0;
        formGbc.gridy++;
        formGbc.gridwidth = 2;
        formPanel.add(new JLabel("Meublé"), formGbc);
        ButtonGroup bgMeuble = new ButtonGroup();
        JRadioButton meubleRadioTrue = new JRadioButton("Oui");
        JRadioButton meubleRadioFalse = new JRadioButton("Non");
        bgMeuble.add(meubleRadioTrue);
        bgMeuble.add(meubleRadioFalse);
        formGbc.gridx = 1;
        formGbc.gridwidth = 1;
        formPanel.add(meubleRadioTrue, formGbc);
        formGbc.gridx = 2;
        formGbc.gridwidth = 1;
        formPanel.add(meubleRadioFalse, formGbc);

        // Type de logement
        formGbc.gridx = 0;
        formGbc.gridy++;
        formGbc.gridwidth = 1;
        formPanel.add(new JLabel("Type de logement"), formGbc);
        JComboBox<String> rentingTypeCombo = new JComboBox<>(new String[]{"Location", "Co-location"});
        formGbc.gridx = 1;
        formGbc.gridwidth = 2;
        formPanel.add(rentingTypeCombo, formGbc);

        // Montant taxe foncière
        formGbc.gridx = 0;
        formGbc.gridy++;
        formPanel.add(new JLabel("Montant taxe foncière"), formGbc);
        JPanel taxeFonciereField = new TextField(null, null, "euro-16x16-body.png").build();
        formGbc.gridx = 1;
        formPanel.add(taxeFonciereField, formGbc);

        // Date prochaine révision
        formGbc.gridx = 0;
        formGbc.gridy++;
        formPanel.add(new JLabel("Date permis de construire"), formGbc);
        JPanel permitDateField = new DateField(null).build();
        formGbc.gridx = 1;
        formPanel.add(permitDateField, formGbc);

        // Date construction
        formGbc.gridx = 0;
        formGbc.gridy++;
        formPanel.add(new JLabel("Date construction bâtiment"), formGbc);
        JPanel builtDateField = new DateField(null).build();
        formGbc.gridx = 1;
        formPanel.add(builtDateField, formGbc);

        // Type porte
        formGbc.gridx = 0;
        formGbc.gridy++;
        formGbc.gridwidth = 2;
        formPanel.add(new JLabel("Type de porte"), formGbc);
        ButtonGroup bgTypePorte = new ButtonGroup();
        JRadioButton typePorteGauche = new JRadioButton("Gauche");
        JRadioButton typePorteDroite = new JRadioButton("Droite");
        bgTypePorte.add(typePorteGauche);
        bgTypePorte.add(typePorteDroite);
        formGbc.gridx = 1;
        formGbc.gridwidth = 1;
        formPanel.add(typePorteGauche, formGbc);
        formGbc.gridx = 2;
        formGbc.gridwidth = 1;
        formPanel.add(typePorteDroite, formGbc);

        //Access technologique
        formGbc.gridx = 0;
        formGbc.gridy++;
        formPanel.add(new JLabel("Access technologique"), formGbc);
        JTextField accessTechnologiqueField = new JTextField();
        formGbc.gridx = 1;
        formGbc.gridwidth = 2;
        formPanel.add(accessTechnologiqueField, formGbc);





        // Right Panel for Rent Details
        JPanel rentPanel = new JPanel(new GridBagLayout());
        rentPanel.setBackground(null);
        TitledBorder locataireBorder = BorderFactory.createTitledBorder("Loyer");
        locataireBorder.setTitleFont(Constants.BASE_FONT);
        locataireBorder.setTitleColor(Constants.BODY_COLOR);
        rentPanel.setBorder(BorderFactory.createCompoundBorder(locataireBorder, BorderFactory.createEmptyBorder(5, 5, 5, 5)));

        GridBagConstraints rentGbc = new GridBagConstraints();
        rentGbc.insets = new Insets(5, 5, 5, 5);
        rentGbc.fill = GridBagConstraints.HORIZONTAL;
        rentGbc.weightx = 1.0;

        rentGbc.gridx = 0;
        rentGbc.gridy = 0;
        rentGbc.gridwidth = 1;
        rentPanel.add(new JLabel("Montant hors charges"), rentGbc);
        JPanel baseRentField = new TextField(null, null, "euro-16x16-body.png").build();
        rentGbc.gridx = 1;
        rentGbc.gridwidth = 2;
        rentPanel.add(baseRentField, rentGbc);

        // Charges
        rentGbc.gridx = 0;
        rentGbc.gridy++;
        rentGbc.gridwidth = 1;
        rentPanel.add(new JLabel("Charges"), rentGbc);
        JPanel chargeField = new TextField(null, null, "euro-16x16-body.png").build();
        rentGbc.gridx = 1;
        rentGbc.gridwidth = 2;
        rentPanel.add(chargeField, rentGbc);

        // Date Payment
        rentGbc.gridx = 0;
        rentGbc.gridy++;
        rentGbc.gridwidth = 1;
        rentPanel.add(new JLabel("Date payment"), rentGbc);
        JPanel paymentDateField = new DateField("03/05/2024").build();
        rentGbc.gridx = 1;
        rentGbc.gridwidth = 2;
        rentPanel.add(paymentDateField, rentGbc);

        // Date prochaine révision
        rentGbc.gridx = 0;
        rentGbc.gridy++;
        rentGbc.gridwidth = 1;
        rentPanel.add(new JLabel("Date prochaine révision"), rentGbc);
        JPanel nextRevisionDateField = new DateField("3/05/2026").build();
        rentGbc.gridx = 1;
        rentGbc.gridwidth = 2;
        rentPanel.add(nextRevisionDateField, rentGbc);

        // Montant depot de garantie
        rentGbc.gridx = 0;
        rentGbc.gridy++;
        rentGbc.gridwidth = 1;
        rentPanel.add(new JLabel("Montant dépôt de garantie"), rentGbc);
        JPanel montantDepotGarantieField = new TextField(null, null, "euro-16x16-body.png").build();
        rentGbc.gridx = 1;
        rentGbc.gridwidth = 2;
        rentPanel.add(montantDepotGarantieField, rentGbc);

        // Mode payment
        rentGbc.gridx = 0;
        rentGbc.gridy++;
        rentGbc.gridwidth = 2;
        rentPanel.add(new JLabel("Mode de payment"), rentGbc);
        ButtonGroup bgModePayment = new ButtonGroup();
        JRadioButton modePaymentVirement = new JRadioButton("Virement");
        modePaymentVirement.setSelected(true);
        JRadioButton modePaymentCheque = new JRadioButton("Chèque");
        bgModePayment.add(modePaymentVirement);
        bgModePayment.add(modePaymentCheque);
        rentGbc.gridx = 1;
        rentGbc.gridwidth = 1;
        rentPanel.add(modePaymentVirement, rentGbc);
        rentGbc.gridx = 2;
        rentGbc.gridwidth = 1;
        rentPanel.add(modePaymentCheque, rentGbc);

        // Total TTC
        rentGbc.gridx = 0;
        rentGbc.gridy++;
        rentGbc.gridwidth = 1;
        rentPanel.add(new JLabel("Total TTC"), rentGbc);
        JPanel totalField = new TextField(null, null, "euro-16x16-body.png").build();
        rentGbc.gridx = 1;
        rentGbc.gridwidth = 2;
        rentPanel.add(totalField, rentGbc);

        // Add Form and Rent Panels to Main Panel
        gbc.gridx = 0;
        gbc.gridy = 2;
        gbc.gridwidth = 1;
        gbc.weightx = 0.5; // Set weightx to 0.5 for equal width
        gbc.fill = GridBagConstraints.BOTH;
        mainPanel.add(formPanel, gbc);

        gbc.gridx = 1;
        gbc.weightx = 0.5; // Set weightx to 0.5 for equal width
        mainPanel.add(rentPanel, gbc);


        // File Inputs Panel
        JPanel fileInputsPanel = new JPanel(new GridBagLayout());
        fileInputsPanel.setBackground(null);
        TitledBorder fileInputsBorder = BorderFactory.createTitledBorder("Documents");
        fileInputsBorder.setTitleFont(Constants.BASE_FONT);
        fileInputsBorder.setTitleColor(Constants.BODY_COLOR);
        fileInputsPanel.setBorder(BorderFactory.createCompoundBorder(fileInputsBorder, BorderFactory.createEmptyBorder(5, 5, 5, 5)));

        GridBagConstraints fileInputsGbc = new GridBagConstraints();
        fileInputsGbc.insets = new Insets(5, 5, 5, 5);
        fileInputsGbc.fill = GridBagConstraints.HORIZONTAL;
        fileInputsGbc.weightx = 1.0;

        // Constat amiante
        fileInputsGbc.gridx = 0;
        fileInputsGbc.gridy++;
        fileInputsGbc.gridwidth = 1;
        JPanel constatAmiantePanel = new JPanel(new GridBagLayout());
        constatAmiantePanel.setBackground(null);
        fileInputsPanel.add(new JLabel("Constat amiante"), fileInputsGbc);
        JLabel constatAmianteFilePickerLabel = new JLabel("");
        constatAmiantePanel.add(constatAmianteFilePickerLabel, fileInputsGbc);
        JButton constatAmianteFilePicker = new Button("Choisir un fichier").build();
        constatAmianteFilePicker.addActionListener((e) -> {
            String filePath = FilePicker.pickFile();
            if (filePath != null)
                constatAmianteFilePickerLabel.setText(filePath);
        });
        fileInputsGbc.gridx = 1;
        fileInputsGbc.gridwidth = 2;
        constatAmiantePanel.add(constatAmianteFilePicker, fileInputsGbc);
        fileInputsPanel.add(constatAmiantePanel, fileInputsGbc);

        // Constat plomb
        fileInputsGbc.gridx = 0;
        fileInputsGbc.gridy ++;
        fileInputsGbc.gridwidth = 1;
        JPanel constatPlombPanel = new JPanel(new GridBagLayout());
        constatPlombPanel.setBackground(null);
        fileInputsPanel.add(new JLabel("Constat plomb"), fileInputsGbc);
        JLabel constatPlombFilePickerLabel = new JLabel("");
        constatPlombPanel.add(constatPlombFilePickerLabel, fileInputsGbc);
        JButton constatPlombFilePickerButton = new Button("Choisir un fichier").build();
        constatPlombFilePickerButton.addActionListener((e) -> {
            String filePath = FilePicker.pickFile();
            if (filePath != null)
                constatPlombFilePickerLabel.setText(filePath);
        });
        fileInputsGbc.gridx = 1;
        fileInputsGbc.gridwidth = 2;
        constatPlombPanel.add(constatPlombFilePickerButton, fileInputsGbc);
        fileInputsPanel.add(constatPlombPanel, fileInputsGbc);

        // Constat électricité
        fileInputsGbc.gridx = 0;
        fileInputsGbc.gridy++;
        fileInputsGbc.gridwidth = 1;
        JPanel constatElecPanel = new JPanel(new GridBagLayout());
        constatElecPanel.setBackground(null);
        fileInputsPanel.add(new JLabel("Constat électricité"), fileInputsGbc);
        JLabel constatElecFilePickerLabel = new JLabel("");
        constatElecPanel.add(constatElecFilePickerLabel, fileInputsGbc);
        JButton constatElecFilePickerButton = new Button("Choisir un fichier").build();
        constatElecFilePickerButton.addActionListener((e) -> {
            String filePath = FilePicker.pickFile();
            if (filePath != null)
                constatElecFilePickerLabel.setText(filePath);
        });
        fileInputsGbc.gridx = 1;
        fileInputsGbc.gridwidth = 2;
        constatElecPanel.add(constatElecFilePickerButton, fileInputsGbc);
        fileInputsPanel.add(constatElecPanel, fileInputsGbc);

        gbc.gridx = 0;
        gbc.gridy = 3;
        gbc.gridwidth = 2;
        gbc.weightx = 0.1;
        gbc.fill = GridBagConstraints.BOTH;
        mainPanel.add(fileInputsPanel, gbc);


        // Bottom buttons panel
        JPanel buttonPanel = new JPanel(new GridBagLayout());
        buttonPanel.setBackground(null);
        gbc.gridx = 0;
        gbc.gridy = 4;
        gbc.gridwidth = 2;
        gbc.weighty = 0.1;
        gbc.anchor = GridBagConstraints.SOUTH;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        mainPanel.add(buttonPanel, gbc);
        JButton cancelButton = new Button("Annuler").build();
        cancelButton.addActionListener((e) -> {
            new MyApartmentsVue().setVisible(true);
            this.dispose();
        });
        buttonPanel.add(cancelButton);
        JButton submitButton = new Button("Ajouter").build();
        buttonPanel.add(submitButton);

        add(mainPanel);
        setLocationRelativeTo(null);
        setVisible(true);
    }
}
