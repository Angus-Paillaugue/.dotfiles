package contracts;

import java.awt.EventQueue;
import javax.swing.JFrame;
import vues.AppTheme;
import vues.Constants;


public class ContractDeLocation extends JFrame {
	private static final long serialVersionUID = 1L;

	public static void main(String[] args) {
    AppTheme.setup();
    EventQueue.invokeLater(
        () -> {
          try {
            ContractDeLocation frame = new ContractDeLocation(Constants.proprietaire.getBatiment()[0].);
            frame.setVisible(true);
          } catch (Exception e) {
            e.printStackTrace();
          }
        });
  }

	public ContractDeLocation(BienLouable bien) {
		setTitle("Contract de location");
		setSize(800, 600);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setLocationRelativeTo(null);
	}

}
