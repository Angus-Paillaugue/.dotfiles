package vues.composants;

import javax.swing.JFormattedTextField;

public class IntegerTextField {
  JFormattedTextField formattedTextField = new JFormattedTextField();
    formattedTextField.setName("numeroFiscal");
    formattedTextField.addKeyListener(
        new KeyAdapter() {

          @Override
          public void keyTyped(KeyEvent e) {
            char c = e.getKeyChar();
            String inputValue = formattedTextField.getText();
            if (!Character.isDigit(c) && c != KeyEvent.VK_BACK_SPACE && c != KeyEvent.VK_DELETE) {
              e.consume();
            }

            if (inputValue.length() >= 12) {
              e.consume();
            }
          }
        });
    formattedTextField.setText("");
}
