package ihm;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.FlowLayout;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;

public class Modal extends JFrame {

  private static final long serialVersionUID = 1L;
  private JPanel contentPane;

  /**
   * @param textColor  - The heading text color
   * @param title      - The heading text
   * @param body       - The body text
   * @param iconPath   - The icon path relative to the project
   * @param button     - A JButton component to go on the right of the cancel
   *                   button (if present)
   * @param cancelable - A boolean representing weather to add a cancel button to
   *                   the modal
   */
  public Modal(Color textColor, String title, String body, String iconPath, JButton button, Boolean cancelable) {
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setBackground(Constants.WINDOW_BG_COLOR);
    setBounds(100, 100, 450, 200);
    contentPane = new JPanel();
    contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
    setContentPane(contentPane);
    contentPane.setLayout(new BorderLayout(0, 0));

    JPanel iconsAndTitlePanel = new JPanel();
    FlowLayout flowLayout = (FlowLayout) iconsAndTitlePanel.getLayout();
    flowLayout.setAlignment(FlowLayout.LEFT);
    contentPane.add(iconsAndTitlePanel, BorderLayout.NORTH);

    JLabel iconLabel = new JLabel();
    iconsAndTitlePanel.add(iconLabel);
    iconLabel.setHorizontalAlignment(JLabel.CENTER);
    iconLabel.setIcon(new ImageIcon(iconPath));

    JLabel alertTitle = new JLabel(title);
    iconsAndTitlePanel.add(alertTitle);
    alertTitle.setFont(Constants.HEADING_FONT);
    alertTitle.setForeground(textColor);

    JLabel alertBody = new JLabel("<html>" + body + "</html>");
    alertBody.setFont(Constants.BASE_FONT);
    alertBody.setForeground(Constants.BODY_COLOR);
    contentPane.add(alertBody, BorderLayout.CENTER);

    JPanel actionButtonsContainer = new JPanel();
    contentPane.add(actionButtonsContainer, BorderLayout.SOUTH);
    actionButtonsContainer.setLayout(new FlowLayout(FlowLayout.CENTER, 5, 5));

    if (cancelable) {
      JButton cancelButton = new Button("Ok").build();
      cancelButton.addActionListener((e) -> {
        dispose();
      });
      actionButtonsContainer.add(cancelButton);
    }

    if (button != null) {
      actionButtonsContainer.add(button);
    }

    // Center the frame
    setLocationRelativeTo(null);
  }
}
