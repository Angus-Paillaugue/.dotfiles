import static org.junit.Assert.*;
import org.junit.Test;
import java.text.NumberFormat;
import java.util.Locale;
import utils.Formatters;

public class FormattersTests {

	@Test
	public void testFormatCurrency() {
		double amount = 1234.56;
		Locale locale = Locale.US;
		NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(locale);
		String expected = currencyFormatter.format(amount);

		// Assuming Constants.LOCALE is set to Locale.US for this test
		Constants.LOCALE = Locale.US;
		String result = Formatters.formatCurrency(amount);

		assertEquals(expected, result);
	}

	@Test
	public void testFormatCurrencyWithDifferentLocale() {
		double amount = 1234.56;
		Locale locale = Locale.FRANCE;
		NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(locale);
		String expected = currencyFormatter.format(amount);

		// Assuming Constants.LOCALE is set to Locale.FRANCE for this test
		Constants.LOCALE = Locale.FRANCE;
		String result = Formatters.formatCurrency(amount);

		assertEquals(expected, result);
	}
}
