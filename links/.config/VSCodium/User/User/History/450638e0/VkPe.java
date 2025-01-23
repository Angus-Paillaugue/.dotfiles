package vues.composants;
import java.util.List;

import javax.swing.JComboBox;

public class ComboList<E> extends JComboBox<Object>
{
	private static final long serialVersionUID = 3697856998321909337L;
	List<E> options;

	public ComboList(List<E> _options)
	{
		options = _options;
		for(E _o : _options)
			addItem(_o);
	}
}
