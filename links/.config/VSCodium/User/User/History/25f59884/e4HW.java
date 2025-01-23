package composents;

import javax.swing.JFileChooser;

public class FilePicker {

  /**
   * Opens a file picker dialog and returns the path of the selected file.
   *
   * @return the path of the selected file
   */
  public static String pickFile() {
    final JFileChooser fc = new JFileChooser();
    int returnVal = fc.showOpenDialog(null);
    if (returnVal == JFileChooser.APPROVE_OPTION) {
      return fc.getSelectedFile().getAbsolutePath();
    }

    return null;
  }
}
