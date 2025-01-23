package modele;

public class Piece {

	private String designation;
	private int etage;
	private float surfaceHabitable;
	private float surfaceNonHabitable;

	public Piece(String designation, int etage, float surfaceHabitable, float surfaceNonHabitable) {
		super();
		this.designation = designation;
		this.etage = etage;
		this.surfaceHabitable = surfaceHabitable;
		this.surfaceNonHabitable = surfaceNonHabitable;
	}

	public String getDesignation() {
		return this.designation;
	}

	public int getEtage() {
		return this.etage;
	}

	public float getSurfaceHabitable() {
		return this.surfaceHabitable;
	}

	public float getSurfaceNonHabitable() {
		return this.surfaceNonHabitable;
	}

	public float surfaceTotalePiece() {
		return this.getSurfaceHabitable() + this.getSurfaceNonHabitable();
    }

}
