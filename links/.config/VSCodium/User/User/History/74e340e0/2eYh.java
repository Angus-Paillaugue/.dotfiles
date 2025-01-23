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

  public JLabel sousTotalFixe;
  public JLabel resSousTotalEau;
  public JLabel resTotalCharges;
  public JLabel totalRestantDu;

  public RegularisationDesCharges(BienLouable b) {
    this.b = b;
    setTitle("Réviser les charges");
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setSize(700, 500);
    setLocationRelativeTo(null);
    JPanel panel = new JPanel();
    panel.setLayout(new BorderLayout());
    panel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

    RegularisationDesChargesControleur controleur = new RegularisationDesChargesControleur(this);

    // Main panel
    this.mainPanel = new JPanel();
    mainPanel.setLayout(new BorderLayout());

    // Text at the top
    JLabel label = new JLabel("Révisez les charges");
    mainPanel.add(label, BorderLayout.NORTH);

    // Inputs
    JPanel inputsPanel = new JPanel();
    inputsPanel.setLayout(new GridLayout(0, 2, 10, 10));
    inputsPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

    addField(
        inputsPanel,
        "eclairageCommun",
        "Éclairage commun : ",
        new JTextField(),
        b.getCharges().getEclairagePartiesCommunes());
    addField(
        inputsPanel,
        "entretienCommun",
        "Entretien commun : ",
        new JTextField(),
        b.getCharges().getEntretienPartiesCommunes());
    addField(
        inputsPanel,
        "orduresMenageres",
        "Ordures ménagères : ",
        new JTextField(),
        b.getCharges().getOrduresMenageres());
    addField(
        inputsPanel,
        "eauPartieFixe",
        "Eau partie Fixe : : ",
        new JTextField(),
        b.getCharges().getEauPartieFixe());
    sousTotalFixe = new JLabel("Sous total fixe : ");
    inputsPanel.add(sousTotalFixe);
    inputsPanel.add(new JLabel("" + b.getCharges().getTotalPartieFixe()));
    addField(
        inputsPanel,
        "indexEau",
        "Entrez le nouvel index de l'eau (m3) : ",
        new JTextField(),
        -1F);
    addField(
        inputsPanel,
        "prixEauMetreCube",
        "Prix du m3 d'eau pour l'année courante : ",
        new JTextField(),
        -1F);
    JLabel sousTotalEau = new JLabel("Sous total Eau : ");
    inputsPanel.add(sousTotalEau);
    resSousTotalEau = new JLabel("");
    resSousTotalEau.setName("resSousTotalEau");
    inputsPanel.add(resSousTotalEau);

    JLabel totalCharges = new JLabel("Total charges : ");
    inputsPanel.add(totalCharges);
    resTotalCharges = new JLabel("");
    inputsPanel.add(resTotalCharges);

    JLabel provisionsAnnuelles = new JLabel("Provision sur charges : ");
    inputsPanel.add(provisionsAnnuelles);
    inputsPanel.add(new JLabel("" + b.getCharges().provisionSurChargeAnnuel()));

    JLabel restantDu = new JLabel("Total restant dû : ");
    inputsPanel.add(restantDu);
    totalRestantDu = new JLabel("");
    totalRestantDu.setName("totalRestantDu");
    inputsPanel.add(totalRestantDu);

    mainPanel.add(inputsPanel, BorderLayout.CENTER);

    // Footer Panel
    JPanel footerPanel = new JPanel();
    footerPanel.setLayout(new BorderLayout());
    JButton cancelButton = new Button("Annuler").build();
    cancelButton.setName("annuler");
    cancelButton.addActionListener(controleur);
    footerPanel.add(cancelButton, BorderLayout.WEST);
    JPanel centerButtonsPanel = new JPanel();
    JButton modifierButton = new Button("Modifier").build();
    modifierButton.setName("reviser");
    modifierButton.addActionListener(controleur);
    centerButtonsPanel.add(modifierButton, BorderLayout.WEST);
    JButton calculateButton = new Button("Calculer").build();
    calculateButton.setName("calculer");
    calculateButton.addActionListener(controleur);
    centerButtonsPanel.add(calculateButton, BorderLayout.EAST);
    footerPanel.add(centerButtonsPanel, BorderLayout.CENTER);
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

  private void addField(
      JPanel panel, String nom, String labelText, JTextField field, float placeholder) {
    panel.add(new JLabel(labelText));
    field.setName(nom);
    if (placeholder != -1F) {
      field.setText(Float.toString(placeholder));
    }

    panel.add(field);
    // panel.add(Box.createHorizontalStrut(15)); // Empty space for alignment
  }
}
