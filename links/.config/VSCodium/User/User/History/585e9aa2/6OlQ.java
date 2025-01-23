package vues.mesDocuments;

import java.awt.EventQueue;

import javax.swing.JFrame;

import jdbc.SharedState;
import modele.BienLouable;
import vues.AppTheme;

public class SoldeDeToutCompte extends JFrame  {
	// La methode main ne sert qu'a tester la fenetre
		public static void main(String[] args) {
			AppTheme.setup();
			EventQueue.invokeLater(
					() -> {
						try {
							SoldeDeToutCompte frame =
									new SoldeDeToutCompte(
											SharedState.getInstance().getProprietaire().getBatiment().get(0).getBiensLouables().get(0));
							frame.setVisible(true);
						} catch (Exception e) {
							e.printStackTrace();
						}
					});
		}

		//A implementer
		public SoldeDeToutCompte(BienLouable bien) {
			editSoldeDeToutCompte(bien);
		}
		//A implementer
		public void editSoldeDeToutCompte(BienLouable bien) {

		}

}
