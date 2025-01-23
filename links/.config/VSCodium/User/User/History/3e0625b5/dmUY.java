package ihm;


import javax.swing.*;

import components.Button;
import components.MoneyTextField;
import modele.SituationFamiliale;
import modele.TypeDeContratDeTravail;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class AjouterLocataireVue extends JFrame {

    private static final long serialVersionUID = 1L;

	public AjouterLocataireVue() {
        setTitle("Ajouter un locataire");
        setSize(800, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        // Main container panel
        JPanel panel = new JPanel();
        panel.setLayout(new GridLayout(0, 3, 10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        // Form fields
        addField(panel, "Nom:", new JTextField("Lassalle"));
        addField(panel, "Prénom:", new JTextField("Jean"));
        addField(panel, "Date de naissance:", new JTextField("3/05/1955"));
        addField(panel, "Lieu de naissance:", new JTextField("Lourdios-Ichère"));

        JComboBox<String> situationFamiliale = new JComboBox<>(SituationFamiliale.getValues());
        situationFamiliale.setSelectedItem("Marié");
        addField(panel, "Situation familiale:", situationFamiliale);

        addField(panel, "Profession:", new JTextField("Parlementaire"));
        addField(panel, "Employeur:", new JTextField("Assemblée Nationale"));

        JComboBox<String> contratTravail = new JComboBox<>(TypeDeContratDeTravail.getNames());
        contratTravail.setSelectedItem("CDD");
        addField(panel, "Contrat de travail:", contratTravail);

        addField(panel, "Rémunération mensuelle NET:", new MoneyTextField(null, 1200.0).build());
        addField(panel, "Autre rémunération:", new JTextField("631.00"));
        addField(panel, "Adresse:", new JTextField("126 rue de l'Université, 75355 Paris"));
        addField(panel, "E-mail:", new JTextField("jean.lasalle@assemblee.gouv"));
        addField(panel, "Téléphone:", new JTextField("0606060606"));

        Constants.genererProprio();
        JComboBox<String> choixBienLouable = new JComboBox<>(Constants.proprietaire.adressebiensLouables().toArray(new String[0]));
        addField(panel, "Choix du logement :", choixBienLouable);

        // Button panel
        JPanel buttonPanel = new JPanel();
        JButton saveButton = new Button("Enregistrer").build();
        saveButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                JOptionPane.showMessageDialog(panel, "Locataire enregistré avec succès!");
            }
        });
        buttonPanel.add(saveButton);

        // Add components to frame
        add(panel, BorderLayout.CENTER);
        add(buttonPanel, BorderLayout.SOUTH);
    }

    private void addField(JPanel panel, String labelText, JComponent field) {
        panel.add(new JLabel(labelText));
        panel.add(field);
        panel.add(Box.createHorizontalStrut(15)); // Empty space for alignment
    }

    private void addField(JPanel panel, String labelText, JPanel field) {
        panel.add(new JLabel(labelText));
        panel.add(field);
        panel.add(Box.createHorizontalStrut(15)); // Empty space for alignment
    }

    public static void main(String[] args) {
    	AppTheme.setup();
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new AjouterLocataireVue().setVisible(true);
            }
        });
    }
}
