package ihm;

import javax.swing.*;
import javax.swing.border.TitledBorder;

import modele.Personne;

import java.awt.*;

public class UserProfileVue extends JFrame {

	private static final long serialVersionUID = 1L;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		AppTheme.setup();
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					UserProfileVue frame = new UserProfileVue(Constants.locataire1);
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	public UserProfileVue(Personne personne) {
		setTitle("Profile");
		setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
		setSize(550, 500);
		setLayout(new BorderLayout(10, 10));
		setLocationRelativeTo(null); // Center the frame

		// Profile section with Image and Name
		JPanel profilePanel = new JPanel(new BorderLayout(10, 10));
		profilePanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

		// Name and Details
		JPanel detailsPanel = new JPanel(new BorderLayout());
		detailsPanel.setLayout(new BorderLayout());

		JLabel nameLabel = new JLabel(personne.get, JLabel.CENTER); // Center the label text
		nameLabel.setFont(Constants.HEADING_FONT);
		nameLabel.setForeground(Constants.HEADING_COLOR);
		detailsPanel.add(nameLabel, BorderLayout.NORTH); // Add the name label at the top (NORTH)

		// Add other details below the name label
		JPanel detailsListPanel = new JPanel();
		detailsListPanel.setLayout(new BoxLayout(detailsListPanel, BoxLayout.Y_AXIS));
		detailsListPanel.add(createDetailLabel("E-mail", "jean.lassalle@gouv.fr"));
		detailsListPanel.add(createDetailLabel("N° téléphone", "+33 6 06 06 06 06"));
		detailsListPanel.add(createDetailLabel("Date de naissance", "3 mai 1955 (69 ans)"));
		detailsListPanel.add(createDetailLabel("Ville de naissance", "Lourdios-Ichère (64)"));
		detailsListPanel.add(createDetailLabel("Situation familiale", "Marié"));
		detailsListPanel.add(createDetailLabel("Date début location", "01/01/1975"));

		detailsPanel.add(detailsListPanel, BorderLayout.CENTER); // Add details below the name label
		profilePanel.add(detailsPanel, BorderLayout.CENTER);
		add(profilePanel, BorderLayout.NORTH);

		// Work Section
		JPanel workPanel = new JPanel(new GridLayout(0, 1, 5, 5));
		TitledBorder titleBorder = BorderFactory.createTitledBorder(BorderFactory.createLineBorder(Constants.BODY_COLOR),
				"Travail");
		titleBorder.setTitleFont(Constants.BASE_FONT);
		titleBorder.setTitleColor(Constants.BODY_COLOR);
		// Create a border with a line and title and 10px of margin and padding
		workPanel.setBorder(BorderFactory.createCompoundBorder(
				BorderFactory.createCompoundBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10), titleBorder),
				BorderFactory.createEmptyBorder(10, 10, 10, 10)));
		workPanel.add(createDetailLabel("Profession", "Parlementaire"));
		workPanel.add(createDetailLabel("Employeur", "Assemblée nationale"));
		workPanel.add(createDetailLabel("Contrat de travail", "CDD (jusqu'au 01/01/2027)"));
		workPanel.add(createDetailLabel("Revenu NET", Formatters.formatCurrency(12576.45)));
		workPanel.add(createDetailLabel("Autres revenus", Formatters.formatCurrency(783.09)));

		add(workPanel, BorderLayout.CENTER);

		setVisible(true);
	}

	// Helper method to create a JLabel with title and value
	private JPanel createDetailLabel(String title, String value) {
		JPanel detailPanel = new JPanel(new BorderLayout());
		JLabel titleLabel = new JLabel(title);
		titleLabel.setFont(Constants.BASE_FONT);
		titleLabel.setForeground(Color.DARK_GRAY);
		JLabel valueLabel = new JLabel(value);
		valueLabel.setFont(Constants.BASE_FONT);
		valueLabel.setForeground(Constants.BODY_COLOR);
		detailPanel.add(titleLabel, BorderLayout.WEST);
		detailPanel.add(valueLabel, BorderLayout.EAST);
		return detailPanel;
	}
}
