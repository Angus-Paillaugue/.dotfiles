package modele;

import java.util.ArrayList;
import java.time.LocalDate;
import java.util.List;

public class Logement extends BienLouable {

	private String typePorte;
	private LocalDate datePermisConstruction;
	private LocalDate dateConstruction;
	private String constatAmiante;
	private String constatPlomb;
	private String constatElectricite;
	private noteEnergetique constatEnergetique;
	private noteEnergetique emissionGazEffetDeSerre;
	private String referenceLogement;
	private boolean meuble;
	private String equipementAccesTechnologie;
	private List<Piece> piece;
	private List<ElementEquipementLogement> elementEquipementLogement;
	private List<Garage> garage;

	public Logement(Adresse adresse, String refCadastrale, boolean bati, float montantDepotGarantie, String numeroFiscal,
			float taxeFonciere, Location location, Loyer loyer, Charges charges, String typePorte, LocalDate datePermisConstruction, LocalDate dateConstruction, String constatAmiante,
			String constantPlomb, String constatElectricite, noteEnergetique constatEnergetique,
			noteEnergetique emissionGazEffetDeSerre, String referenceLogement, boolean meuble,
			String equipementAccesTechnologie) {
		super(adresse, refCadastrale, bati, montantDepotGarantie, numeroFiscal, taxeFonciere, location, loyer, charges);
		this.typePorte = typePorte;
		this.datePermisConstruction = datePermisConstruction;
		this.dateConstruction = dateConstruction;
		this.constatAmiante = constatAmiante;
		this.constatPlomb = constatPlomb;
		this.constatElectricite = constatElectricite;
		this.constatEnergetique = constatEnergetique;
		this.emissionGazEffetDeSerre = emissionGazEffetDeSerre;
		this.referenceLogement = referenceLogement;
		this.meuble = meuble;
		this.equipementAccesTechnologie = equipementAccesTechnologie;
		this.piece = new ArrayList<>();
		this.elementEquipementLogement = new ArrayList<>();
		this.garage = new ArrayList<>();
	}

	public Logement(Adresse adresse, String refCadastrale, boolean bati, float montantDepotGarantie, String numeroFiscal,
			float taxeFonciere, Colocation colocation, Loyer loyer, Charges charges, String typePorte, LocalDate datePermisConstruction, LocalDate dateConstruction, String constatAmiante,
			String constatPlomb, String constatElectricite, noteEnergetique constatEnergetique,
			noteEnergetique emissionGazEffetDeSerre, String referenceLogement, boolean meuble,
			String equipementAccesTechnologie) {
		super(adresse, refCadastrale, bati, montantDepotGarantie, numeroFiscal, taxeFonciere, colocation, loyer, charges);
		this.typePorte = typePorte;
		this.datePermisConstruction = datePermisConstruction;
		this.dateConstruction = dateConstruction;
		this.constatAmiante = constatAmiante;
		this.constatPlomb = constatPlomb;
		this.constatElectricite = constatElectricite;
		this.constatEnergetique = constatEnergetique;
		this.emissionGazEffetDeSerre = emissionGazEffetDeSerre;
		this.referenceLogement = referenceLogement;
		this.meuble = meuble;
		this.equipementAccesTechnologie = equipementAccesTechnologie;
		this.piece = new ArrayList<>();
		this.elementEquipementLogement = new ArrayList<>();
		this.garage = new ArrayList<>();
	}

	public String getTypePorte() {
		return typePorte;
	}

	public LocalDate getDatePermisConstruction() {
		return datePermisConstruction;
	}

	public LocalDate getDateConstruction() {
		return dateConstruction;
	}

	public String getConstatAmiante() {
		return constatAmiante;
	}

	public String getConstantPlomb() {
		return constantPlomb;
	}

	public String getConstatElectricite() {
		return constatElectricite;
	}

	public noteEnergetique getConstatEnergetique() {
		return constatEnergetique;
	}

	public noteEnergetique getEmissionGazEffetDeSerre() {
		return emissionGazEffetDeSerre;
	}

	public String getReferenceLogement() {
		return referenceLogement;
	}

	public boolean isMeuble() {
		return meuble;
	}

	public String getEquipementAccesTechnologie() {
		return equipementAccesTechnologie;
	}

	public List<Piece> getPieces() {
		return piece;
	}

	public List<ElementEquipementLogement> getElementEquipementLogement() {
		return elementEquipementLogement;
	}

	public List<Garage> getGarage() {
		return garage;
	}

	// return la surface habitable totale du logement (un garage n'a pas de surface
	// habitable)
	public float surfaceTotaleHabitable() {
		float total = 0F;
		for (Piece p : this.getPieces()) {
			total += p.getSurfaceHabitable();
		}
		return total;
	}

	// return la surface habitable totale du logement (un garage n'a pas de surface
	// habitable)
	public float surfaceTotaleNonHabitable() {
		float total = 0F;
		for (Piece p : this.getPieces()) {
			total += p.getSurfaceNonHabitable();
		}
		for (Garage g : this.getGarage()) {
			total += g.surfaceTotale();
		}
		return total;
	}

	// return la surface totale du logement
	@Override
	public float surfaceTotale() {
		float total = 0F;
		total += this.surfaceTotaleHabitable() + this.surfaceTotaleNonHabitable();
		return total;
	}

}
