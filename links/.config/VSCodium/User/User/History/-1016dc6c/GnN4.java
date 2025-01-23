package ihm;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.BorderLayout;

public class MoneyTextField {
  private JPanel panel;

  public MoneyTextField(String label) {
    this.panel = new JPanel(new BorderLayout());
    this.panel.setBackground(null);

    JLabel customLabel = new JLabel(label);
    this.panel.add(customLabel, BorderLayout.WEST);
    JFormattedTextField field = new JFormattedTextField();
    this.panel.add(field, BorderLayout.CENTER);
    field.addKeyListener(new KeyAdapter() {
      @Override
      public void keyTyped(KeyEvent e) {
        char c = e.getKeyChar();
        String inputValue = field.getText();
        if (!Character.isDigit(c) && c != KeyEvent.VK_BACK_SPACE && c != KeyEvent.VK_DELETE) {
          e.consume();
        }

        if (inputValue.length() >= 12) {
          e.consume();
        }
      }
    });
    field.setText("0");

    JLabel icon = new JLabel(new ImageIcon(Constants.ICONS_PATH + "euro-16x16-body.png"));
    icon.setBorder(new EmptyBorder(0, 5, 0, 0));
    this.panel.add(icon, BorderLayout.EAST);
  }

  public JPanel build() {
    return this.panel;
  }
}
