import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import java.time.LocalDate;
import javax.swing.JComboBox;
import javax.swing.JPanel;
import javax.swing.JTextField;
import org.junit.Before;
import org.junit.Test;

import utils.VuesUtils;

public class VueUtilsTests {

	private JPanel panel;

	@Before
	public void setUp() {
		panel = new JPanel();
		JTextField textField = new JTextField();
		textField.setName("testField");
		textField.setText("testValue");
		panel.add(textField);

		JComboBox<String> comboBox = new JComboBox<>(new String[] { "Option1", "Option2" });
		comboBox.setName("testComboBox");
		comboBox.setSelectedIndex(1);
		panel.add(comboBox);
	}

	@Test
	public void testGetInputValue() {
		String value = VuesUtils.getInputValue(panel, "testField");
		assertEquals("testValue", value);
	}

	@Test
	public void testGetInputValueIndex() {
		Integer index = VuesUtils.getInputValueIndex(panel, "testComboBox");
		assertEquals(Integer.valueOf(1), index);
	}

	@Test
	public void testToInt() {
		Integer intValue = VuesUtils.toInt("123");
		assertEquals(Integer.valueOf(123), intValue);

		intValue = VuesUtils.toInt("abc");
		assertNull(intValue);
	}

	@Test
	public void testToFloat() {
		Float floatValue = VuesUtils.toFloat("123.45");
		assertEquals(Float.valueOf(123.45f), floatValue);

		floatValue = VuesUtils.toFloat("abc");
		assertNull(floatValue);
	}

	@Test
	public void testToLocalDate() {
		LocalDate date = VuesUtils.toLocalDate("01/01/2020");
		assertEquals(LocalDate.of(2020, 1, 1), date);

		date = VuesUtils.toLocalDate("invalid date");
		assertNull(date);
	}
}
