package vues;

import java.awt.*;
import java.util.List;
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.TitledBorder;

import controleurs.BoutonAjouterLocColocControleur;
import controleurs.DetailAppartementControleur;
import modele.Logement;
import modele.Personne;
import modele.SituationFamiliale;
import vues.composants.Button;
import vues.composants.CustomImage;
import vues.composants.EnumReports;

public class DetailAppartement extends JFrame {
  private static final long serialVersionUID = 1L;

  private Logement logement;

  public DetailAppartement(Logement logement) {
    this.logement = logement;
    setTitle("Apartment Details");
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setSize(800, 500); // Adjust the size as needed
    setLayout(new BorderLayout(10, 10));
    setLocationRelativeTo(null); // Center the frame

    // Left Panel for Image
    JPanel imagePanel = new JPanel();
    imagePanel.setLayout(new BorderLayout());
    imagePanel.setBorder(new EmptyBorder(10, 10, 10, 10));

    JLabel apartmentImage = new JLabel();
    apartmentImage.setIcon(
        new CustomImage(Constants.ICONS_PATH + "apartmentImage.jpg")
            .resize(250, 350)
            .round(Constants.BR_LG)
            .build());
    imagePanel.add(apartmentImage, BorderLayout.CENTER);

    add(imagePanel, BorderLayout.WEST);

    // Right Panel for Details
    JPanel detailsPanel = new JPanel();
    detailsPanel.setLayout(new BoxLayout(detailsPanel, BoxLayout.Y_AXIS));
    detailsPanel.setBorder(new EmptyBorder(10, 10, 10, 10));

    JLabel addressLabel = new JLabel(logement.getAdresse().toString(), SwingConstants.CENTER);
    addressLabel.setFont(Constants.HEADING_FONT);
    addressLabel.setForeground(Constants.HEADING_COLOR);
    add(addressLabel, BorderLayout.NORTH);

    // Add spacing between the components (5px)
    detailsPanel.add(createDetailLabel("Surface", logement.getSurfaceTotale() + " m²", null));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Référence cadastrale", logement.getRefCadastrale(), null));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(
        createDetailLabel(
            "Emission CO2",
            null,
            EnumReports.reportComponent(logement.getEmissionGazEffetDeSerre())));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(
        createDetailLabel(
            "Constat énergétique",
            null,
            EnumReports.reportComponent(logement.getConstatEnergetique())));
    detailsPanel.add(createDetailLabel("Loyer hors charges", logement.getLoyer().getMontantHorsCharge() + " €", null));
    // vérifier si c'est provisions sur charges annuelles ou un autre calcul (comme total charges)
    JPanel chargesPanel = new JPanel(new GridBagLayout());
    GridBagConstraints gbc = new GridBagConstraints();
    gbc.weightx = 1;
    chargesPanel.add(createDetailLabel("Charges", logement.getCharges().provisionSurChargeAnnuel() + " €", null), gbc);
    JButton editChargesButton = new Button("Éditer").build();
    gbc.weightx = 0.1;
    gbc.gridx = 1;
    gbc.anchor = GridBagConstraints.EAST;
    chargesPanel.add(editChargesButton, gbc);
    detailsPanel.add(chargesPanel);
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(
        createDetailLabel("Constat plomb", null, new JLabel(logement.getConstatPlomb())));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(
        createDetailLabel("Constat amiante", null, new JLabel(logement.getConstatAmiante())));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(
        createDetailLabel(
            "Constat électricité", null, new JLabel(logement.getConstatElectricite())));

    add(detailsPanel, BorderLayout.CENTER);

    DetailAppartementControleur c = new DetailAppartementControleur(this);

    // Bottom Panel for Locataire and Button
    JPanel bottomPanel = new JPanel(new BorderLayout());
    bottomPanel.setBorder(new EmptyBorder(10, 10, 10, 10));

    // Locataire Panel (Tenants)
    JPanel locatairePanel = new JPanel(new GridLayout(1, 2, 10, 10));
    TitledBorder locataireBorder = BorderFactory.createTitledBorder("Locataires");
    locataireBorder.setTitleFont(Constants.BASE_FONT);
    locataireBorder.setTitleColor(Constants.BODY_COLOR);
    locatairePanel.setBorder(
        BorderFactory.createCompoundBorder(
            locataireBorder, BorderFactory.createEmptyBorder(5, 5, 5, 5)));

