
public class ObjetGraphique implements Cloneable {

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

	@Override
	public boolean equals(Object arg0) {
		if (arg0 == null) {
			return false;
		}
		if (arg0 == this) {
			return true;
		}
		if (arg0.getClass() != this.getClass()) {
			return false;
		}
		ObjetGraphique obj = (ObjetGraphique) arg0;
		return this.coordX == obj.coordX && this.coordY == obj.coordY;
	}

}
