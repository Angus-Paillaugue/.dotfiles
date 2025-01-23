package ihm;

import java.util.Date;

import javax.swing.ImageIcon;
import javax.swing.JFormattedTextField;
import javax.swing.JLabel;
import javax.swing.border.EmptyBorder;

public class TextField {
this.panel = new JPanel(new BorderLayout());
    	this.panel.setBackground(null);
    	this.dateFormat = new SimpleDateFormat("dd/MM/yyyy", Constants.LOCALE);
    	try {
    		this.initialValue = dateFormat.parse(value);
    	} catch (ParseException e) {
    		this.initialValue = new Date();
    		e.printStackTrace();
    	}
    	JFormattedTextField field = new JFormattedTextField(this.dateFormat);
        field.setValue(this.initialValue);

        // Add key listener to restrict input to digits and '/'
        field.addKeyListener(new KeyAdapter() {
            @Override
            public void keyTyped(KeyEvent e) {
                char c = e.getKeyChar();
                if (!Character.isDigit(c) && c != '/' && c != KeyEvent.VK_BACK_SPACE && c != KeyEvent.VK_DELETE) {
                    e.consume();
                }
            }
        });

        // Add focus listener to validate date on focus lost
        field.addFocusListener(new FocusAdapter() {
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
