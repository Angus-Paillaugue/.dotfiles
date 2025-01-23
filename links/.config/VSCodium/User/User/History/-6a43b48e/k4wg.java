package vues;

import java.awt.*;
import java.util.List;
import java.util.Optional;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.TitledBorder;

import modele.Location;
import modele.Personne;
import utils.Formatters;
import vues.composants.Button;

public class ProfilLocataire extends JFrame {
  private static final long serialVersionUID = 1L;

  public ProfilLocataire(Personne personne, Location l, Optional<Boolean> isGarant) {
    setTitle("Profile");
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setSize(550, 500);
    setLayout(new BorderLayout(10,10));
    setLocationRelativeTo(null); // Center the frame

    // Profile section with Image and Name
    JPanel profilePanel = new JPanel(new BorderLayout(10, 10));
    profilePanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

    // Name and Details
    JPanel detailsPanel = new JPanel(new BorderLayout());
    detailsPanel.setLayout(new BorderLayout());

    JLabel nameLabel =
        new JLabel(
            personne.getNom() + " " + personne.getPrenom(), JLabel.CENTER); // Center the label text
    nameLabel.setFont(Constants.HEADING_FONT);
    nameLabel.setForeground(Constants.HEADING_COLOR);
    detailsPanel.add(nameLabel, BorderLayout.NORTH); // Add the name label at the top (NORTH)

    // Add other details below the name label
    JPanel detailsListPanel = new JPanel();
    detailsListPanel.setLayout(new BoxLayout(detailsListPanel, BoxLayout.Y_AXIS));
    detailsListPanel.add(createDetailLabel("E-mail", personne.getEmail()));
    detailsListPanel.add(createDetailLabel("N° téléphone", personne.getTelephone()));
    detailsListPanel.add(
        createDetailLabel("Date de naissance", personne.getDateNaissance().toString()));
    detailsListPanel.add(createDetailLabel("Ville de naissance", personne.getLieuNaissance()));
    detailsListPanel.add(
        createDetailLabel("Situation familiale", personne.getSituationFamiliale().toString()));

    detailsPanel.add(detailsListPanel, BorderLayout.CENTER); // Add details below the name label
    profilePanel.add(detailsPanel, BorderLayout.CENTER);
    add(profilePanel, BorderLayout.NORTH);

    // Work Section
    JPanel workPanel = new JPanel(new GridLayout(0, 1, 5, 5));
    TitledBorder titleBorder =
        BorderFactory.createTitledBorder(
            BorderFactory.createLineBorder(Constants.BODY_COLOR), "Travail");
    titleBorder.setTitleFont(Constants.BASE_FONT);
    titleBorder.setTitleColor(Constants.BODY_COLOR);
    // Create a border with a line and title and 10px of margin and padding
    workPanel.setBorder(
        BorderFactory.createCompoundBorder(
            BorderFactory.createCompoundBorder(
                BorderFactory.createEmptyBorder(10, 10, 10, 10), titleBorder),
            BorderFactory.createEmptyBorder(10, 10, 10, 10)));
    workPanel.add(createDetailLabel("Profession", personne.getProfession()));
    workPanel.add(createDetailLabel("Employeur", personne.getEmployeur()));
    workPanel.add(
        createDetailLabel("Contrat de travail", personne.getTypeDeContratDeTravail().toString()));
    workPanel.add(
        createDetailLabel(
            "Revenu NET", Formatters.formatCurrency(personne.getRemunerationMensuelleNette())));
    workPanel.add(
        createDetailLabel(
            "Autres revenus", Formatters.formatCurrency(personne.getAutresRevenus())));

    //Panel Garant
    JPanel garantPanel = new JPanel(new GridLayout(1, 2, 10, 10));
    TitledBorder garantBorder = BorderFactory.createTitledBorder("Garant");
    garantBorder.setTitleFont(Constants.BASE_FONT);
    garantBorder.setTitleColor(Constants.BODY_COLOR);
    garantPanel.setBorder(
        BorderFactory.createCompoundBorder(
            garantBorder, BorderFactory.createEmptyBorder(5, 5, 5, 5)));

    if (l.getGarants() == null) {
      garantPanel.add(new JLabel("Vacant"));
    } else {
      // If is a colocation
    	List<Personne> garants = l.getGarants();
        for (Personne p : garants) {
          garantPanel.add(createGarantPanel(p, l));
        }
      }

    JPanel centerPanel = new JPanel(new BorderLayout());
    centerPanel.setBorder(new EmptyBorder(10, 10, 10, 10));
    centerPanel.add(workPanel, BorderLayout.CENTER);
    centerPanel.add(garantPanel,BorderLayout.SOUTH);
    add(centerPanel, BorderLayout.CENTER);

    JButton ajouterGarant = new Button("Ajouter un garant").build();
    ajouterGarant.addActionListener(
        e -> {
          AjouterGarant ajtGarant = new AjouterGarant(l);
          ajtGarant.setVisible(true);
        });
    add(ajouterGarant, BorderLayout.SOUTH);

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

 private JPanel createGarantPanel(Personne p, Location l) {
   JPanel locatairePanel = new JPanel();
   locatairePanel.setLayout(new BoxLayout(locatairePanel, BoxLayout.Y_AXIS));

   JLabel locataireLabel = new JLabel(p.getNom() + " " + p.getPrenom());
   locataireLabel.setFont(Constants.BASE_FONT);
   locataireLabel.setForeground(Constants.BODY_COLOR);
   locatairePanel.add(locataireLabel);

   locatairePanel.add(Box.createRigidArea(new Dimension(0, 10)));

   JButton moreInfoButton = new Button("Plus d'infos").build();
   moreInfoButton.addActionListener(
       e -> {
         new ProfilLocataire(p, l);
       });
   locatairePanel.add(moreInfoButton);

   locatairePanel.setBorder(
       BorderFactory.createCompoundBorder(
           BorderFactory.createLineBorder(Color.LIGHT_GRAY, 1),
           BorderFactory.createEmptyBorder(5, 5, 5, 5)));
   return locatairePanel;
 }
}
