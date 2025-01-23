package vues;

import java.awt.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.swing.*;
import javax.swing.border.EmptyBorder;

import dao.ColocationDAO;
import dao.LocationDAO;
import dao.LogementDAO;
import modele.Colocation;
import modele.Location;
import modele.Logement;
import modele.Personne;
import vues.composants.Button;

public class ArchivesOccupants extends JFrame {
  private static final long serialVersionUID = 1L;

  private Logement logement;

  private Map<Location, Personne> GetAllOldTenants()
  {
	  Map<Location, Personne> tenants = new HashMap<>();
	  if(logement == null)
		  return null;
	  LogementDAO ldao = new LogementDAO();
	  LocationDAO locdao = new LocationDAO();
	  ColocationDAO coldao = new ColocationDAO();
	  Logement _log = ldao.find(logement.getId());
	  Location _loc = locdao.findByLogementArchive(_log);
	  Colocation _col = coldao.findByLogementArchive(_log);
	  List<Personne>
	  	locataires = locdao.findLocatairesArchive(_log);
	  if(_col != null)
	  {
		  List<Personne> colocataires = _col.getColocataires();
		  if(colocataires != null)
		  {
			  // TODO: change that
			  for(Personne p : colocataires)
				  tenants.put(_col.getContrats().get(0), p);
		  }
	  }
	  if(locataires != null)
		  for(Personne p : locataires)
			  if(_loc.getLocataires().contains(p))
				  tenants.put(_loc, p);
	  return tenants;
  }

  public ArchivesOccupants(Logement logement) {
    this.logement = logement;
    setTitle("Anciens occupants");
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    setSize(800, 500); // Adjust the size as needed
    setLayout(new BorderLayout(10, 10));
    setLocationRelativeTo(null); // Center the frame
    // TODO: test if the display is working
    JPanel tenantsPanel = new JPanel();
    Map<Location, Personne> tenants = GetAllOldTenants();
    if(tenants != null && tenants.size() > 0 || tenants == null)
	    for(Map.Entry<Location, Personne> pair : tenants.entrySet())
	    	tenantsPanel.add(createLocatairePanel(pair.getValue(), pair.getKey()));
    else
    	tenantsPanel.add(new JLabel("Pas d'ancien occupant pour ce logement."));

    JPanel bottomPanel = new JPanel(new BorderLayout());
    bottomPanel.setBorder(new EmptyBorder(10, 10, 10, 10));

    JButton retourButton = new Button("Retour").build();
    retourButton.setName("retourButton");
    retourButton.addActionListener(e -> {
    	dispose();
    });

    add(tenantsPanel);
    tenantsPanel.add(bottomPanel);
    setVisible(true);
  }

  // Helper method to create a tenant panel
  private JPanel createLocatairePanel(Personne p, Location l) {
    JPanel locatairePanel = new JPanel();
    locatairePanel.setLayout(new BoxLayout(locatairePanel, BoxLayout.Y_AXIS));

    JLabel locataireLabel = new JLabel(p.getNom() + " " + p.getPrenom());
    locataireLabel.setFont(Constants.BASE_FONT);
    locataireLabel.setForeground(Constants.BODY_COLOR);
    locatairePanel.add(locataireLabel);

    locatairePanel.add(Box.createRigidArea(new Dimension(0, 10)));

    JButton moreInfoButton = new Button("Plus d'infos").build();
    moreInfoButton.addActionListener(
        e -> {
          new ProfilLocataire(p, l, false, this.logement.isColocation()).setVisible(true);
        });
    locatairePanel.add(moreInfoButton);

    locatairePanel.setBorder(
        BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(Color.LIGHT_GRAY, 1),
            BorderFactory.createEmptyBorder(5, 5, 5, 5)));
    return locatairePanel;
  }

  public Logement getLogement() {
    return this.logement;
  }
}
