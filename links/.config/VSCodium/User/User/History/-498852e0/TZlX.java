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
        EventQueue.invokeLater(() -> {
            try {
                AddRentalVue frame = new AddRentalVue();
                frame.setVisible(true);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public AddRentalVue() {
        setTitle("Ajouter une location");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(900, 950);

        JPanel mainPanel = new JPanel(new GridBagLayout());
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
        formPanel
                .setBorder(BorderFactory.createCompoundBorder(formBorder, BorderFactory.createEmptyBorder(5, 5, 5, 5)));
        formPanel.setBackground(Color.WHITE);

        GridBagConstraints formGbc = new GridBagConstraints();
        formGbc.insets = new Insets(5, 5, 5, 5);
        formGbc.fill = GridBagConstraints.HORIZONTAL;
        formGbc.weightx = 1.0;

        // General informations fields
        addLabelAndTextField(formPanel, gbc, "Adresse", 0);
        addLabelAndComboBox(formPanel, gbc, "Type de bâtiment", new String[] { "Appartement", "Maison", "Studio" }, 1);
        addLabelAndTextField(formPanel, gbc, "Référence cadastrale", 2);
        addLabelAndTextField(formPanel, gbc, "Référence logement", 3);
        addLabelAndFormattedTextField(formPanel, gbc, "Numéro fiscal", 4);
        addLabelAndTextFieldWithUnit(formPanel, gbc, "Superficie", "m²", 5);
        gbc.gridx = 0;
        gbc.gridy = gridy;
        gbc.gridwidth = 1;
        formPanel.add(new JLabel(labelText), gbc);

        JTextField textField = new JTextField();
        gbc.gridx = 1;
        gbc.gridwidth = 1;
        formPanel.add(textField, gbc);

        JLabel unitLabel = new JLabel(unit);
        gbc.gridx = 2;
        formPanel.add(unitLabel, gbc);
        addLabelAndComboBox(formPanel, gbc, "Note énergétique", noteEnergetique.getNames(), 6);
        addLabelAndComboBox(formPanel, gbc, "Emissions gaz à effet de serre", noteEnergetique.getNames(), 7);
        addLabelAndRadioButtons(formPanel, gbc, "Bâti", new String[] { "Oui", "Non" }, 8);
        addLabelAndRadioButtons(formPanel, gbc, "Meublé", new String[] { "Oui", "Non" }, 9);
        addLabelAndComboBox(formPanel, gbc, "Type de logement", new String[] { "Location", "Co-location" }, 10);
        addLabelAndCustomField(formPanel, gbc, "Montant taxe foncière",
                new TextField(null, null, "euro-16x16-body.png").build(), 11);
        addLabelAndCustomField(formPanel, gbc, "Date permis de construire", new DateField(null).build(), 12);
        addLabelAndCustomField(formPanel, gbc, "Date construction bâtiment", new DateField(null).build(), 13);
        addLabelAndRadioButtons(formPanel, gbc, "Type de porte", new String[] { "Gauche", "Droite" }, 14);
        addLabelAndTextField(formPanel, gbc, "Access technologique", 15);

        // Money related fields panel
        JPanel rentPanel = new JPanel(new GridBagLayout());
        rentPanel.setBackground(null);
        TitledBorder locataireBorder = BorderFactory.createTitledBorder("Loyer");
        locataireBorder.setTitleFont(Constants.BASE_FONT);
        locataireBorder.setTitleColor(Constants.BODY_COLOR);
        rentPanel.setBorder(
                BorderFactory.createCompoundBorder(locataireBorder, BorderFactory.createEmptyBorder(5, 5, 5, 5)));
        GridBagConstraints rentGbc = new GridBagConstraints();
        rentGbc.insets = new Insets(5, 5, 5, 5);
        rentGbc.fill = GridBagConstraints.HORIZONTAL;
        rentGbc.weightx = 1.0;

        addRentFields(rentPanel, rentGbc);

        // File inputs panel
        JPanel fileInputsPanel = new JPanel(new GridBagLayout());
        fileInputsPanel.setBackground(null);
        TitledBorder fileInputsBorder = BorderFactory.createTitledBorder("Documents");
        fileInputsBorder.setTitleFont(Constants.BASE_FONT);
        fileInputsBorder.setTitleColor(Constants.BODY_COLOR);
        fileInputsPanel.setBorder(
                BorderFactory.createCompoundBorder(fileInputsBorder, BorderFactory.createEmptyBorder(5, 5, 5, 5)));
        GridBagConstraints fileInputsGbc = new GridBagConstraints();
        fileInputsGbc.insets = new Insets(5, 5, 5, 5);
        fileInputsGbc.fill = GridBagConstraints.HORIZONTAL;
        fileInputsGbc.weightx = 1.0;

        // Adding file inputs to the file inputs panel
        addLabelAndFilePicker(fileInputsPanel, gbc, "Constat amiante", 0);
        addLabelAndFilePicker(fileInputsPanel, gbc, "Constat plomb", 1);
        addLabelAndFilePicker(fileInputsPanel, gbc, "Constat électricité", 2);

        // Add panels to main panel
        gbc.gridx = 0;
        gbc.gridy = 2;
        gbc.gridwidth = 1;
        gbc.weightx = 0.5;
        gbc.fill = GridBagConstraints.BOTH;
        mainPanel.add(formPanel, gbc);
        // Rent panel
        gbc.gridx = 1;
        gbc.weightx = 0.5;
        mainPanel.add(rentPanel, gbc);
        // File inputs panel
        gbc.gridx = 0;
        gbc.gridy = 3;
        gbc.gridwidth = 2;
        gbc.weightx = 0.1;
        gbc.fill = GridBagConstraints.BOTH;
        mainPanel.add(fileInputsPanel, gbc);

        // Footer buttons
        JPanel buttonPanel = new JPanel(new GridBagLayout());
        buttonPanel.setBackground(null);
        gbc.gridx = 0;
        gbc.gridy = 4;
        gbc.gridwidth = 2;
        gbc.weighty = 0.1;
        gbc.anchor = GridBagConstraints.SOUTH;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        mainPanel.add(buttonPanel, gbc);
        // Cancel button
        JButton cancelButton = new Button("Annuler").build();
        cancelButton.addActionListener((e) -> {
            new MyApartmentsVue().setVisible(true);
            this.dispose();
        });
        buttonPanel.add(cancelButton);
        // Submit button
        JButton submitButton = new Button("Ajouter").build();
        buttonPanel.add(submitButton);

        add(mainPanel);
        setLocationRelativeTo(null);
        setVisible(true);
    }

    private void addRentFields(JPanel panel, GridBagConstraints gbc) {
        addLabelAndCustomField(panel, gbc, "Montant hors charges",
                new TextField(null, null, "euro-16x16-body.png").build(), 0);
        addLabelAndCustomField(panel, gbc, "Charges", new TextField(null, null, "euro-16x16-body.png").build(), 1);
        addLabelAndCustomField(panel, gbc, "Date payment", new DateField("03/05/2024").build(), 2);
        addLabelAndCustomField(panel, gbc, "Date prochaine révision", new DateField("3/05/2026").build(), 3);
        addLabelAndCustomField(panel, gbc, "Montant dépôt de garantie",
                new TextField(null, null, "euro-16x16-body.png").build(), 4);
        addLabelAndRadioButtons(panel, gbc, "Mode de payment", new String[] { "Virement", "Chèque" }, 5);
        addLabelAndCustomField(panel, gbc, "Total TTC", new TextField(null, null, "euro-16x16-body.png").build(), 6);
    }

    private void addLabelAndTextField(JPanel panel, GridBagConstraints gbc, String labelText, int gridy) {
        gbc.gridx = 0;
        gbc.gridy = gridy;
        gbc.gridwidth = 1;
        panel.add(new JLabel(labelText), gbc);

        JTextField textField = new JTextField();
        gbc.gridx = 1;
        gbc.gridwidth = 2;
        panel.add(textField, gbc);
    }

    private void addLabelAndComboBox(JPanel panel, GridBagConstraints gbc, String labelText, String[] items,
            int gridy) {
        gbc.gridx = 0;
        gbc.gridy = gridy;
        gbc.gridwidth = 1;
        panel.add(new JLabel(labelText), gbc);

        JComboBox<String> comboBox = new JComboBox<>(items);
        gbc.gridx = 1;
        gbc.gridwidth = 2;
        panel.add(comboBox, gbc);
    }

    private void addLabelAndFormattedTextField(JPanel panel, GridBagConstraints gbc, String labelText, int gridy) {
        gbc.gridx = 0;
        gbc.gridy = gridy;
        gbc.gridwidth = 1;
        panel.add(new JLabel(labelText), gbc);

        JFormattedTextField formattedTextField = new JFormattedTextField();
        formattedTextField.addKeyListener(new KeyAdapter() {
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
        formattedTextField.setText("0");
        gbc.gridx = 1;
        gbc.gridwidth = 2;
        panel.add(formattedTextField, gbc);
    }

    private void addLabelAndTextFieldWithUnit(JPanel panel, GridBagConstraints gbc, String labelText, String unit,
            int gridy) {
        gbc.gridx = 0;
        gbc.gridy = gridy;
        gbc.gridwidth = 1;
        panel.add(new JLabel(labelText), gbc);

        JTextField textField = new JTextField();
        gbc.gridx = 1;
        gbc.gridwidth = 1;
        panel.add(textField, gbc);

        JLabel unitLabel = new JLabel(unit);
        gbc.gridx = 2;
        panel.add(unitLabel, gbc);
    }

    private void addLabelAndRadioButtons(JPanel panel, GridBagConstraints gbc, String labelText, String[] options,
            int gridy) {
        gbc.gridx = 0;
        gbc.gridy = gridy;
        gbc.gridwidth = 2;
        panel.add(new JLabel(labelText), gbc);

        ButtonGroup buttonGroup = new ButtonGroup();
        for (int i = 0; i < options.length; i++) {
            JRadioButton radioButton = new JRadioButton(options[i]);
            buttonGroup.add(radioButton);
            gbc.gridx = 1 + i;
            gbc.gridwidth = 1;
            panel.add(radioButton, gbc);
        }
    }

    private void addLabelAndCustomField(JPanel panel, GridBagConstraints gbc, String labelText, JPanel customField,
            int gridy) {
        gbc.gridx = 0;
        gbc.gridy = gridy;
        gbc.gridwidth = 1;
        panel.add(new JLabel(labelText), gbc);

        gbc.gridx = 1;
        gbc.gridwidth = 2;
        panel.add(customField, gbc);
    }

    private void addLabelAndFilePicker(JPanel panel, GridBagConstraints gbc, String labelText, int gridy) {
        gbc.gridx = 0;
        gbc.gridy = gridy;
        gbc.gridwidth = 1;
        panel.add(new JLabel(labelText), gbc);

        JPanel filePickerPanel = new JPanel(new GridBagLayout());
        filePickerPanel.setBackground(null);

        JLabel filePickerLabel = new JLabel("");
        filePickerPanel.add(filePickerLabel, gbc);

        JButton filePickerButton = new Button("Choisir un fichier").build();
        filePickerButton.addActionListener((e) -> {
            String filePath = FilePicker.pickFile();
            if (filePath != null)
                filePickerLabel.setText(filePath);
        });

        gbc.gridx = 1;
        gbc.gridwidth = 2;
        filePickerPanel.add(filePickerButton, gbc);

        panel.add(filePickerPanel, gbc);
    }
}
