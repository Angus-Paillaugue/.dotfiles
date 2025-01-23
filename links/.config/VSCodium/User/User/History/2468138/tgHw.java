
public class ObjetGraphique {

	private double coordX;
	private double coordY;

	public ObjetGraphique(double x, double y) {
		this.coordX = x;
		this.coordY = y;
	}

	public void translater(double dx, double dy) {
		this.coordX += dx;
		this.coordY += dy;
	}

	public String toString() {
		return "ObjetGraphique [coordX=" + coordX + ", coordY=" + coordY + "]";
	}

	protected Object clone() throws CloneNotSupportedException {
		return super.clone();
	}

}
