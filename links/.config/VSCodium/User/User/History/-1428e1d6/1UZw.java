package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;

import vues.AjouterLocataire;
import vues.DetailAppartement;
import vues.MesAppartements;
import vues.DetailAppartement;

public class DetailAppartementControleur implements ActionListener {

  private DetailAppartement vue;

  public DetailAppartementControleur(DetailAppartement vue) {
    this.vue = vue;
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    JButton target = (JButton) e.getSource();
    if (target.getName().equals("supprimerLocataire")) {

    } else if (target.getName().equals("ajouterLocataire")) {
      vue.dispose();
      new AjouterLocataire(this.vue.)
    }
  }
}
