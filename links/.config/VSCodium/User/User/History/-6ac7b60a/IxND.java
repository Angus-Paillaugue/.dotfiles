package ihm;

import javax.swing.JPasswordField;
import javax.swing.JTextField;
import javax.swing.UIManager;

import com.app.themes.Main;
import com.formdev.flatlaf.FlatLaf;

public class ThemedWindow {

  private static final long serialVersionUID = 1L;
	public JTextField emailField;
	public JPasswordField passwordField;
    public static final String NAME = "Main";

    public static boolean setup() {
        return setup(new Main());
    }

    public static void installLafInfo() {
        installLafInfo(NAME, Main.class);
    }

    @Override
    public String getName() {
        return NAME;
    }

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
        try {
            UIManager.setLookAndFeel(new FlatLaf());
        } catch (Exception ex) {
            System.err.println("Failed to initialize LaF");
        }
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					LogInVue frame = new LogInVue();
					frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

}
