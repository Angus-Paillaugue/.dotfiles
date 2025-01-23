package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import vues.Constants;
import vues.GenererContractDeLocation;
import vues.MesAppartements;
import vues.MesDocuments;
import javax.swing.JComponent;
import composants.FilePicker;
import composants.ModalDanger;
import composants.ModalSuccess;
import modele.Loyer;
import modele.ModeDePaiment;
import utils.ParseCSV;

public class MesDocumentsControlleur implements ActionListener {
  private MesDocuments vue;

  public MesDocumentsControlleur(MesDocuments vue) {
    this.vue = vue;
  }

  public void actionPerformed(ActionEvent e) {
    JComponent target = (JComponent) e.getSource();

    if (target.getName() != null && target.getName().equals("cancelButton")) {
      // Cancel button clicked
      new MesAppartements(Constants.proprietaire).setVisible(true);
      this.vue.dispose();
    } else if (target.getName() != null && target.getName().equals("contractDeLocationButton")) {
      // Cancel button clicked
      new GenererContractDeLocation(Constants.proprietaire).setVisible(true);
      this.vue.dispose();
    }else if (target.getName() != null && target.getName().equals("importerLoyersButton")) {
			// Cancel button clicked
			String CSVPath = FilePicker.pickFile();
			if(CSVPath == null) {
				new ModalDanger("Erreur", "Veuillez sélectionner un fichier pour importer", true).setVisible(true);
				return;
			}
			List<String[]> csvData = ParseCSV.parseCSV(CSVPath);
			String[] columns = csvData.get(0);
			String[] columnsFormat =  new String[]{"idLogement", "idLocataire", "date", "montant", "provision"};
			if(!Arrays.equals(columns, columnsFormat)) {
				new ModalDanger("Erreur", "Le fichier CSV doit contenir les colonnes suivantes: "+ Arrays.toString(columnsFormat), true).setVisible(true);
				return;
			}
			List<String[]> values = csvData.subList(1, csvData.size());

			// TODO: Importer les loyers (values)
			for(String[] row: values) {
				System.out.println(Arrays.toString(row));
				new Loyer(Float.parseFloat(row[3]), 1, LocalDate.parse(row[2]), LocalDate.parse(row[2]), ModeDePaiment.CHEQUE);
			}
			new ModalSuccess("Succès", "Les loyers ont été importés avec succès", true).setVisible(true);
		}
  }
}
