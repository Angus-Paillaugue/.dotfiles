package vues;

import java.awt.*;
import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.swing.*;
import javax.swing.border.EmptyBorder;

import composants.BackgroundPanel;
import composants.Button;
import modele.Batiment;
import modele.Logement;
import modele.Proprietaire;

public class MesDocuments extends JFrame {
  private static final long serialVersionUID = 1L;

  public static void main(String[] args) {
    AppTheme.setup();
    EventQueue.invokeLater(
        () -> {
          try {
            MesAppartements frame = new MesDocuments(Constants.proprietaire);
            frame.setVisible(true);
          } catch (Exception e) {
            e.printStackTrace();
          }
        });
  }

  public MesDocuments(Proprietaire proprietaire) {
    setTitle("Mes documents");
    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    setSize(850, 600);
  }

  private JPanel createNavbar() {
    JPanel actionButtonsNav = new JPanel(new FlowLayout(FlowLayout.CENTER));

    JButton addApartment = new Button("Ajouter une location", Constants.ICONS_PATH + "plus-16x16-heading.png").build();
    addApartment.addActionListener(
        e -> {
          new AjouterLocation().setVisible(true);
        });

    JButton addTennant = new Button("Ajouter un locataire", Constants.ICONS_PATH + "plus-16x16-heading.png").build();

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

    actionButtonsNav.add(addApartment);
    actionButtonsNav.add(addTennant);
    actionButtonsNav.add(logOut);
    actionButtonsNav.add(mesDocuments);

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
    openApartmentInfos.addActionListener(
        e -> {
          new DetailAppartement(Constants.logement1).setVisible(true);
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
    int columns = Math.max(
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
