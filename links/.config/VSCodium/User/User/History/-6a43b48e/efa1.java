package vues;

import java.awt.*;
import java.util.List;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.TitledBorder;

import controleurs.ProfilLocataireControleur;
import modele.Location;
import modele.Personne;
import utils.Formatters;
import utils.Logger;
import vues.composants.Button;

public class ProfilLocataire extends JFrame {
  private static final long serialVersionUID = 1L;
  public Location location;
  public Personne personne;
  private Boolean isColocation;

  public ProfilLocataire(Personne pers, Location l, boolean isGarant, Boolean isColocation) {
    this.location = l;
    this.personne = pers;
    this.isColocation = isColocation;
    ProfilLocataireControleur c = new ProfilLocataireControleur(this, isColocation);
    if (!isGarant) {
      setTitle("Profil Locataire");
    } else if (isGarant) {
      setTitle("Profil Garant");
    }

    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setSize(550, isGarant ? 400 : 500);
    setLayout(new BorderLayout(10, 10));
    setLocationRelativeTo(null); // Center the frame

    // Profile section with Image and Name
    JPanel profilePanel = new JPanel(new BorderLayout(10, 10));
    profilePanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

    // Name and Details
    JPanel detailsPanel = new JPanel(new BorderLayout());
    detailsPanel.setLayout(new BorderLayout());

    JLabel nameLabel = new JLabel(
        this.personne.getNom() + " " + this.personne.getPrenom(), JLabel.CENTER); // Center the label text
    nameLabel.setFont(Constants.HEADING_FONT);
    nameLabel.setForeground(Constants.HEADING_COLOR);
    detailsPanel.add(nameLabel, BorderLayout.NORTH); // Add the name label at the top (NORTH)

    // Add other details below the name label
    JPanel detailsListPanel = new JPanel();
    detailsListPanel.setLayout(new BoxLayout(detailsListPanel, BoxLayout.Y_AXIS));
    detailsListPanel.add(createDetailLabel("E-mail", this.personne.getEmail()));
    detailsListPanel.add(createDetailLabel("N° téléphone", this.personne.getTelephone()));
    detailsListPanel.add(
        createDetailLabel("Date de naissance", this.personne.getDateNaissance().toString()));
    detailsListPanel.add(createDetailLabel("Ville de naissance", this.personne.getLieuNaissance()));
    detailsListPanel.add(
        createDetailLabel("Situation familiale", this.personne.getSituationFamiliale().toString()));

    detailsPanel.add(detailsListPanel, BorderLayout.CENTER); // Add details below the name label
    profilePanel.add(detailsPanel, BorderLayout.CENTER);
    add(profilePanel, BorderLayout.NORTH);

    // Work Section
    JPanel workPanel = new JPanel(new GridLayout(0, 1, 5, 5));
    TitledBorder titleBorder = BorderFactory.createTitledBorder(
        BorderFactory.createLineBorder(Constants.BODY_COLOR), "Travail");
    titleBorder.setTitleFont(Constants.BASE_FONT);
    titleBorder.setTitleColor(Constants.BODY_COLOR);
    // Create a border with a line and title and 10px of margin and padding
    workPanel.setBorder(
        BorderFactory.createCompoundBorder(
            BorderFactory.createCompoundBorder(
                BorderFactory.createEmptyBorder(10, 10, 10, 10), titleBorder),
            BorderFactory.createEmptyBorder(10, 10, 10, 10)));
    workPanel.add(createDetailLabel("Profession", this.personne.getProfession()));
    workPanel.add(createDetailLabel("Employeur", this.personne.getEmployeur()));
    workPanel.add(
        createDetailLabel("Contrat de travail", this.personne.getTypeDeContratDeTravail().toString()));
    workPanel.add(
        createDetailLabel(
            "Revenu NET", Formatters.formatCurrency(this.personne.getRemunerationMensuelleNette())));
    workPanel.add(
        createDetailLabel(
            "Autres revenus", Formatters.formatCurrency(this.personne.getAutresRevenus())));

    JPanel centerPanel = new JPanel(new BorderLayout());
    centerPanel.setBorder(new EmptyBorder(10, 10, 10, 10));
    // Panel Garant
    if (!isGarant) {
      JPanel garantPanel = new JPanel(new GridLayout(1, 2, 10, 10));
      TitledBorder garantBorder = BorderFactory.createTitledBorder("Garant");
      garantBorder.setTitleFont(Constants.BASE_FONT);
      garantBorder.setTitleColor(Constants.BODY_COLOR);
      garantPanel.setBorder(
          BorderFactory.createCompoundBorder(
              garantBorder, BorderFactory.createEmptyBorder(5, 5, 5, 5)));

      if (this.location.getGarants() == null || this.location.getGarants().size() == 0) {
        garantPanel.add(new JLabel(isGarant ? "Aucun garant" :"Vacant"));
      } else {
        // If is a colocation
        List<Personne> garants = this.location.getGarants();
        Logger.log(garants);
        for (Personne p : garants) {
          garantPanel.add(createGarantPanel(p, this.location));
        }
      }

      centerPanel.add(garantPanel, BorderLayout.SOUTH);
    }
    centerPanel.add(workPanel, BorderLayout.CENTER);
    add(centerPanel, BorderLayout.CENTER);

    if (!isGarant) {
      JButton ajouterGarant = new Button("Ajouter un garant").build();
      ajouterGarant.setName("addGarant");
      ajouterGarant.addActionListener(c);

      JButton supprimerTousLesGarants = new Button("Supprimer tous les garants").build();
      supprimerTousLesGarants.setName("suppAllGarants");
      if (this.location.getGarants().size() < 1) {
        supprimerTousLesGarants.setEnabled(false);
      }
      supprimerTousLesGarants.addActionListener(c);

      // JPanel bottomPanel = new JPanel(new GridLayout(2,1));
      JPanel bottomPanel = new JPanel(new BorderLayout());
      bottomPanel.setBorder(BorderFactory.createEmptyBorder(0, 10, 10, 10));
      bottomPanel.add(ajouterGarant, BorderLayout.CENTER);
      bottomPanel.add(supprimerTousLesGarants, BorderLayout.SOUTH);
      add(bottomPanel, BorderLayout.SOUTH);
    } else if (isGarant) {
      JButton supprimerLeGarant = new Button("Supprimer le garant").build();
      supprimerLeGarant.setName("suppOneGarant");
      supprimerLeGarant.addActionListener(c);
      JButton retourBtn = new Button("Retour").build();
      retourBtn.setName("retourBtn");
      retourBtn.addActionListener(c);
      JPanel bottomPanel = new JPanel(new BorderLayout());
      bottomPanel.setBorder(BorderFactory.createEmptyBorder(0, 10, 10, 10));
      bottomPanel.add(supprimerLeGarant, BorderLayout.CENTER);
      bottomPanel.add(retourBtn, BorderLayout.SOUTH);
      add(bottomPanel, BorderLayout.SOUTH);
    }
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
          new ProfilLocataire(p, l, true, this.isColocation).setVisible(true);
          this.dispose();
        });
    locatairePanel.add(moreInfoButton);

    locatairePanel.setBorder(
        BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(Color.LIGHT_GRAY, 1),
            BorderFactory.createEmptyBorder(5, 5, 5, 5)));
    return locatairePanel;
  }
}
