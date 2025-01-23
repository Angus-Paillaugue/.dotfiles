package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;

import dao.LocationDAO;
import dao.LogementDAO;
import vues.AjouterLocataire;
import vues.DetailAppartement;
import vues.MesAppartements;

public class DetailAppartementControleur implements ActionListener {

  private DetailAppartement vue;

  public DetailAppartementControleur(DetailAppartement vue) {
    this.vue = vue;
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    JButton target = (JButton) e.getSource();
    if (target.getName().equals("supprimerLocataire")) {
      new LocationDAO().supprimerLocataires(this.vue.getLogement().getId());
    } else if (target.getName().equals("ajouterLocataire")) {
      this.vue.dispose();
      new AjouterLocataire(this.vue.getLogement()).setVisible(true);
    }
  }
}
