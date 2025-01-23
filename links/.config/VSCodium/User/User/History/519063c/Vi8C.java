package vues;

import java.awt.*;
import javax.swing.*;

public class BackgroundPanel extends JPanel {
  private static final long serialVersionUID = 1L;
  private Image backgroundImage;

  // Constructor that accepts an ImageIcon for the background image
  public BackgroundPanel(ImageIcon imageIcon) {
    this.backgroundImage = imageIcon.getImage();
  }

  // Override paintComponent to draw the background image
  @Override
  protected void paintComponent(Graphics g) {
    super.paintComponent(g); // Ensures the panel is properly rendered
    // Draw the background image, scaled to fit the panel size
    if (backgroundImage != null) {
      g.drawImage(backgroundImage, 0, 0, getWidth(), getHeight(), this);
    }
  }
}
