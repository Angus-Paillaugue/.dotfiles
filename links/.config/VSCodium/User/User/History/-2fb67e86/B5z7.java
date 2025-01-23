package ihm;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class LogInController implements ActionListener {

	private LogInVue vue;


	public LogInController(LogInVue vue) {
		this.vue = vue;
	}

	public void actionPerformed(ActionEvent e) {
		String password = new String(this.vue.passwordField.getPassword());
		String email = this.vue.emailField.getText();
		if (email.equals("test") && password.equals("test")) {
			new MyApartmentsVue().setVisible(true);
			this.vue.dispose();
		} else {
			new ModalDanger("Mauvais mot de passe", "Le mot de passe que vous avez entré est incorrect!", true)
					.setVisible(true);
		}
	}

}
