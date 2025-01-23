package composants;

import java.awt.Color;
import javax.swing.JButton;

import vues.Constants;

public class ModalSuccess extends Modal {
  private static final long serialVersionUID = 1L;

  /**
   * @param title - The heading text
   * @param body - The body text
   * @param cancelable - A boolean representing weather to add a cancel button to the modal
   */
  public ModalSuccess(String title, String body, Boolean cancelable) {
    super(
        new Color(22, 163, 74), title, body, Constants.ICONS_PATH + "badge-check.png", null, cancelable);
  }

  /**
   * @param title - The heading text
   * @param body - The body text
   * @param cancelable - A boolean representing weather to add a cancel button to the modal
   * @param confirmButtonText - The text inside the confirm button of the modal
   * @param btn - A JButton to add to the right to the cancel button
   */
  public ModalSuccess(
      String title, String body, Boolean cancelable, String confirmButtonText, JButton btn) {
    super(
        new Color(22, 163, 74),
        title,
        body,
        Constants.ICONS_PATH + "badge-check.png",
        btn,
        cancelable);
  }
}
