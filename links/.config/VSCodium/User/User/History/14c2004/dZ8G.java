package ihm;

import javax.swing.*;

import jcdb.Connector;

import java.awt.*;

public class LogInVue extends JFrame {

  private static final long serialVersionUID = 1L;
  public JTextField emailField;
  public JPasswordField passwordField;

  /**
   * This is the main application entry point.
   * It is responsible for setting up the application theme and creating the main frame.
   */
  public static void main(String[] args) {
    AppTheme.setup();
    Connector.createDatabase();
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

  /**
   * Create the frame.
   */
  public LogInVue() {
    // Set up the current JFrame (this)
    setTitle("Se Connecter");
    setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    setSize(400, 300); // Set preferred size
    setLayout(new BorderLayout());
    setLocationRelativeTo(null); // Center the frame
    LogInController controller = new LogInController(this);

    // Create a panel to hold the form elements
    JPanel panel = new JPanel();
    panel.setLayout(new GridBagLayout()); // Use GridBagLayout for flexible positioning
    GridBagConstraints gbc = new GridBagConstraints();
    gbc.insets = new Insets(10, 10, 10, 10); // Add padding between components
    gbc.fill = GridBagConstraints.HORIZONTAL; // Make components stretch horizontally

    // Title Label
    JLabel titleLabel = new JLabel("Se Connecter");
    titleLabel.setFont(Constants.WINDOW_TITLE_FONT);
    titleLabel.setForeground(Constants.HEADING_COLOR);
    gbc.gridx = 0;
    gbc.gridy = 0;
    gbc.gridwidth = 2; // Span two columns for the title
    gbc.anchor = GridBagConstraints.CENTER; // Center the title
    panel.add(titleLabel, gbc);

    // Email Label
    JLabel emailLabel = new JLabel("E-Mail:");
    emailLabel.setForeground(Constants.BODY_COLOR);
    emailLabel.setFont(Constants.BASE_FONT);
    gbc.gridx = 0;
    gbc.gridy = 1;
    gbc.gridwidth = 1; // Single column for label
    gbc.anchor = GridBagConstraints.LINE_END; // Align the label to the right
    panel.add(emailLabel, gbc);

    // Email TextField
    emailField = new JFormattedTextField();
    gbc.gridx = 1;
    gbc.gridy = 1;
    gbc.anchor = GridBagConstraints.LINE_START; // Align the input to the left
    gbc.weightx = 1.0; // Make the text field take up extra horizontal space
    gbc.fill = GridBagConstraints.HORIZONTAL; // Make the text field stretch horizontally
    panel.add(emailField, gbc);

    // Password Label
    JLabel passwordLabel = new JLabel("Mot de passe:");
    passwordLabel.setForeground(Constants.BODY_COLOR);
    passwordLabel.setFont(Constants.BASE_FONT);
    gbc.gridx = 0;
    gbc.gridy = 2;
    gbc.anchor = GridBagConstraints.LINE_END; // Align the label to the right
    panel.add(passwordLabel, gbc);

    // Password Field
    passwordField = new JPasswordField();
    gbc.gridx = 1;
    gbc.gridy = 2;
    gbc.anchor = GridBagConstraints.LINE_START; // Align the input to the left
    gbc.weightx = 1.0; // Make the password field take up extra horizontal space
    gbc.fill = GridBagConstraints.HORIZONTAL; // Make the password field stretch horizontally
    panel.add(passwordField, gbc);

    // Login Button
    JButton loginButton = new Button("Se connecter").build();
    loginButton.addActionListener(controller);
    gbc.gridx = 0;
    gbc.gridy = 3;
    gbc.gridwidth = 2; // Span two columns for the button
    gbc.anchor = GridBagConstraints.CENTER; // Center the button
    panel.add(loginButton, gbc);

    // Add the panel to the center of the frame
    add(panel, BorderLayout.CENTER);
  }
}
