package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.time.LocalDate;

import javax.swing.JComponent;

import dao.ChargesDAO;
import modele.BienLouable;
import modele.Charges;
import utils.VuesUtils;
import vues.HistoriqueDesCharges;
import vues.RegularisationDesCharges;
import vues.composants.ModalSuccess;

public class RegularisationDesChargesControleur implements ActionListener {

  private RegularisationDesCharges vue;

  public RegularisationDesChargesControleur(RegularisationDesCharges vue) {
    this.vue = vue;
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    BienLouable b = this.vue.getBienLouable();
    JComponent target = (JComponent) e.getSource();
    switch (target.getName()) {
      case "annuler": {
        this.vue.dispose();
        new HistoriqueDesCharges(b);
        break;
      }
      case "editer":
        break;

      case "reviser": {
        ChargesDAO chargesDAO = new ChargesDAO();

        float orduresMenageres = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "orduresMenageres"));
        float eclairageCommun = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "eclairageCommun"));
        float entretienCommun = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "entretienCommun"));
        float eauPartieFixe = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "eauPartieFixe"));
        float sousTotalFixe = eclairageCommun
            + orduresMenageres
            + entretienCommun
            + eauPartieFixe;
        this.vue.sousTotalFixe.setText(String.valueOf(sousTotalFixe));

        int indexEau = VuesUtils.toInt(VuesUtils.getInputValue(this.vue.mainPanel, "indexEau"));
        float prixEau = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "prixEauMetreCube"));

        // TODO: Faire la provision sur charge annuel
        Charges nouvelleCharge =
            new Charges(
                orduresMenageres,
                entretienCommun,
                eclairageCommun,
                eauPartieFixe,
                0,
                indexEau,
                prixEau,
                LocalDate.now());
        nouvelleCharge = chargesDAO.update(nouvelleCharge, b.getId());

        new ModalSuccess("Succès", "Charges régularisés avec succès", true);
        break;
      }
      case "calculer": {
        float sousTotalFixe = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "eclairageCommun"))
            + VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "orduresMenageres"))
            + VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "entretienCommun"))
            + VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "eauPartieFixe"));
        this.vue.sousTotalFixe.setText(String.valueOf(sousTotalFixe));

        float sousTotalEau = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "prixEauMetreCube"))
            * VuesUtils.toInt(VuesUtils.getInputValue(this.vue.mainPanel, "indexEau"));
        this.vue.resSousTotalEau.setText(String.valueOf(sousTotalEau));

        float totalCharges = sousTotalFixe + sousTotalEau;
        this.vue.resTotalCharges.setText(String.valueOf(totalCharges));

        float totalRestantDu = totalCharges - b.getCharges().provisionSurChargeAnnuel();
        this.vue.totalRestantDu.setText(String.valueOf(totalRestantDu));
        break;
      }
    }
  }
}
