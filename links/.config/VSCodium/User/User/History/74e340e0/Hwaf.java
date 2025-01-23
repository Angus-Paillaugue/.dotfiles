package vues;

import java.awt.*;
import javax.swing.*;

import controleurs.RegularisationDesChargesControleur;
import dao.ProprietaireDAO;
import jdbc.SharedState;
import modele.BienLouable;
import modele.Logement;
import modele.Proprietaire;
import vues.composants.Button;
import vues.composants.TextField;

public class RegularisationDesCharges extends JFrame {

  private static final long serialVersionUID = 1L;

  private BienLouable b;
  public JPanel mainPanel;

  public static void main(String[] args) {
    AppTheme.setup();
    // TODO: Remove this
    ProprietaireDAO proprietaireDAO = new ProprietaireDAO();
    Proprietaire proprietaire = proprietaireDAO.findByMail("test@test.fr");
    SharedState.getInstance().setProprietaire(proprietaire);
    EventQueue.invokeLater(
        () -> {
          try {
            RegularisationDesCharges frame =
                new RegularisationDesCharges(
                    (Logement) proprietaire.getBatiment().get(0).getBiensLouables().get(0));
            frame.setVisible(true);
          } catch (Exception e) {
            e.printStackTrace();
          }
        });
  }

  public JLabel sousTotalEau;
  public JLabel totalCharges;
  public JLabel restantDu;

  public RegularisationDesCharges(BienLouable b) {
    this.b = b;
    setTitle("Réviser les charges");
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setSize(350, 300);
    setLocationRelativeTo(null);
    JPanel panel = new JPanel();
    panel.setLayout(new BorderLayout());
    panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

    RegularisationDesChargesControleur controleur = new RegularisationDesChargesControleur(this);

    // Main panel
    this.mainPanel = new JPanel();
    mainPanel.setLayout(new BorderLayout());

    // Text at the top
    JLabel label = new JLabel("Entrez l'IRL pour un bâtiment de ");
    mainPanel.add(label, BorderLayout.NORTH);

    // Inputs
    JPanel inputsPanel = new JPanel(new GridBagLayout());
    GridBagConstraints gbc = new GridBagConstraints();
    gbc.insets = new Insets(5, 5, 5, 5);
    gbc.fill = GridBagConstraints.HORIZONTAL;
    gbc.anchor = GridBagConstraints.NORTHWEST;
    gbc.gridx = 0;
    gbc.gridy = 0;
    gbc.gridwidth = 2;

    JLabel eclairageCommun =
        new JLabel("Éclairage commun : " + b.getCharges().getEclairagePartiesCommunes());
    inputsPanel.add(eclairageCommun, gbc);
    gbc.gridy = 1;
    JLabel entretienCommun =
        new JLabel("Entretien commun : " + b.getCharges().getEntretienPartiesCommunes());
    inputsPanel.add(entretienCommun, gbc);
    gbc.gridy = 2;
    JLabel ordureMenagere =
        new JLabel("Ordures ménagères : " + b.getCharges().getOrduresMenageres());
    inputsPanel.add(ordureMenagere, gbc);
    gbc.gridy = 3;
    JLabel eauPartieFixe = new JLabel("Eau partie Fixe : " + b.getCharges().getEauPartieFixe());
    inputsPanel.add(eauPartieFixe, gbc);
    gbc.gridy = 4;

    JLabel sousTotalFixe = new JLabel("Sous total fixe : " + b.getCharges().getTotalPartieFixe());
    inputsPanel.add(sousTotalFixe, gbc);
    gbc.gridy = 5;

    JPanel newIndexEau =
        new TextField("Entrez le nouvel index de l'eau (m3) : ", "", "indexEau").build();
    inputsPanel.add(newIndexEau, gbc);
    gbc.gridy = 6;
    JPanel prixEau =
        new TextField(
                "Prix du m3 d'eau pour l'année courante : ",
                "",
                "euro-16x16-body.png",
                "prixEauMetreCube")
            .build();
    inputsPanel.add(prixEau, gbc);

    gbc.gridy = 7;
    sousTotalEau = new JLabel("Sous total Eau : ");
    inputsPanel.add(sousTotalEau, gbc);
    gbc.gridy = 8;

    totalCharges = new JLabel("total charges : ");
    inputsPanel.add(sousTotalEau, gbc);
    gbc.gridy = 9;

    JLabel provisionsAnnuelles =
        new JLabel("Provision sur charges : " + b.getCharges().provisionSurChargeAnnuel());
    inputsPanel.add(provisionsAnnuelles, gbc);
    gbc.gridy = 10;

    restantDu = new JLabel("Total restant dû : ");
    inputsPanel.add(restantDu, gbc);
    gbc.gridy = 11;

    mainPanel.add(inputsPanel, BorderLayout.CENTER);

    // Footer Panel
    JPanel footerPanel = new JPanel();
    footerPanel.setLayout(new BorderLayout());
    JButton cancelButton = new Button("Annuler").build();
    cancelButton.setName("annuler");
    cancelButton.addActionListener(controleur);
    footerPanel.add(cancelButton, BorderLayout.WEST);
    JButton confirmButton = new Button("Modifier").build();
    confirmButton.setName("reviser");
    confirmButton.addActionListener(controleur);
    footerPanel.add(confirmButton, BorderLayout.CENTER);
    JButton editerButton = new Button("Editer").build();
    editerButton.setName("editer");
    editerButton.addActionListener(controleur);
    footerPanel.add(editerButton, BorderLayout.EAST);

    mainPanel.add(footerPanel, BorderLayout.SOUTH);
    panel.add(mainPanel, BorderLayout.CENTER);
    add(panel);
  }

  public BienLouable getBienLouable() {
    return this.b;
  }
}
