package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.LinkedList;

import javax.swing.JButton;

import dao.LocationDAO;
import jdbc.SharedState;
import modele.Batiment;
import modele.Proprietaire;
import vues.AjouterLocataire;
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
      new LocationDAO().supprimerLocataires(this.vue.getLogement());
      Proprietaire proprietaire = SharedState.getInstance().getProprietaire();
      Batiment batiment = proprietaire.getBatiment().stream()
          .filter(b -> b.getId() == this.vue.getLogement().getIdBatiment()).findFirst().get();
      batiment.getBiensLouables().get(batiment.getBiensLouables().indexOf(this.vue.getLogement())).getLocation().setLocataires(new LinkedList<>());
      this.vue.dispose();
    } else if (target.getName().equals("ajouterLocataire")) {
      this.vue.dispose();
      new AjouterLocataire(this.vue.getLogement()).setVisible(true);
    }
  }
}
