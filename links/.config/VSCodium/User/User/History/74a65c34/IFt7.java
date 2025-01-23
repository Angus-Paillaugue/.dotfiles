package components;

import java.awt.Color;
import javax.swing.JLabel;
import javax.swing.border.EmptyBorder;
import modele.noteEnergetique;
import vues.Constants;

public class EnumReports {
  private static Color[] colors = {
    new Color(25, 109, 25),
    new Color(96, 153, 70),
    new Color(144, 179, 61),
    new Color(254, 219, 45),
    new Color(250, 183, 40),
    new Color(243, 132, 36),
    new Color(234, 27, 42)
  };

  /**
   * Creates and returns a JLabel component representing the given noteEnergetique. The label is
   * styled with a background color, font, and border based on the note.
   *
   * @param note the noteEnergetique to be represented by the JLabel
   * @return a JLabel component styled to represent the given noteEnergetique
   */
  public static JLabel reportComponent(noteEnergetique note) {
    final int index = note.ordinal();
    final Color color = colors[index];
    JLabel label = new JLabel(note.toString());
    label.setBackground(color);
    label.setFont(Constants.BASE_FONT);
    label.setForeground(Constants.WHITE_COLOR);
    label.setBorder(new EmptyBorder(0, 10, 0, 10));
    label.setOpaque(true);
    return label;
  }
}
