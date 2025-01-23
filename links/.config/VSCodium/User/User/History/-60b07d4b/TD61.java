package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import jdbc.Auth;
import jdbc.Connector;
import jdbc.SharedState;
import modele.Proprietaire;
import utils.Logger;
import vues.Constants;
import vues.SeConnecter;
import vues.composants.ModalDanger;
import vues.MesAppartements;
import dao.ProprietaireDAO;

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

    // Selecting the proprietaire based on the email
    ProprietaireDAO proprietaireDAO = new ProprietaireDAO();
    Proprietaire proprietaire = proprietaireDAO.findByMail(email);
    if (proprietaire == null) {
      new ModalDanger(
              "Identifiants invalides",
              "Les identifiants que vous avez entrés sont incorrect!",
              true)
          .setVisible(true);
      return;
    }

    // Checking password
    if (Auth.verifyPassword(password, proprietaire.getPasswordHash())) {
      SharedState.getInstance().setProprietaire(proprietaire);
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
  }

  private Boolean checkEmail(String email) {
    Pattern pattern =
        Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
    Matcher matcher = pattern.matcher(email);
    return matcher.matches();
  }
}
