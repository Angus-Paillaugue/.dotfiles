package ihm;

import java.text.NumberFormat;

public class Formatters {

	public static String formatCurrency(double amount) {
    	NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(Constants.LOCALE);
    	String formattedString = currencyFormatter.format(amount);
    	return formattedString;
	}

}
