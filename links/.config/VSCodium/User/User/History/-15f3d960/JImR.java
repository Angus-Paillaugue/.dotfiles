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
import vues.composants.ModalDanger;
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
      case "annuler":
        {
          this.vue.dispose();
          new HistoriqueDesCharges(b);
          break;
        }
      case "editer":
        break;

      case "reviser":
        {
          try {
            ChargesDAO chargesDAO = new ChargesDAO();

            float orduresMenageres = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "orduresMenageres"));
            float eclairageCommun = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "eclairageCommun"));
            float entretienCommun = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "entretienCommun"));
            float eauPartieFixe = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "eauPartieFixe"));
            float sousTotalFixe = eclairageCommun + orduresMenageres + entretienCommun + eauPartieFixe;
            this.vue.sousTotalFixe.setText(String.valueOf(sousTotalFixe));

            int indexEau = VuesUtils.toInt(VuesUtils.getInputValue(this.vue.mainPanel, "indexEau"));
            float prixEau = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "prixEauMetreCube"));

            float provisionSurCharge = VuesUtils
                    .toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "nouvelleProvisions"));

            Charges nouvelleCharge = new Charges(
                orduresMenageres,
                entretienCommun,
                eclairageCommun,
                eauPartieFixe,
                    provisionSurCharge / 12,
                    indexEau,
                    prixEau,
                    LocalDate.now());
            nouvelleCharge = chargesDAO.update(nouvelleCharge, b.getId());

            new ModalSuccess("Succès", "Charges régularisés avec succès", true);
          } catch (Exception error) {
            error.printStackTrace();
            new ModalDanger("Erreur", error.getMessage(), true);
          }
          break;
        }
      case "calculer":
        {
          try {
            float sousTotalFixe = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "eclairageCommun"))
                + VuesUtils.toFloat(
                    VuesUtils.getInputValue(this.vue.mainPanel, "orduresMenageres"))
                + VuesUtils.toFloat(
                    VuesUtils.getInputValue(this.vue.mainPanel, "entretienCommun"))
                + VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "eauPartieFixe"));
            this.vue.sousTotalFixe.setText(String.valueOf(sousTotalFixe));

            float sousTotalEau = VuesUtils.toFloat(VuesUtils.getInputValue(this.vue.mainPanel, "prixEauMetreCube"))
                * VuesUtils.toInt(VuesUtils.getInputValue(this.vue.mainPanel, "indexEau"));
            this.vue.resSousTotalEau.setText(String.valueOf(sousTotalEau));

            float totalCharges = sousTotalFixe + sousTotalEau;
            this.vue.resTotalCharges.setText(String.valueOf(totalCharges));

            float totalRestantDu = totalCharges - b.getCharges().provisionSurChargeAnnuel();
            this.vue.totalRestantDu.setText(String.valueOf(totalRestantDu));

            float propositionNewProvisions = (float) b.getCharges().provisionSurChargeAnnuel() + totalRestantDu);
            this.vue.resPropositionProvisions.setText(String.valueOf(propositionNewProvisions));
          } catch (Exception error) {
            error.printStackTrace();
            new ModalDanger("Erreur", error.getMessage(), true);
          }
          break;
        }
    }
  }
}
