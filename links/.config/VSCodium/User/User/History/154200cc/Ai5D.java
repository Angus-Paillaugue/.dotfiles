package contracts;

import java.awt.EventQueue;
import java.awt.GridLayout;
import javax.swing.JFrame;

import vues.AppTheme;
import vues.Constants;
import modele.BienLouable; // Add this import statement


public class ContractDeLocation extends JFrame {
	private static final long serialVersionUID = 1L;

	public static void main(String[] args) {
    AppTheme.setup();
    EventQueue.invokeLater(
        () -> {
          try {
            ContractDeLocation frame = new ContractDeLocation(Constants.proprietaire.getBatiment().get(0).getBiensLouables().get(0));
            frame.setVisible(true);
          } catch (Exception e) {
            e.printStackTrace();
          }
        });
  }

	 public ContractDeLocation(BienLouable bien) {
			setTitle("Contract de location");
			setSize(800, 600);
			setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
			setLocationRelativeTo(null);
			setLayout(new GridLayout(0, 2)); // Use GridLayout for simplicity
	}

}
