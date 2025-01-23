package modele;

import java.util.ArrayList;
import java.util.List;

public class Garage extends BienLouable {
  private List<Piece> pieces;

  // Constructeur
  public Garage(
      Adresse adresse,
      String refCadastrale,
      boolean bati,
      float montantDepotGarantie,
      String numeroFiscal,
      float taxeFonciere,
      Loyer loyer,
      Charges charges) {
    super(
        adresse,
        refCadastrale,
        bati,
        montantDepotGarantie,
        numeroFiscal,
        taxeFonciere,
        loyer,
        charges);
    this.pieces = new ArrayList<>();
  }

  public List<Piece> getPiece() {
    return this.pieces;
  }

  public void addPiece(Piece p) {
    this.getPiece().add(p);
  }

  @Override
  public float surfaceTotale() {
    float total = 0F;
    for (Piece p : this.getPiece()) {
      total += p.surfaceTotalePiece();
    }

    return total;
  }
}
