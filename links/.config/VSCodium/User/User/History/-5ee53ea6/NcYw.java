package vues;

import modele.BienLouable;
import modele.Personne;

import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JSplitPane;
import javax.swing.JTextField;

import javax.swing.JLabel;
import javax.swing.BoxLayout;
import javax.swing.JButton;
import javax.swing.JPanel;
import java.awt.FlowLayout;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import java.awt.Component;
import vues.composants.*;
import javax.swing.SwingConstants;
public class EditAddress {

	private JFrame frame;
	private BienLouable bienLouable;
	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					EditAddress window = new EditAddress(Constants.logement2);
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}


	/**
	 * Create the application.
	 */
	public EditAddress(BienLouable _bienLouable) {
		bienLouable = _bienLouable;
		initialize();
	}

	public List<Personne> getToutesPersonnes()
	{
			List<Personne> locataires =
				Constants.proprietaire.getBatiment().stream()
					.map(_bat -> _bat.getBiensLouables())
					.flatMap(List::stream)
					.filter(_bien -> !_bien.isColocation())
					.map(_bien -> _bien.getLocation())
					.map(_loc -> _loc.getLocataires())
					.flatMap(List::stream)
					.collect(Collectors.toList());
			List<Personne> colocataires =
				Constants.proprietaire.getBatiment().stream()
					.map(_bat -> _bat.getBiensLouables())
					.flatMap(List::stream)
					.filter(_bien -> _bien.isColocation())
					.map(_bien -> _bien.getColocation())
					.map(_loc -> _loc.getColocataires())
					.flatMap(List::stream)
					.collect(Collectors.toList());
			return Stream.concat(locataires.stream(), colocataires.stream()).collect(Collectors.toList());

	}

	public void refreshTenants(JPanel locataires, JPanel colocataires)
	{
		locataires.removeAll();
		colocataires.removeAll();
		if(bienLouable.isColocation())
			for(Personne _coloc : bienLouable.getColocation().getColocatairesList())
			{
				JPanel _subcontainer = new JPanel();
				ComboList<Personne> _tenant = new ComboList<>(bienLouable.getColocation().getColocatairesList());
				_tenant.disable();
				_tenant.setSelectedItem(_coloc);

				LabeledComponent l_jtb = new LabeledComponent("Colocataire", _tenant);
				JButton _remove = new JButton("Supprimer");
				_remove.addActionListener(new ActionListener() {

					@Override
					public void actionPerformed(ActionEvent e) {
						bienLouable.getColocation().delColoc(_coloc);
						_subcontainer.removeAll();
						colocataires.remove(_subcontainer);
						colocataires.repaint();
					}
				});
				_subcontainer.add(l_jtb.build());
				_subcontainer.add(_remove);
				colocataires.add(_subcontainer);
			}
		else
			for(Personne _loc : bienLouable.getLocation().getLocataires())
			{
				JPanel _subcontainer = new JPanel();
				ComboList<Personne> _tenant = new ComboList<>(bienLouable.getLocation().getLocataires());
				_tenant.disable();
				_tenant.setSelectedItem(_loc);

				LabeledComponent l_if = new LabeledComponent("Locataire", _tenant);
				JButton _remove = new JButton("Supprimer");
				_remove.addActionListener(new ActionListener() {

					@Override
					public void actionPerformed(ActionEvent e) {
						bienLouable.getLocation().getLocataires().remove(_loc);
						_subcontainer.removeAll();
						locataires.remove(_subcontainer);
						locataires.repaint();
					}
				});

				_subcontainer.add(l_if.build());
				_subcontainer.add(_remove);
				locataires.add(_subcontainer);

				locataires.repaint();
				colocataires.repaint();

			}
	}
	// TODO: add the "add tenant" feature


	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setBounds(100, 100, 646, 394);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(new BoxLayout(frame.getContentPane(), BoxLayout.X_AXIS));

		JSplitPane splitPane = new JSplitPane();
		splitPane.setAlignmentY(Component.CENTER_ALIGNMENT);
		splitPane.setAlignmentX(Component.CENTER_ALIGNMENT);
		splitPane.setOrientation(JSplitPane.VERTICAL_SPLIT);
		frame.getContentPane().add(splitPane);

		JLabel pageTitle = new JLabel("Modifier les informations de " + bienLouable.getAdresse().toString());
		pageTitle.setFont(Constants.WINDOW_TITLE_FONT);
		splitPane.setLeftComponent(pageTitle);

		JPanel content = new JPanel();
		splitPane.setRightComponent(content);
		JTextField loyer = new JTextField();
		loyer.setAlignmentX(1);
		// change seulement le montant hors charge
		loyer.setText(bienLouable.getLoyer().getMontantHorsCharge() + "");
		LabeledComponent l_loyer = new LabeledComponent("loyer", loyer);
		JPanel jp_l_loyer = l_loyer.build();
		jp_l_loyer.setAlignmentX(1);
		content.add(jp_l_loyer);
		JPanel colocataires = new JPanel();
		FlowLayout flowLayout = (FlowLayout) colocataires.getLayout();
		flowLayout.setAlignment(FlowLayout.LEFT);
		JPanel locataires = new JPanel();
		FlowLayout flowLayout_1 = (FlowLayout) locataires.getLayout();
		flowLayout_1.setAlignment(FlowLayout.LEFT);
		content.setLayout(new BoxLayout(content, BoxLayout.Y_AXIS));
		refreshTenants(locataires, colocataires);
		content.add(colocataires);
		content.add(locataires);

		JButton addTenantBtn = new JButton("Ajouter locataire / colocataire");
		addTenantBtn.setHorizontalAlignment(SwingConstants.RIGHT);
		// panel to add tenants
		JPanel addTenantPanel = new JPanel();
		addTenantPanel.setAlignmentX(Component.RIGHT_ALIGNMENT);
		ComboList<Personne> persons = new ComboList<>(getToutesPersonnes());
		addTenantBtn.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				if(bienLouable.isColocation())
					bienLouable.getColocation().addColoc((Personne)persons.getSelectedItem(), null, null, null, 0);
				else
					bienLouable.getLocation().addLocataire((Personne)persons.getSelectedItem());
				refreshTenants(locataires, colocataires);
			}

		});
		addTenantPanel.add(persons);
		addTenantPanel.add(addTenantBtn);
		content.add(addTenantPanel);

		JButton save = new JButton("Enregistrer");
		addTenantPanel.add(save);
		save.setAlignmentY(Component.TOP_ALIGNMENT);
		save.setAlignmentX(Component.RIGHT_ALIGNMENT);
		save.addActionListener(new ActionListener() {

			@Override
			public void actionPerformed(ActionEvent e) {
				bienLouable.getLoyer().setMontantHorsCharge(Float.parseFloat(loyer.getText()));
				/* uncomment ça pour tester la mise à jour des valeurs en rouvrant la fenêtre en mode édition sur le
				 * même objet
				EditAddress _ea = new EditAddress(bienLouable);
				_ea.frame.setVisible(true);
				*/
				frame.dispose();
			}

		});
	}

}
