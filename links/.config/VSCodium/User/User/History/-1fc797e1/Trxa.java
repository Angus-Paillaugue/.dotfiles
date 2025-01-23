package controleurs;

import modele.SituationFamiliale;
import vues.AjouterLocataire;
import vues.DetailAppartement;
import vues.composants.ModalDanger;

public class BoutonAjouterLocColocControleur {

  public DetailAppartement vue;

  public BoutonAjouterLocColocControleur(DetailAppartement vue) {

    this.vue = vue;

    if (this.vue.getLogement().isVide()) {
      // new SelectionTypeDeContrat(Logement logement).setVisible(true);
      // this.vue.dispose();
      System.err.println("aimplementer");
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

      // this.vue.dispose();
      new ModalDanger(
          "Location Impossible",
          "Impossible d'ajouter un locataire car le logement est déja occupé par une personne célibataire",
          true);

    } else if (this.vue.getLogement().isColocation()
        && this.vue.getLogement().getColocation().getColocataires().size() < 8) {
      new AjouterLocataire(this.vue.getLogement()).setVisible(true);
    }
  }
}
