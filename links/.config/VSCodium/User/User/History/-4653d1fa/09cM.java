package ihm;

import java.awt.*;
import javax.swing.*;
import javax.swing.border.EmptyBorder;

import components.Button;
import modele.Batiment;
import modele.Logement;
import modele.Proprietaire;

import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class MyApartmentsVue extends JFrame {

  private static final long serialVersionUID = 1L;
  private JPanel contentPane;
  private JScrollPane scrollPane;
  private JPanel apartmentsCardsContainer;
  private List<JPanel> apartmentCards = new ArrayList<>();
  private int cardWidth = 300;
  private int cardHeight = 140;

  public static void main(String[] args) {
    AppTheme.setup();
    Constants.genererProprio();
    EventQueue.invokeLater(() -> {
      try {
        MyApartmentsVue frame = new MyApartmentsVue(Constants.proprietaire);
        frame.setVisible(true);
      } catch (Exception e) {
        e.printStackTrace();
      }
    });
  }

  public MyApartmentsVue(Proprietaire proprietaire) {
    setTitle("Mes appartements");
    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    setSize(850, 600);
    contentPane = new JPanel(new BorderLayout());
    setContentPane(contentPane);
    setLocationRelativeTo(null); // Center the frame

    // Navbar
    JPanel actionButtonsNav = createNavbar();
    contentPane.add(actionButtonsNav, BorderLayout.NORTH);

    // Scrollable panel for apartments
    scrollPane = new JScrollPane();
    scrollPane.setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
    contentPane.add(scrollPane, BorderLayout.CENTER);

    apartmentsCardsContainer = new JPanel(new GridBagLayout());
    scrollPane.setViewportView(apartmentsCardsContainer);

    // Create apartment cards
    List<Batiment> batiments = proprietaire.getBatiment();
    List<Logement> logements = batiments.stream().flatMap(b -> b.getBiensLouables().stream())
        .filter(l -> l instanceof Logement).map(l -> (Logement) l).collect(Collectors.toList());

    for (Logement logement : logements) {
      if(logement.getLocation() != null) {
        String locataires = logement.getLocation().getLocataires().stream()
            .map(p -> p.getNom() + " " + p.getPrenom()).collect(Collectors.joining(", "));
        createApartmentCard(logement.getAdresse().toString(), locataires);
      }else {
        // Est une colocation
        String locataires = logement.getLocation().getLocataires().stream()
            .map(p -> p.getNom() + " " + p.getPrenom()).collect(Collectors.joining(", "));
        createApartmentCard(logement.getAdresse().toString(), locataires);
      }
    }

    // Add cards to the container
    for (JPanel card : apartmentCards) {
      apartmentsCardsContainer.add(card);
    }

    // Add ComponentListener to handle resizing
    addComponentListener(new ComponentAdapter() {
      @Override
      public void componentResized(ComponentEvent e) {
        updateLayout();
      }
    });

    updateLayout();
  }

  private JPanel createNavbar() {
    JPanel actionButtonsNav = new JPanel(new FlowLayout(FlowLayout.CENTER));

    JButton addApartment = new Button("Ajouter un location",
        Constants.ICONS_PATH + "plus-16x16-heading.png")
        .build();
    addApartment.addActionListener((e) -> {
      new AddRentalVue().setVisible(true);
    });

    JButton addTennant = new Button("Ajouter un locataire", Constants.ICONS_PATH + "plus-16x16-heading.png")
        .build();

    JButton logOut = new Button("Se déconnecter").build();
    logOut.addActionListener((e) -> {
      new LogInVue().setVisible(true);
      this.dispose();
    });

    actionButtonsNav.add(addApartment);
    actionButtonsNav.add(addTennant);
    actionButtonsNav.add(logOut);

    return actionButtonsNav;
  }

  private void createApartmentCard(String address, String tenantName) {
    ImageIcon backgroundImage = new ImageIcon(Constants.ICONS_PATH + "apartmentImage.jpg");
    BackgroundPanel apartmentPanel = new BackgroundPanel(backgroundImage);
    apartmentPanel.setPreferredSize(new Dimension(cardWidth, cardHeight));
    apartmentPanel.setLayout(new BorderLayout(5, 5));
    apartmentPanel.setBorder(Constants.BORDER);

    // Address and tenant info
    JPanel bottomPanel = new JPanel(new BorderLayout());
    JButton openApartmentInfos = new Button("Ouvrir").build();
    openApartmentInfos.addActionListener((e) -> {
      new ApartmentDetailsView(Constants.logement1).setVisible(true);
    });
    bottomPanel.add(openApartmentInfos, BorderLayout.EAST);
    JPanel infoPanel = new JPanel(new GridLayout(2, 1));
    bottomPanel.add(infoPanel, BorderLayout.CENTER);
    infoPanel.setBorder(new EmptyBorder(5, 5, 5, 5));
    infoPanel.setBackground(Constants.WHITE_COLOR);
    JLabel addressLabel = new JLabel(address);
    addressLabel.setFont(Constants.BASE_FONT);
    addressLabel.setForeground(Constants.BODY_COLOR);
    JLabel tenantLabel = new JLabel(tenantName);
    tenantLabel.setFont(Constants.SMALL_FONT);
    tenantLabel.setForeground(Constants.BODY_COLOR);
    infoPanel.add(addressLabel);
    infoPanel.add(tenantLabel);
    apartmentPanel.add(bottomPanel, BorderLayout.SOUTH);

    apartmentCards.add(apartmentPanel);
  }

  private void updateLayout() {
    apartmentsCardsContainer.removeAll();

    int containerWidth = scrollPane.getViewport().getWidth();
    int columns = Math.max(1, containerWidth / (cardWidth + 20)); // Calculate number of columns based on available
                                                                  // space
    int newCardWidth = (containerWidth - (columns + 1) * 10) / columns - 10;

    GridBagConstraints gbc = new GridBagConstraints();
    gbc.insets = new Insets(10, 10, 10, 10);
    gbc.fill = GridBagConstraints.NONE; // Cards will keep their aspect ratio

    for (int i = 0; i < apartmentCards.size(); i++) {
      JPanel card = apartmentCards.get(i);
      card.setPreferredSize(new Dimension(newCardWidth, cardHeight));
      gbc.gridx = i % columns;
      gbc.gridy = i / columns;
      apartmentsCardsContainer.add(card, gbc);
    }

    apartmentsCardsContainer.revalidate();
    apartmentsCardsContainer.repaint();
  }
}
