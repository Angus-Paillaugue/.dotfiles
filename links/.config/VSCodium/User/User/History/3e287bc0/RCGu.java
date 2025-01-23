package vues;

import java.awt.*;
import javax.swing.*;

public class AjouterBatiment extends JFrame {
  private static final long serialVersionUID = 1L;

		public JPanel mainPanel;

		public static void main(String[] args) {
			AppTheme.setup();
			EventQueue.invokeLater(
					() -> {
						try {
							AjouterLogement frame = new AjouterLogement();
							frame.setVisible(true);
						} catch (Exception e) {
							e.printStackTrace();
						}
					});
		}

		public AjouterBatiment() {
    setTitle("Ajouter un batiment");
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setSize(900, 1000);
		setLocationRelativeTo(null);
  }
}
