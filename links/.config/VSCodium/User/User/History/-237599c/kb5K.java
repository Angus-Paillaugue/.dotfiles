package modele;
import java.util.ArrayList;
import java.util.List;

public class Garage extends BienLouable {
    private List<Piece> pieces;

    //Constructeur
    public Garage(Adresse adresse, String refCadastrale, boolean bati, float montantDepotGarantie, String numeroFiscal,
			float taxeFonciere, Location location, Loyer loyer, Charges charges) {
		super(adresse, refCadastrale, bati, montantDepotGarantie, numeroFiscal, taxeFonciere, location, loyer, charges);
		this.pieces = new ArrayList<>();
	}

    //Getter de la liste de pièce
    public List<Piece> getPiece() {
		return this.pieces;
	}

    //Methode pour ajouter une pièce
	public void addPiece(Piece p) {
    	this.getPiece().add(p);
    }
	//renvoie la surface totale du garage
	@Override
	public float surfaceTotale() {
    	float total = 0F;
    	for(Piece p : this.getPiece()) {
    		total += p.surfaceTotalePiece();
    	}
    	return total;
    }

}
