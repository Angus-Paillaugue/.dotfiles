package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;

import dao.LocationDAO;
import vues.DetailAppartement;
import vues.Loyers;
import vues.MesAppartements;
import vues.ModifierLogement;
import vues.SupprimerLocataire;

public class DetailAppartementControleur implements ActionListener {

  private DetailAppartement vue;

  public DetailAppartementControleur(DetailAppartement vue) {
    this.vue = vue;
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    JButton target = (JButton) e.getSource();
    if (target.getName().equals("supprimerLocataire")) {
      if (this.vue.getLogement().isVide()) {
        return;
      }
      if (this.vue.getLogement().isLocation()) {
        this.vue.getLogement().getLocation().removeLocataires();
        LocationDAO locationDAO = new LocationDAO();
        locationDAO.supprimerLocataires(this.vue.getLogement());
        new DetailAppartement(this.vue.getLogement()).setVisible(true);
        this.vue.dispose();
      } else if (this.vue.getLogement().isColocation()) {
        new SupprimerLocataire(this.vue.getLogement()).setVisible(true);
        this.vue.dispose();
      }
    }
    /*else if (target.getName().equals("ajouterLocataire")) {
      this.vue.dispose();
      new AjouterLocataire(this.vue.getLogement()).setVisible(true);
    }*/ else if (target.getName().equals("modifyButton")) {
      this.vue.dispose();
      new ModifierLogement(this.vue.getLogement()).setVisible(true);
    } else if (target.getName().equals("retourButton")) {
      this.vue.dispose();
      new MesAppartements().setVisible(true);
    } else if (target.getName().equals("loyersButton")) {
      this.vue.dispose();
      new Loyers(this.vue.getLogement()).setVisible(true);
    }
  }
}
