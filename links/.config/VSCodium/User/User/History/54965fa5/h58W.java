package vues.composants;

import javax.swing.JFormattedTextField;

public class IntegerTextField {

  private JFormattedTextField field;

  public IntegerTextField() {
    this.field = new JFormattedTextField();
      field.setName("numeroFiscal");
      field.addKeyListener(
          new KeyAdapter() {

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
      field.setText("");
  }
}
