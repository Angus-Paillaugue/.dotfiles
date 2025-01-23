package ihm;

import java.text.NumberFormat;

public class Formatters {

	/**
	 * Formats the given amount as a currency string based on the locale specified
	 * in Constants.LOCALE.
	 *
	 * @param amount the amount of money to be formatted
	 * @return a string representing the formatted currency
	 */
	public static String formatCurrency(double amount) {
		NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(Constants.LOCALE);
		String formattedString = currencyFormatter.format(amount);
		return formattedString;
	}

}
