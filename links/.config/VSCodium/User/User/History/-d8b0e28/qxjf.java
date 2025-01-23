package composants;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.event.FocusAdapter;
import java.awt.event.FocusEvent;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.text.*;
import java.util.Date;
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import utils.Logger;
import vues.Constants;

public class SimpleDateField {
  private JPanel panel;
  private DateFormat dateFormat;
  private Date initialValue;

  /**
   * A custom date input field component that allows users to enter and validate dates. The date
   * format used is "dd/MM/yyyy".
   *
   * <p>This component consists of a formatted text field for date input and an icon. It restricts
   * input to digits and '/' characters, and validates the date format when the field loses focus.
   * If the date is invalid, the background color of the field changes to indicate an error.
   *
   * @param value the initial date value as a string in the format "dd/MM/yyyy". If the value is
   *     null or invalid, the current date is used.
   */
  public SimpleDateField(String value, String name) {
    this.panel = new JPanel(new BorderLayout());
    this.panel.setBackground(null);
    this.dateFormat = new SimpleDateFormat("MM/yyyy", Constants.LOCALE);
    if (this.initialValue == null) {
      this.initialValue = new Date();
    } else {
      try {
        this.initialValue = dateFormat.parse(value);
      } catch (ParseException e) {
        this.initialValue = new Date();
        Logger.error("La date " + value + " est invalide!");
      }
    }
    JFormattedTextField field = new JFormattedTextField(this.dateFormat);
    field.setValue(this.initialValue);
    field.setName(name);

    // Add key listener to restrict input to digits and '/'
    field.addKeyListener(
        new KeyAdapter() {

          @Override
          public void keyTyped(KeyEvent e) {
            char c = e.getKeyChar();
            if (!Character.isDigit(c)
                && c != '/'
                && c != KeyEvent.VK_BACK_SPACE
                && c != KeyEvent.VK_DELETE) {
              e.consume();
            }
          }
        });

    // Add focus listener to validate date on focus lost
    field.addFocusListener(
        new FocusAdapter() {

          @Override
          public void focusLost(FocusEvent e) {
            String text = field.getText();
            try {
              Date date = dateFormat.parse(text);
              field.setValue(date); // Format the field correctly if valid
              field.setBackground(null);
            } catch (ParseException ex) {
              field.setBackground(new Color(220, 38, 38, 50));
            }
          }
        });

    this.panel.add(field, BorderLayout.CENTER);

    JLabel icon = new JLabel(new ImageIcon(Constants.ICONS_PATH + "calendar-16x16-body.png"));
    icon.setBorder(new EmptyBorder(0, 5, 0, 0));
    this.panel.add(icon, BorderLayout.EAST);
  }

  public JPanel build() {
    return this.panel;
  }
}
