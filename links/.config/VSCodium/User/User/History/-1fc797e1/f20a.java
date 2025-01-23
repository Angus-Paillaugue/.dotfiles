package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import modele.SituationFamiliale;
import utils.Logger;
import vues.AjouterLocataire;
import vues.DetailAppartement;
import vues.SelectionTypeDeContrat;
import vues.composants.ModalDanger;

public class BoutonAjouterLocColocControleur implements ActionListener {

  public DetailAppartement vue;

  public BoutonAjouterLocColocControleur(DetailAppartement vue) {
    this.vue = vue;
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    Logger.log("DetailAppartement : " + this.vue.logement.getIdBatiment());
    if (this.vue.getLogement().isVide()) {
      new SelectionTypeDeContrat(this.vue.getLogement()).setVisible(true);
      this.vue.dispose();
      // System.err.println("aimplementer");
    } else if (this.vue.getLogement().isLocation()
        && this.vue.getLogement().getLocation().getLocataires().size() < 2
        && this.vue
            .getLogement()
            .getLocation()
            .getLocataires()
            .get(0)
            .getSituationFamiliale()
            .equals(SituationFamiliale.MARIE)) {

      new AjouterLocataire(this.vue.getLogement()).setVisible(true);
      this.vue.dispose();

    } else if (this.vue.getLogement().isLocation()
        && !this.vue
            .getLogement()
            .getLocation()
            .getLocataires()
            .get(0)
            .getSituationFamiliale()
            .equals(SituationFamiliale.MARIE)) {

      new ModalDanger(
          "Location Impossible",
          "Impossible d'ajouter un locataire car le logement est déja occupé par une personne célibataire",
          true);

    } else if (this.vue.getLogement().isColocation()
        && this.vue.getLogement().getColocation().getColocataires().size() < 8) {
      new AjouterLocataire(this.vue.getLogement()).setVisible(true);
      this.vue.dispose();
    }
  }
}
