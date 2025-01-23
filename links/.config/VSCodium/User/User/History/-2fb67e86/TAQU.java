package ihm;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import jcdb.Connector;

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

		try {
			Connector db = Connector.getInstance();
			String query = "SELECT * FROM user WHERE email = ?";
			Map<String, Object> user = db.getFirst(query,
			Arrays.asList(email));
			db.closeConnection();
			if(user == null) {
				new ModalDanger("Identifiants invalides", "Les identifiants que vous avez entrés sont incorrect!", true)
						.setVisible(true);
			}
			if (password.equals(user.get("password"))) {
				Constants.genererProprio();
				// Credentials are correct
				new MyApartmentsVue(Constants.proprietaire).setVisible(true);
				this.vue.dispose();
			} else {
				new ModalDanger("Identifiants invalides", "Les identifiants que vous avez entrés sont incorrect!", true)
						.setVisible(true);
			}
	 } catch (SQLException ex) {
	   System.out.println("✗ "+ex.getMessage());
	 }

	}

}
