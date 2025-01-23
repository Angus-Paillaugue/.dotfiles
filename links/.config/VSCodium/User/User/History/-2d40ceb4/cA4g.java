package ihm;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.TitledBorder;

import components.Button;
import components.CustomImage;
import components.EnumReports;
import components.Formatters;
import modele.Logement;
import modele.Personne;
import java.util.List;
import java.util.Map;
import java.awt.*;

public class ApartmentDetailsView extends JFrame {

  private static final long serialVersionUID = 1L;

  /**
   * Launch the application.
   */
  public static void main(String[] args) {
    AppTheme.setup();
    EventQueue.invokeLater(new Runnable() {
      public void run() {
        try {
          ApartmentDetailsView frame = new ApartmentDetailsView(Constants.logement1);
          frame.setVisible(true);
        } catch (Exception e) {
          e.printStackTrace();
        }
      }
    });
  }

  public ApartmentDetailsView(Logement apartment) {
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
        new CustomImage(Constants.ICONS_PATH + "apartmentImage.jpg").resize(250, 350).round(Constants.BR_LG).build());
    imagePanel.add(apartmentImage, BorderLayout.CENTER);

    add(imagePanel, BorderLayout.WEST);

    // Right Panel for Details
    JPanel detailsPanel = new JPanel();
    detailsPanel.setLayout(new BoxLayout(detailsPanel, BoxLayout.Y_AXIS));
    detailsPanel.setBorder(new EmptyBorder(10, 10, 10, 10));

    JLabel addressLabel = new JLabel(apartment.getAdresse().toString(), SwingConstants.CENTER);
    addressLabel.setFont(Constants.HEADING_FONT);
    addressLabel.setForeground(Constants.HEADING_COLOR);
    add(addressLabel, BorderLayout.NORTH);

    // Add spacing between the components (5px)
    detailsPanel.add(createDetailLabel("Surface", apartment.surfaceTotaleHabitable() + " m²", null));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Référence cadastrale", apartment.getRefCadastrale(), null));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Dépôt de garantie", Formatters.formatCurrency(apartment.getMontantDepotGarantie()), null));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Nombre de pièces", Integer.toString(apartment.getPieces().size()), null));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Emission CO2", null, EnumReports.reportComponent(apartment.getEmissionGazEffetDeSerre())));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Constat énergétique", null, EnumReports.reportComponent(apartment.getConstatEnergetique())));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Constat plomb", null, new JLabel(apartment.getConstatPlomb())));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Constat amiante", null, new JLabel(apartment.getConstatAmiante())));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Constat électricité", null, new JLabel(apartment.getConstatElectricite())));

    add(detailsPanel, BorderLayout.CENTER);

    // Bottom Panel for Locataire and Button
    JPanel bottomPanel = new JPanel(new BorderLayout());
    bottomPanel.setBorder(new EmptyBorder(10, 10, 10, 10));

    // Locataire Panel (Tenants)
    JPanel locatairePanel = new JPanel(new GridLayout(1, 2, 10, 10));
    TitledBorder locataireBorder = BorderFactory.createTitledBorder("Locataires");
    locataireBorder.setTitleFont(Constants.BASE_FONT);
    locataireBorder.setTitleColor(Constants.BODY_COLOR);
    locatairePanel
        .setBorder(BorderFactory.createCompoundBorder(locataireBorder, BorderFactory.createEmptyBorder(5, 5, 5, 5)));

    if(apartment.getLocation() == null) {
      // If is a colocation
      Map<Personne, List<Object>> locataires = apartment.getColocation().getColocataires();
      for(Personne p : locataires.keySet()) {
        locatairePanel.add(createLocatairePanel(p));
      }
    }else {
      List<Personne> locataires = apartment.getLocation().getLocataires();
      for(Personne p : locataires) {
        locatairePanel.add(createLocatairePanel(p));
      }
    }

    bottomPanel.add(locatairePanel, BorderLayout.CENTER);

    // Modify Button
    JButton modifyButton = new Button("Modifier les informations").build();

    JPanel buttonPanel = new JPanel();
    buttonPanel.add(modifyButton);

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
    moreInfoButton.addActionListener((e) -> {
      new UserProfileVue(p);
    });
    locatairePanel.add(moreInfoButton);

    locatairePanel.setBorder(BorderFactory.createCompoundBorder(BorderFactory.createLineBorder(Color.LIGHT_GRAY, 1),
        BorderFactory.createEmptyBorder(5, 5, 5, 5)));
    return locatairePanel;
  }
}
