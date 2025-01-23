package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;

import dao.LogementDAO;
import modele.Colocation;
import modele.Location;
import utils.Logger;
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
    Logger.log("SelectionTypeDeContrat : " + this.vue.logement.getIdBatiment());
    JButton target = (JButton) e.getSource();
    LogementDAO logementDAO = new LogementDAO();
    if (target.getName().equals("cancelBtn")) {
      this.vue.dispose();
      new DetailAppartement(this.vue.logement).setVisible(true);
    } else if (target.getName().equals("locationBtn")) {
      this.vue.logement.setIsLocation();
      this.vue.logement.setColocation(null);
      this.vue.logement.setLocation(new Location());
      logementDAO.update(this.vue.logement);

      new AjouterLocataire(this.vue.logement).setVisible(true);
      this.vue.dispose();
    } else if (target.getName().equals("colocationBtn")) {
      this.vue.logement.setIsCoLocation();
      this.vue.logement.setLocation(null);
      this.vue.logement.setColocation(new Colocation());
      logementDAO.update(this.vue.logement);

      new AjouterLocataire(this.vue.logement).setVisible(true);
      this.vue.dispose();
    }
  }
}
