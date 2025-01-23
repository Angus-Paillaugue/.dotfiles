package contracts;

import java.awt.EventQueue;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JTextField;

import vues.AppTheme;
import vues.Constants;
import modele.BienLouable; // Add this import statement


public class ContractDeLocation extends JFrame {
	private static final long serialVersionUID = 1L;

	public static void main(String[] args) {
    AppTheme.setup();
		Constants.genererProprio();
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
			setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
			setLocationRelativeTo(null);
			setLayout(new GridLayout(0, 2)); // Use GridLayout for simplicity

			// Add fields for BienLouable attributes
			addField("Name", bien.getName());
			addField("Address", bien.getAddress());
			addField("Price", String.valueOf(bien.getPrice()));
			// Add more fields as necessary
	}

	private void addField(String label, String value) {
			JLabel jLabel = new JLabel(label);
			JTextField jTextField = new JTextField(value);
			add(jLabel);
			add(jTextField);
	}

}
