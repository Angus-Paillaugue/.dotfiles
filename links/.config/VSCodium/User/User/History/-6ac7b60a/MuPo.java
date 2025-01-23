package ihm;

import javax.swing.JPasswordField;
import javax.swing.JTextField;
import javax.swing.UIManager;

import com.app.themes.Main;
import com.formdev.flatlaf.FlatLaf;

public class ThemedWindow extends JFrame {

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

}
