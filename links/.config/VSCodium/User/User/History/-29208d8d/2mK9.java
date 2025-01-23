package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.time.LocalDate;

import vues.ReviserLoyer;
import vues.composants.ModalSuccess;

import javax.swing.JComponent;

import dao.LoyerDAO;
import jdbc.SharedState;
import modele.Logement;
import modele.Loyer;
import modele.Proprietaire;
import utils.VuesUtils;

public class ReviserLoyerControleur implements ActionListener {
  private ReviserLoyer vue;

  public ReviserLoyerControleur(ReviserLoyer vue) {
    this.vue = vue;
  }

  public void actionPerformed(ActionEvent e) {
    JComponent target = (JComponent) e.getSource();
    Logement logement = this.vue.getLogement();
    Proprietaire proprietaire = SharedState.getInstance().getProprietaire();

    switch (target.getName()) {
      case "modifier":
        Loyer loyerActuel = new LoyerDAO().findLatestForLogement(logement.getId());
        float ancienIRL = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "oldIrlValue"));
        float nouveauIRL = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "newIewValue"));
        float nouveauMontantLoyer = (loyerActuel.getMontantHorsCharge() * nouveauIRL) / ancienIRL;

        loyerActuel.setMontantHorsCharge(nouveauMontantLoyer);
        loyerActuel.setDateDerniereRevision(LocalDate.now());
        loyerActuel.setDateProchaineRevision(LocalDate.now().plusYears(1));
        LoyerDAO loyerDAO = new LoyerDAO();

        Loyer nouveauLoyer = loyerDAO.update(loyerActuel, logement.getId());
        List<Logement> logements = proprietaire.getBatiment().stream()
            .flatMap(b -> b.getBiensLouables().stream())
            .filter(l -> l instanceof Logement)
            .map(l -> (Logement) l)
            .collect(Collectors.toList());

        proprietaire.get

        this.vue.dispose();
        new ModalSuccess("Enregistré", "Loyer enregistré avec succès!", true).setVisible(true);
        break;
      default:
        break;
    }
  }
}
