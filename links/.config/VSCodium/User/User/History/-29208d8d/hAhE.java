package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
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


    switch (target.getName()) {
      case "modifier":
        Loyer loyerActuel = new LoyerDAO().findLatestForLogement(logement.getId());
        float ancienIRL = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "oldIrlValue"));
        float nouveauIRL = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "newIewValue"));
        float nouveauMontantLoyer = (loyerActuel.getMontantHorsCharge() * nouveauIRL)/ancienIRL;

        loyerActuel.setMontantHorsCharge(nouveauMontantLoyer);
        LoyerDAO loyerDAO = new LoyerDAO();

        loyerDAO.update(loyerActuel, logement.getId());

        this.vue.dispose();
        new ModalSuccess("null","Loyer enregistré avec succes!", true)
        break;
      default:
        break;
    }
  }
}