    if (logement.getLocation() == null && logement.getColocation() == null) {
      locatairePanel.add(new JLabel("Vacant"));
    } else if (logement.isColocation()) {
      // If is a colocation
      List<Personne> locataires = logement.getColocation().getColocataires();
      for (Personne p : locataires) {
        locatairePanel.add(createLocatairePanel(p));
      }
    } else {
      List<Personne> locataires = logement.getLocation().getLocataires();
      for (Personne p : locataires) {
        locatairePanel.add(createLocatairePanel(p));
      }
    }

    bottomPanel.add(locatairePanel, BorderLayout.CENTER);

    // Supprimer un locataire
    JButton supprimerLocataire =
        new Button("Supprimer un locataire", Constants.ICONS_PATH + "minus-16x16-heading.png")
            .build();
    supprimerLocataire.setName("supprimerLocataire");
    supprimerLocataire.addActionListener(c);

    // Ajouter un locataire
    JButton ajouterLocataire =
        new Button("Ajouter un locataire", Constants.ICONS_PATH + "plus-16x16-heading.png").build();
    ajouterLocataire.setName("ajouterLocataire");
    BoutonAjouterLocColocControleur cBtnAjouter = new BoutonAjouterLocColocControleur(this);
    ajouterLocataire.addActionListener(cBtnAjouter);
    if (this.getLogement().isLocation()) {
      if (this.getLogement().getLocation() != null) {
        if ((this.getLogement().getLocation().getLocataires().size() == 1
                && this.getLogement().getLocation().getLocataires().get(0).getSituationFamiliale()
                    != SituationFamiliale.MARIE)
            || this.getLogement().getLocation().getLocataires().size() == 2) {
          ajouterLocataire.setEnabled(false);
        }
      }
    } else if (this.getLogement().isColocation()
        && this.getLogement().getColocation() != null
        && this.getLogement().getColocation().getColocataires().size() >= 8) {
      ajouterLocataire.setEnabled(false);
    }

    // Modify Button
    JButton modifyButton = new Button("Modifier les informations").build();
    modifyButton.setName("modifyButton");
    modifyButton.addActionListener(c);

    //Loyers Button
    JButton loyersButton = new Button("Loyers").build();
    loyersButton.setName("loyersButton");
    loyersButton.addActionListener(c);

    // return Button
    JButton retourButton = new Button("Retour").build();
    retourButton.setName("retourButton");
    retourButton.addActionListener(c);

    JPanel buttonPanel = new JPanel();
    buttonPanel.add(supprimerLocataire);
    buttonPanel.add(ajouterLocataire);
    buttonPanel.add(modifyButton);
    buttonPanel.add(loyersButton);
    buttonPanel.add(retourButton);

    bottomPanel.add(buttonPanel, BorderLayout.SOUTH);

    add(bottomPanel, BorderLayout.SOUTH);

    setVisible(true);
  }

  // Helper method to create detail labels
  private JPanel createDetailLabel(String title, String value, JLabel valueLabel) {
    JPanel detailPanel = new JPanel(new BorderLayout());
    JLabel titleLabel = new JLabel(title + ": ");
    titleLabel.setFont(Constants.SMALL_FONT);
    titleLabel.setForeground(Color.DARK_GRAY);

    if (valueLabel == null) {
      valueLabel = new JLabel(value);
      valueLabel.setFont(Constants.BASE_FONT);
      valueLabel.setForeground(Color.BLACK);
    }

    detailPanel.add(titleLabel, BorderLayout.WEST);
    detailPanel.add(valueLabel, BorderLayout.EAST);

    return detailPanel;
  }

  // Helper method to create a tenant panel
  private JPanel createLocatairePanel(Personne p) {
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
          new ProfilLocataire(p);
        });
    locatairePanel.add(moreInfoButton);

    locatairePanel.setBorder(
        BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(Color.LIGHT_GRAY, 1),
            BorderFactory.createEmptyBorder(5, 5, 5, 5)));
    return locatairePanel;
  }

  public Logement getLogement() {
    return this.logement;
  }
}
