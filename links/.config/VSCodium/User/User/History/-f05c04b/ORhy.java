package ihm;

import java.awt.*;
import java.awt.geom.RoundRectangle2D;
import java.awt.image.BufferedImage;
import javax.swing.ImageIcon;

public class CustomImage {

  private ImageIcon img;

  // Constructor that loads the image from a path
  public CustomImage(String src) {
    this.img = new ImageIcon(src);
  }

  /**
   * Resizes the current image to the specified width and height.
   *
   * @param w the new width of the image
   * @param h the new height of the image
   * @return the current instance of CustomImage with the resized image
   */
  public CustomImage resize(int w, int h) {
    Image image = this.img.getImage();
    Image newImg = image.getScaledInstance(w, h, java.awt.Image.SCALE_SMOOTH);
    this.img = new ImageIcon(newImg);
    return this;
  }

  /**
   * Rounds the corners of the image with the specified radius.
   *
   * @param radius the radius of the corners to be rounded
   * @return the CustomImage instance with rounded corners
   */
  public CustomImage round(int radius) {
    int w = img.getIconWidth();
    int h = img.getIconHeight();
    BufferedImage roundedImage = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);

    Graphics2D g2 = roundedImage.createGraphics();
    g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

    g2.setClip(new RoundRectangle2D.Float(0, 0, w, h, radius, radius));
    g2.drawImage(img.getImage(), 0, 0, w, h, null);
    g2.dispose();

    this.img = new ImageIcon(roundedImage);
    return this;
  }

  public ImageIcon build() {
    return this.img;
  }
}
