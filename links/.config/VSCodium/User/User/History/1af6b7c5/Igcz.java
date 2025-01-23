package components;

import java.awt.BorderLayout;
import javax.swing.*;
import javax.swing.border.EmptyBorder;

import vues.Constants;

public class TextField {
  private JPanel panel;

  /**
   * Constructs a TextField component with an optional label, initial value, and icon.
   *
   * @param label the text to be displayed as a label on the left side of the text field, can be null
   * @param value the initial value to be set in the text field, can be null
   * @param iconName the name of the icon file to be displayed on the right side of the text field, can be null
   */
  public TextField(String label, String value, String iconName) {
    this.panel = new JPanel(new BorderLayout());
    this.panel.setBackground(null);

    if (label != null) {
      JLabel customLabel = new JLabel(label);
      this.panel.add(customLabel, BorderLayout.WEST);
    }
    JTextField field = new JTextField();
    if (value != null) {
      field.setText(value);
    }
    this.panel.add(field, BorderLayout.CENTER);

    if (iconName != null) {
      JLabel icon = new JLabel(new ImageIcon(Constants.ICONS_PATH + iconName));
      icon.setBorder(new EmptyBorder(0, 5, 0, 0));
      this.panel.add(icon, BorderLayout.EAST);
    }
  }

  /**
   * Constructs a TextField component with a label, a text field, and an optional icon.
   *
   * @param label the text to be displayed as the label on the left side of the text field;
   *              if null, no label will be added.
   * @param field the JTextField component to be added to the center of the panel.
   * @param iconName the name of the icon file to be displayed on the right side of the text field;
   *                 if null, no icon will be added.
   */
  public TextField(String label, JTextField field, String iconName) {
    this.panel = new JPanel(new BorderLayout());
    this.panel.setBackground(null);

    if (label != null) {
      JLabel customLabel = new JLabel(label);
      this.panel.add(customLabel, BorderLayout.WEST);
    }
    this.panel.add(field, BorderLayout.CENTER);

    if (iconName != null) {
      JLabel icon = new JLabel(new ImageIcon(Constants.ICONS_PATH + iconName));
      icon.setBorder(new EmptyBorder(0, 5, 0, 0));
      this.panel.add(icon, BorderLayout.EAST);
    }
  }

  public JPanel build() {
    return this.panel;
  }
}
