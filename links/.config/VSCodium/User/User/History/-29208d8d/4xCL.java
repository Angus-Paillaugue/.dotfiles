package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import vues.ReviserLoyer;
import javax.swing.JComponent;
import jdbc.SharedState;
import modele.Logement;
import modele.Loyer;
import modele.Proprietaire;

public class ReviserLoyerControleur implements ActionListener {
  private ReviserLoyer vue;

  public ReviserLoyerControleur(ReviserLoyer vue) {
    this.vue = vue;
  }

  public void actionPerformed(ActionEvent e) {
    JComponent target = (JComponent) e.getSource();
    Proprietaire proprietaire = SharedState.getInstance().getProprietaire();
    Logement logement = this.vue.getLogement();

    Loyer loyerActuel = 
  }
}
