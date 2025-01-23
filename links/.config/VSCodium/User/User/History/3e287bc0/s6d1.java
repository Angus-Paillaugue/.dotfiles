package vues;

import java.awt.*;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import modele.TypeDeBatiment;
import composants.Button;
import controleurs.AjouterBatimentControleur;

public class AjouterBatiment extends JFrame {
	private static final long serialVersionUID = 1L;

	public JPanel mainPanel;

	public static void main(String[] args) {
		AppTheme.setup();
		EventQueue.invokeLater(
				() -> {
					try {
						AjouterBatiment frame = new AjouterBatiment();
						frame.setVisible(true);
					} catch (Exception e) {
						e.printStackTrace();
					}
				});
	}

	public AjouterBatiment() {
		setTitle("Ajouter un bâtiment");
		setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		setSize(450, 350);
		setLocationRelativeTo(null);

		AjouterBatimentControleur controleur = new AjouterBatimentControleur(this);

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
		mainPanel.add(titleLabel, gbc);
		// Separator
		JSeparator separator = new JSeparator();
		gbc.gridy++;
		gbc.fill = GridBagConstraints.HORIZONTAL;
		mainPanel.add(separator, gbc);

		JPanel formPanel = new JPanel(new GridBagLayout());
		formPanel.setBackground(null);
		formPanel.setBackground(Color.WHITE);

		GridBagConstraints formGbc = new GridBagConstraints();
		formGbc.insets = new Insets(5, 5, 5, 5);
		formGbc.fill = GridBagConstraints.HORIZONTAL;
		formGbc.weightx = 1.0;

		// General informations fields
		addLabelAndTextField(formPanel, formGbc, "adresseNumero", "Numéro", 3);
		addLabelAndTextField(formPanel, formGbc, "adresseRue", "Rue", 4);
		addLabelAndTextField(formPanel, formGbc, "adresseVille", "Ville", 5);
		addLabelAndTextField(formPanel, formGbc, "adresseCP", "Code postal", 6);
		addLabelAndComboBox(formPanel, formGbc, "typeBatiment", "Type de bâtiment", TypeDeBatiment.getValues(), 7);
		// Numéro fiscal field
		formGbc.gridx = 0;
		formGbc.gridy = 10;
		formPanel.add(new JLabel("Numéro fiscal"), formGbc);
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
		formGbc.gridx = 1;
		formGbc.gridwidth = 2;
		formPanel.add(formattedTextField, formGbc);

		// Add panels to main panel
		gbc.gridx = 0;
		gbc.gridy = 2;
		gbc.gridheight = 2;
		gbc.weightx = 0.5;
		gbc.weighty = 1;
		gbc.fill = GridBagConstraints.BOTH;
		mainPanel.add(formPanel, gbc);

		// Footer buttons
		JPanel buttonPanel = new JPanel(new GridBagLayout());
		buttonPanel.setBackground(null);
		gbc.gridx = 0;
		gbc.gridy = 6;
		gbc.weightx = 0.1;
		gbc.weighty = 0.1;
		gbc.gridheight = 1;
		gbc.anchor = GridBagConstraints.SOUTH;
		gbc.fill = GridBagConstraints.HORIZONTAL;
		mainPanel.add(buttonPanel, gbc);
		// Cancel button
		JButton cancelButton = new Button("Annuler").build();
		cancelButton.addActionListener(controleur);
		cancelButton.setName("cancel");
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

		JTextField textField = new JTextField(20); // Set preferred width
		textField.setName(name);
		gbc.gridx = 1;
		gbc.gridwidth = 2;
		gbc.weightx = 1.0; // Ensure it takes up available horizontal space
		panel.add(textField, gbc);
	}

	private void addLabelAndComboBox(
			JPanel panel, GridBagConstraints gbc, String name, String labelText, String[] items, int gridy) {
		gbc.gridx = 0;
		gbc.gridy = gridy;
		gbc.gridwidth = 1;
		panel.add(new JLabel(labelText), gbc);

		JComboBox<String> comboBox = new JComboBox<>(items);
		comboBox.setName(name);
		gbc.gridx = 1;
		gbc.gridwidth = 2;
		gbc.weightx = 1.0; // Ensure it takes up available horizontal space
		panel.add(comboBox, gbc);
	}
}
