package vues;

import java.awt.BorderLayout;
import java.awt.EventQueue;
import java.awt.FlowLayout;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.GridLayout;
import java.awt.Insets;
import java.util.Collections;

import javax.swing.AbstractButton;
import javax.swing.ButtonGroup;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.JScrollPane;
import javax.swing.JTable;

import controleurs.GenererSoldeDeToutCompteControleur;
import jdbc.SharedState;
import modele.Batiment;
import modele.BienLouable;
import modele.Proprietaire;
import vues.composants.Button;

public class GenererSoldeDeToutCompte extends JFrame  {
	private ButtonGroup group;
	public JPanel panel;
	public JPanel radioPanel;
	public JScrollPane listeBailScrollPane;
	public JButton genererButton;

	public static void main(String[] args) {
		AppTheme.setup();
		EventQueue.invokeLater(
				() -> {
					try {
						GenererSoldeDeToutCompte frame = new GenererSoldeDeToutCompte(SharedState.getInstance().getProprietaire());
						frame.setVisible(true);
					} catch (Exception e) {
						e.printStackTrace();
					}
				});
	}

	public GenererSoldeDeToutCompte(Proprietaire proprietaire) {
		setTitle("Générer une quittance de loyer");
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setSize(850, 800);
		setLocationRelativeTo(null);
		GenererSoldeDeToutCompteControleur controleur = new GenererSoldeDeToutCompteControleur(this);

		setLayout(new BorderLayout());

		this.panel = new JPanel(new GridBagLayout());
		GridBagConstraints gbc = new GridBagConstraints();
		gbc.insets = new Insets(10, 10, 10, 10);
		gbc.gridx = 0;
		gbc.gridy = 0;
		gbc.anchor = GridBagConstraints.NORTHWEST;
		gbc.fill = GridBagConstraints.HORIZONTAL;

		// Title Label
		JLabel label = new JLabel("Générer solde de tout compte");
		label.setFont(Constants.WINDOW_TITLE_FONT);
		label.setForeground(Constants.HEADING_COLOR);
		JPanel titlePanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
		titlePanel.add(label);
		panel.add(titlePanel, gbc);

		gbc.gridy++;
		gbc.anchor = GridBagConstraints.NORTHWEST;

		// Radio buttons
		group = new ButtonGroup();
		int nbLogement = 0;
		for (int i = 0; i < proprietaire.getBatiment().size(); i++) {
			Batiment batiment = proprietaire.getBatiment().get(i);
			for (int j = 0; j < batiment.getBiensLouables().size(); j++) {
				BienLouable bien = batiment.getBiensLouables().get(j);
				if (bien.isLocation()) {
					nbLogement++;
				}
			}
		}

		radioPanel =
				new JPanel(new GridLayout(0, nbLogement, 10, 10)); // Grid layout with three columns and spacing

		for (int i = 0; i < proprietaire.getBatiment().size(); i++) {
			Batiment batiment = proprietaire.getBatiment().get(i);
			for (int j = 0; j < batiment.getBiensLouables().size(); j++) {
				BienLouable bien = batiment.getBiensLouables().get(j);
				addBien(bien, i * batiment.getBiensLouables().size() + j);
			}
		}
		gbc.gridy++;
		JLabel label1 = new JLabel("Logements :");
		panel.add(label1, gbc);
		gbc.gridy++;
		panel.add(radioPanel, gbc);

		add(panel, BorderLayout.NORTH);

		gbc.gridy++;


        // Créer la JTable
        JTable table = new JTable();



		// Envelopper le panel dans un JScrollPane
		listeBailScrollPane = new JScrollPane(table);
		listeBailScrollPane.setPreferredSize(new java.awt.Dimension(400, 120)); // Taille pour 5 lignes visibles
		listeBailScrollPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
		listeBailScrollPane.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);

		// Ajouter le JScrollPane à votre panneau principal
		gbc.gridy++;
		panel.add(new JLabel("Liste des chiffres :"), gbc);
		gbc.gridy++;
		panel.add(listeBailScrollPane, gbc);


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
		JRadioButton radioButtonLocation = new JRadioButton(bien.getAdresse().toString());
		group.add(radioButtonLocation);
		radioButtonLocation.setName(String.valueOf(index));
		radioPanel.add(radioButtonLocation);
	}

}
