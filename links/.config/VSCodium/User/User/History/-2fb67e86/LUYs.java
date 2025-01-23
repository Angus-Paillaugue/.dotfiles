package ihm;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LogInController implements ActionListener {

	private LogInVue vue;

	public LogInController(LogInVue vue) {
		this.vue = vue;
	}

	public void actionPerformed(ActionEvent e) {
		String password = new String(this.vue.passwordField.getPassword());
		String email = this.vue.emailField.getText();
		Pattern pattern = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
		Matcher matcher = pattern.matcher(email);
		if (!matcher.matches()) {
			// Email is not in the right format
			new ModalDanger("Email incorrect", "L'email que vous avez renseigné n'a pas un format correct!", true)
					.setVisible(true);
			return;
		}

		Co

		if (email.equals("test@test.fr") && password.equals("test")) {
			Constants.genererProprio();
			// Credentials are correct
			new MyApartmentsVue(Constants.proprietaire).setVisible(true);
			this.vue.dispose();
		} else {
			new ModalDanger("Identifiants invalides", "Les identifiants que vous avez entrés sont incorrect!", true)
					.setVisible(true);
		}
	}

}
