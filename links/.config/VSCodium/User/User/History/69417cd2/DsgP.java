package vues;

import java.awt.*;
import javax.swing.*;
import java.util.Collections;
import modele.Batiment;
import modele.BienLouable;
import modele.Personne;
import modele.Proprietaire;
import composants.Button;
import controleurs.GenererContractDeLocationControleur;

public class GenererContractDeLocation extends JFrame {
	private static final long serialVersionUID = 1L;

	private ButtonGroup group;
	public JPanel radioPanel;
	public JButton genererButton;

	public static void main(String[] args) {
		AppTheme.setup();
		EventQueue.invokeLater(
				() -> {
					try {
						GenererContractDeLocation frame = new GenererContractDeLocation(Constants.proprietaire);
						frame.setVisible(true);
					} catch (Exception e) {
						e.printStackTrace();
					}
				});
	}

	public GenererContractDeLocation(Proprietaire proprietaire) {
		setTitle("Générer un contrat de location");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setSize(850, 600);
		setLocationRelativeTo(null);
		GenererContractDeLocationControleur controleur = new GenererContractDeLocationControleur(this);

		setLayout(new BorderLayout());

		JPanel panel = new JPanel(new GridBagLayout());
		GridBagConstraints gbc = new GridBagConstraints();
		gbc.insets = new Insets(10, 10, 10, 10);
		gbc.gridx = 0;
		gbc.gridy = 0;
		gbc.anchor = GridBagConstraints.NORTHWEST;
		gbc.fill = GridBagConstraints.HORIZONTAL;

		// Title Label
		JLabel label = new JLabel("Générer un contrat de location");
		label.setFont(Constants.WINDOW_TITLE_FONT);
		label.setForeground(Constants.HEADING_COLOR);
		JPanel titlePanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
		titlePanel.add(label);
		panel.add(titlePanel, gbc);

		gbc.gridy++;
		gbc.anchor = GridBagConstraints.NORTHWEST;

		// Radio buttons
		radioPanel = new JPanel(new GridLayout(0, 3, 10, 10)); // Grid layout with three columns and spacing
		group = new ButtonGroup();

		for (Batiment batiment : proprietaire.getBatiment()) {
			for (BienLouable bienLouable : batiment.getBiensLouables()) {
				if (bienLouable.isColocation()) {
					if(bienLouable.getColocation() == null || bienLouable.getColocation().getColocataires() == null) {
						continue;
					}
					for (Personne personne : bienLouable.getColocation().getColocataires().keySet()) {
						addPersonne(personne);
					}
				} else {
					if(bienLouable.getLocation() == null || bienLouable.getLocation().getLocataires() == null) {
						continue;
					}
					for (Personne personne : bienLouable.getLocation().getLocataires()) {
						addPersonne(personne);
					}
				}
			}
		}

		gbc.gridy++;
		panel.add(radioPanel, gbc);

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

	private void addPersonne(Personne p) {
		JRadioButton radioButton = new JRadioButton(p.toString());
		group.add(radioButton);
		radioButton.setName(Integer.toString(p.getIdLocataire()));
		radioPanel.add(radioButton);
	}
}
