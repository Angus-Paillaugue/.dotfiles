package ihm;

import java.awt.Color;
import java.awt.Font;
import java.time.LocalDate;
import java.util.Locale;
import javax.swing.border.LineBorder;

import modele.*;


public class Constants {

	public static final Color PRIMARY_COLOR = new Color(20, 83, 45);
	public static final Color BORDER_COLOR = new Color(82, 82, 82);
	public static final Color HEADING_COLOR = new Color(38, 38, 38);
	public static final Color BODY_COLOR = new Color(82, 82, 82);
	public static final Color ERROR_COLOR = new Color(220, 38, 38);
	public static final Color WHITE_COLOR = new Color(255, 255, 255);
	public static final Color WINDOW_BG_COLOR = new Color(255, 255, 255);

	public static final LineBorder BORDER = new LineBorder(Constants.BODY_COLOR, 1);

	public static final Font SMALL_FONT = new Font("Arial", Font.BOLD, 12);
	public static final Font BASE_FONT = new Font("Arial", Font.BOLD, 14);
	public static final Font HEADING_FONT = new Font("Arial", Font.BOLD, 20);
	public static final Font WINDOW_TITLE_FONT = new Font("Arial", Font.BOLD, 30);

	public static final int BR_FULL = 9999;
	public static final int BR_SM = 10;
	public static final int BR_MD = 15;
	public static final int BR_LG = 20;

	public static final String ICONS_PATH = "src/main/resources/icons/";

	public static final Locale LOCALE = Locale.FRANCE;

	/////////// constante de test ////////////////////////

	public static Adresse adresseProprietaire = new Adresse("8", "Avenue de rangueil", "Toulouse", "31400");
	public static Proprietaire proprietaire = new Proprietaire("Thierry", "Millan", adresseProprietaire, "tm@univ-tlse3.fr", "0606060606");

	public static Adresse adresseLogement1 = new Adresse("10", "Rue de rangueil", "APT 13" , "Paris", "75001");
	public static Adresse adresseBatiment1 = new Adresse("10", "Rue de rangueil", "Paris", "75001");
	public static Loyer loyer1 = new Loyer(750.0F, 5, LocalDate.of(2024, 8, 11), LocalDate.of(2025, 9, 11), ModeDePaiment.CB);
	public static Personne locataire1 = new Personne("Jean", "Dupont", "
	public static Location location1 = new Location();
	public static Logement logement1 = new Logement(adresseLogement1, "12345678AB", true, 1250.0F, "123456789012", 950.0F, (Location)null, loyer1, null, "Droite", LocalDate.of(2018, 1, 1), LocalDate.of(2019, 2, 2), "/chemin/constatAmiante.pdf", "/chemin/constatPlomb.pdf", "/chemin/constatElec.pdf", noteEnergetique.A, noteEnergetique.C, "Ref logement", true, "Equipement fibre...");
	public static Batiment batiment1 = new Batiment(TypeDeBatiment.IMMEUBLE ,adresseBatiment1);

	public static void genererProprio() {
		Constants.batiment1.getBiensLouables().add(logement1);
		Constants.proprietaire.getBatiment().add(batiment1);
	}

	//////////////////////////////////////////////////////
}
