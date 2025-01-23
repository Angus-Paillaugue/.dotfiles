package modele;

import java.util.LinkedList;
import java.util.List;

public class Garage extends BienLouable {
  private List<Piece> pieces;

  // Constructeur
  public Garage(
      Adresse adresse,
      float surfaceHabitable,
      float surfaceTotale,
      String refCadastrale,
      boolean bati,
      String numeroFiscal,
      float taxeFonciere,
      Loyer loyer,
      Charges charges) {
    super(
        adresse,
        surfaceHabitable,
        surfaceTotale,
        refCadastrale,
        bati,
        numeroFiscal,
        taxeFonciere,
        loyer,
        charges);
    this.pieces = new LinkedList<>();
  }

  public List<Piece> getPiece() {
    return this.pieces;
  }

  public void addPiece(Piece piece) {
    this.getPiece().add(piece);
  }
}
