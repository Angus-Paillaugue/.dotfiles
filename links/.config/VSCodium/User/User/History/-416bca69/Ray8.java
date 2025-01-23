package vues;

import java.awt.*;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.swing.*;
import javax.swing.border.EmptyBorder;

import jdbc.SharedState;
import modele.Batiment;
import modele.Logement;
import modele.Proprietaire;
import utils.Logger;
import vues.composants.BackgroundPanel;
import vues.composants.Button;

public class MesAppartements extends JFrame {
  private static final long serialVersionUID = 1L;
  private JPanel contentPane;
  private JScrollPane scrollPane;
  private JPanel apartmentsCardsContainer;
  private List<JPanel> apartmentCards = new ArrayList<>();
  private final int cardWidth = 300;
  private final int cardHeight = 140;

  public static void main(String[] args) {
    AppTheme.setup();
    EventQueue.invokeLater(
        () -> {
          try {
            MesAppartements frame = new MesAppartements();
            frame.setVisible(true);
          } catch (Exception e) {
            e.printStackTrace();
          }
        });
  }

  public MesAppartements() {
    Proprietaire proprietaire = SharedState.getInstance().getProprietaire();
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
    List<Logement> logements =
        batiments.stream()
            .flatMap(b -> b.getBiensLouables().stream())
            .filter(l -> l instanceof Logement)
            .map(l -> (Logement) l)
            .collect(Collectors.toList());

    for (Logement logement : logements) {
      createApartmentCard(logement);
    }

    // Add cards to the container
    for (JPanel card : apartmentCards) {
      apartmentsCardsContainer.add(card);
    }

    // Add ComponentListener to handle resizing
    addComponentListener(
        new ComponentAdapter() {

          @Override
          public void componentResized(ComponentEvent e) {
            updateLayout();
          }
        });

    updateLayout();
  }

  private JPanel createNavbar() {
    JPanel actionButtonsNav = new JPanel(new FlowLayout(FlowLayout.CENTER));

    JButton addBuilding =
        new Button("Ajouter un bâtiment", Constants.ICONS_PATH + "plus-16x16-heading.png").build();
    addBuilding.addActionListener(
        e -> {
          new AjouterBatiment().setVisible(true);
          this.dispose();
        });

    JButton addApartment =
        new Button("Ajouter un logement", Constants.ICONS_PATH + "plus-16x16-heading.png").build();
    addApartment.addActionListener(
        e -> {
          new AjouterLogement().setVisible(true);
          this.dispose();
        });

    JButton logOut = new Button("Se déconnecter").build();
    logOut.addActionListener(
        e -> {
          new SeConnecter().setVisible(true);
          this.dispose();
        });

    JButton mesDocuments = new Button("Mes documents").build();
    mesDocuments.addActionListener(
        e -> {
          new MesDocuments().setVisible(true);
          this.dispose();
        });

    actionButtonsNav.add(addBuilding);
    actionButtonsNav.add(addApartment);
    actionButtonsNav.add(logOut);
    actionButtonsNav.add(mesDocuments);

    return actionButtonsNav;
  }

  private void createApartmentCard(Logement logement) {
    String tenantName;
    if (logement.getLocation() != null && logement.isLocation()) {
      System.out.println(logement.getLocation().getLocataires());
      tenantName =
      logement.getLocation().getLocataires().stream()
      .map(p -> p.getNom() + " " + p.getPrenom())
      .collect(Collectors.joining(", "));
    } else if (logement.getColocation() != null) {
      tenantName =
          logement.getColocation().getColocataires().stream()
              .map(p -> p.getNom() + " " + p.getPrenom())
              .collect(Collectors.joining(", "));
    } else {
      tenantName = "Pas de locataire";
    }
    ImageIcon backgroundImage = new ImageIcon(Constants.ICONS_PATH + "apartmentImage.jpg");
    BackgroundPanel apartmentPanel = new BackgroundPanel(backgroundImage);
    apartmentPanel.setPreferredSize(new Dimension(cardWidth, cardHeight));
    apartmentPanel.setLayout(new BorderLayout(5, 5));
    apartmentPanel.setBorder(Constants.BORDER);

    // Address and tenant info
    JPanel bottomPanel = new JPanel(new BorderLayout());
    JButton openApartmentInfos = new Button("Ouvrir").build();
    openApartmentInfos.addActionListener(
        e -> {
          new DetailAppartement(logement).setVisible(true);
          this.dispose();
        });
    bottomPanel.add(openApartmentInfos, BorderLayout.EAST);
    JPanel infoPanel = new JPanel(new GridLayout(2, 1));
    bottomPanel.add(infoPanel, BorderLayout.CENTER);
    infoPanel.setBorder(new EmptyBorder(5, 5, 5, 5));
    infoPanel.setBackground(Constants.WHITE_COLOR);
    JLabel addressLabel = new JLabel(logement.getAdresse().toString());
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
    int columns =
        Math.max(
            1, containerWidth / (cardWidth + 20)); // Calculate number of columns based on available
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
