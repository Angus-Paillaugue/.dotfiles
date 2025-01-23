package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;

import modele.Colocation;
import modele.Location;
import vues.AjouterLocataire;
import vues.DetailAppartement;
import vues.SelectionTypeDeContrat;

public class SelectionTypeDeContratControleur implements ActionListener {

  private SelectionTypeDeContrat vue;

  public SelectionTypeDeContratControleur(SelectionTypeDeContrat vue) {
    this.vue = vue;
  }

  @Override
  public void actionPerformed(ActionEvent e) {
    JButton target = (JButton) e.getSource();
    if (target.getName().equals("cancelBtn")) {
      this.vue.dispose();
      new DetailAppartement(this.vue.logement).setVisible(true);
    } else if (target.getName().equals("locationBtn")) {
      this.vue.logement.setIsLocation();
      this.vue.logement.setLocation(new Location());

      new AjouterLocataire(this.vue.logement).setVisible(true);
      this.vue.dispose();
    } else if (target.getName().equals("colocationBtn")) {
      this.vue.logement.setIsCoLocation();
      this.vue.logement.setColocation(new Colocation());

      new AjouterLocataire(this.vue.logement).setVisible(true);
      this.vue.dispose();
    }
  }
}
