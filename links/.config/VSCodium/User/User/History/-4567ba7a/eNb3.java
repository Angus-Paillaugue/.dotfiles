package modele;

public class Adresse {

	private String numero;
	private String rue;
	private String complement;
	private String ville;
	private String cp;

	public Adresse(String numero, String rue, String ville, String cp) {
		this.numero = numero;
		this.rue = rue;
		this.complement = "";
		this.ville = ville;
		this.cp = cp;
	}

	// Constructeur avec un complement d'adresse
	public Adresse(String numero, String rue, String complement, String ville, String cp) {
		this.numero = numero;
		this.rue = rue;
		this.complement = complement;
		this.ville = ville;
		this.cp = cp;
	}

	// Getter de l'attribut numero
	public String getNumero() {
		return this.numero;
	}

	// Getter de l'attribut rue
	public String getRue() {
		return this.rue;
	}

	// Getter de l'attribut complement
	public String getComplement() {
		return this.complement;
	}

	// Getter de l'attribut ville
	public String getVille() {
		return this.ville;
	}

	// Getter de l'attribut cp
	public String getCp() {
		return this.cp;
	}

	@Override
	public String toString() {
		return this.getNumero() + " " + this.getRue() + " " + this.getComplement() + " " + this.getVille() + " "
				+ this.getCp();
	}

}
