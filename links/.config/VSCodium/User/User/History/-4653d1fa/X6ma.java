package ihm;

import java.awt.*;
import javax.swing.*;
import javax.swing.border.EmptyBorder;

import java.awt.event.ComponentAdapter;
import java.awt.event.ComponentEvent;
import java.util.ArrayList;
import java.util.List;

public class MyApartmentsVue extends JFrame {

    private static final long serialVersionUID = 1L;
    private JPanel contentPane;
    private JScrollPane scrollPane;
    private JPanel apartmentsCardsContainer;
    private List<JPanel> apartmentCards = new ArrayList<>();
    private int cardWidth = 300;
    private int cardHeight = 140;

    public static void main(String[] args) {
        EventQueue.invokeLater(() -> {
            try {
                MyApartmentsVue frame = new MyApartmentsVue();
                frame.setVisible(true);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }

    public MyApartmentsVue() {
        setTitle("Mes appartements");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(850, 600);
        contentPane = new JPanel(new BorderLayout());
        setContentPane(contentPane);

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
        createApartmentCard("133 B Av. de Rangueil - Appartement 12", "Mme.Deray");
        createApartmentCard("75 C Avenue de Toulouse - Appartement 45", "M. Dupont");
        createApartmentCard("29 D Rue de Paris - Appartement 8", "Mme. Lefevre");

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

        JButton addApartment = new ButtonPrimary("Ajouter une location", Constants.ICONS_PATH + "plus-16x16-white.png")
                .build();

        JButton addTennant = new ButtonPrimary("Ajouter un locataire", Constants.ICONS_PATH + "plus-16x16-white.png")
                .build();

        JButton logOut = new ButtonNeutral("Se déconnecter").build();
        logOut.addActionListener((e) -> {
            new LogInVue().setVisible(true);
            dispose();
        });

        actionButtonsNav.add(addApartment);
        actionButtonsNav.add(addTennant);
        actionButtonsNav.add(logOut);

        return actionButtonsNav;
    }

    private void createApartmentCard(String address, String tenantName) {
        ImageIcon backgroundImage = new ImageIcon(Constants.ICONS_PATH + "appartmentImage.jpg");
        BackgroundPanel apartmentPanel = new BackgroundPanel(backgroundImage);
        apartmentPanel.setPreferredSize(new Dimension(cardWidth, cardHeight));
        apartmentPanel.setLayout(new BorderLayout(5, 5));
        apartmentPanel.setBorder(Constants.BORDER);

        // Address and tenant info
        JPanel bottomPanel = new JPanel(new BorderLayout());
        JButton openApartmentInfos = new ButtonPrimary("Ouvrir").build();
        openApartmentInfos.addActionListener((e) -> {
            // new ApartmentInfoVue(0);
            this.dispose();
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

        // Center the frame
        setLocationRelativeTo(null);
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
