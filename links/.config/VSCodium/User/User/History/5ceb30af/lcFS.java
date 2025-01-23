package ihm;

import javax.swing.JButton;

public class ModalDanger extends Modal {

  private static final long serialVersionUID = 1L;

  /**
   * @param title      - The heading text
   * @param body       - The body text
   * @param cancelable - A boolean representing weather to add a cancel button to
   *                   the modal
   */
  public ModalDanger(String title, String body, Boolean cancelable) {
    super(Constants.ERROR_COLOR, title, body, Constants.ICONS_PATH + "circle-alert.png", null, cancelable);
  }

  /**
   * @param title             - The heading text
   * @param body              - The body text
   * @param cancelable        - A boolean representing weather to add a cancel
   *                          button to the modal
   * @param confirmButtonText - The text inside the confirm button of the modal
   * @param btn               - A JButton to add to the right to the cancel button
   */
  public ModalDanger(String title, String body, Boolean cancelable, String confirmButtonText, JButton btn) {
    super(Constants.ERROR_COLOR, title, body, Constants.ICONS_PATH + "circle-alert.png", btn, cancelable);
  }
}
