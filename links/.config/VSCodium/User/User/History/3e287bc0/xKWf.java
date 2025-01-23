package vues;

import java.awt.*;
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.TitledBorder;

import controleurs.AjouterLogementControleur;
import modele.TypeDeBatiment;

public class AjouterBatiment extends JFrame {
  private static final long serialVersionUID = 1L;

		public JPanel mainPanel;

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

		public AjouterBatiment() {
    setTitle("Ajouter un bâtiment");
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setSize(900, 1000);
		setLocationRelativeTo(null);
		AjouterLogementControleur controleur = new AjouterLogementControleur(this);

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
    addLabelAndTextField(formPanel, gbc,"adresseNumero", "Numéro", 3);
		addLabelAndTextField(formPanel, gbc,"adresseRue", "Rue", 4);
		addLabelAndTextField(formPanel, gbc,"adresseVille", "Ville", 5);
		addLabelAndTextField(formPanel, gbc,"adresseCP", "Code postal", 6);
    addLabelAndComboBox(formPanel, gbc, "typeBatiment","Type de bâtiment", TypeDeBatiment.getValues(), 7);
    addLabelAndTextField(formPanel, gbc,"adresseRefLogement", "Référence logement", 8);
    addLabelAndTextField(formPanel, gbc,"refCadastrale", "Référence cadastrale", 9);
  }
}
