package controleur;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import composants.ModalDanger;
import jcdb.Auth;
import jcdb.Connector;
import utils.Logger;
import vues.Constants;
import vues.SeConnecter;
import vues.MesAppartements;

public class SeConnecterControleur implements ActionListener {
  private SeConnecter vue;

  public SeConnecterControleur(SeConnecter vue) {
    this.vue = vue;
  }

  public void actionPerformed(ActionEvent e) {
    String password = new String(this.vue.passwordField.getPassword());
    String email = this.vue.emailField.getText();

    // Email checking
    if (!checkEmail(email)) {
      // Email is not in the right format
      new ModalDanger(
              "Email incorrect", "L'email que vous avez renseigné n'a pas un format correct!", true)
          .setVisible(true);
      return;
    }

    try {
      // Selecting the proprietaire based on the email
      Connector db = Connector.getInstance();
      String query = "SELECT * FROM proprietaire WHERE email = ?";
      Map<String, Object> proprietaire = db.getFirst(query, Arrays.asList(email));
      db.closeConnection();
      if (proprietaire == null) {
        new ModalDanger(
                "Identifiants invalides",
                "Les identifiants que vous avez entrés sont incorrect!",
                true)
            .setVisible(true);
        return;
      }

      // Checking password
      if (Auth.verifyPassword(password, proprietaire.get("password").toString())) {
        Constants.genererProprio();
        // Credentials are correct
        new MesAppartements(Constants.proprietaire).setVisible(true);
        this.vue.dispose();
      } else {
        new ModalDanger(
                "Identifiants invalides",
                "Les identifiants que vous avez entrés sont incorrect!",
                true)
            .setVisible(true);
      }
    } catch (SQLException ex) {
      Logger.error(ex);
    }
  }

  private Boolean checkEmail(String email) {
   Pattern pattern =
        Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
    Matcher matcher = pattern.matcher(email);
    return matcher.matches();
  }
}
