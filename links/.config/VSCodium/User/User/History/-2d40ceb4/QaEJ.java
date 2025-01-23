package ihm;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.TitledBorder;
import modele.Logement;
import modele.noteEnergetique;
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
          ApartmentDetailsView frame = new ApartmentDetailsView(null);
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

    JLabel addressLabel = new JLabel("133 B Av. de Rangueil - Appartement 23", SwingConstants.CENTER);
    addressLabel.setFont(Constants.HEADING_FONT);
    addressLabel.setForeground(Constants.HEADING_COLOR);
    add(addressLabel, BorderLayout.NORTH);

    // Add spacing between the components (5px)
    detailsPanel.add(createDetailLabel("Surface", "65 m²", null));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Référence cadastrale", "A6ZER2KL", null));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Dépôt de garantie", Formatters.formatCurrency(750), null));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Nombre de pièces", "5", null));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Constat plomb", null, EnumReports.reportComponent(noteEnergetique.A)));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Constat amiante", null, EnumReports.reportComponent(noteEnergetique.D)));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Emission CO2", null, EnumReports.reportComponent(noteEnergetique.E)));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Constat électricité", null, EnumReports.reportComponent(noteEnergetique.G)));
    detailsPanel.add(Box.createRigidArea(new Dimension(0, 5)));
    detailsPanel.add(createDetailLabel("Constat énergétique", null, EnumReports.reportComponent(noteEnergetique.F)));

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

    locatairePanel.add(createLocatairePanel("Mr. Sylvain Durif"));
    locatairePanel.add(createLocatairePanel("Mr. Jean Lassalle"));

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
  private JPanel createLocatairePanel(String locataireName) {
    JPanel locatairePanel = new JPanel();
    locatairePanel.setLayout(new BoxLayout(locatairePanel, BoxLayout.Y_AXIS));

    JLabel locataireLabel = new JLabel(locataireName);
    locataireLabel.setFont(Constants.BASE_FONT);
    locataireLabel.setForeground(Constants.BODY_COLOR);
    locatairePanel.add(locataireLabel);

    locatairePanel.add(Box.createRigidArea(new Dimension(0, 10)));

    JButton moreInfoButton = new Button("Plus d'infos").build();
    moreInfoButton.addActionListener((e) -> {
      new UserProfileVue(null);
    });
    locatairePanel.add(moreInfoButton);

    locatairePanel.setBorder(BorderFactory.createCompoundBorder(BorderFactory.createLineBorder(Color.LIGHT_GRAY, 1),
        BorderFactory.createEmptyBorder(5, 5, 5, 5)));
    return locatairePanel;
  }
}
