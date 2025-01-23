package controleurs;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import vues.Constants;
import vues.GenererContractDeLocation;
import vues.GenererQuittanceDeLoyer;
import vues.MesAppartements;
import vues.MesDocuments;
import javax.swing.JComponent;
import vues.composants.FilePicker;
import vues.composants.ModalDanger;
import vues.composants.ModalSuccess;
import modele.Loyer;
import modele.ModeDePaiment;
import utils.VuesUtils;

public class MesDocumentsControlleur implements ActionListener {
  private MesDocuments vue;

  public MesDocumentsControlleur(MesDocuments vue) {
    this.vue = vue;
  }

  public void actionPerformed(ActionEvent e) {
    JComponent target = (JComponent) e.getSource();

    if (target.getName() != null && target.getName().equals("cancelButton")) {
      // Cancel button clicked
      new MesAppartements().setVisible(true);
      this.vue.dispose();
    } else if (target.getName() != null && target.getName().equals("contractDeLocationButton")) {
      // Cancel button clicked
      new GenererContractDeLocation(Constants.proprietaire).setVisible(true);
      this.vue.dispose();
    } else if (target.getName() != null && target.getName().equals("quittanceDeLoyerButton")) {
      // Cancel button clicked
      new GenererQuittanceDeLoyer(Constants.proprietaire).setVisible(true);
      this.vue.dispose();
    } else if (target.getName() != null && target.getName().equals("importerLoyersButton")) {
      // Cancel button clicked
      String CSVPath = FilePicker.pickFile();
      if (CSVPath == null) {
        new ModalDanger("Erreur", "Veuillez sélectionner un fichier pour importer", true)
            .setVisible(true);
        return;
      }

      try {
        List<String[]> csvData = parseCSV(CSVPath);
        String[] columns = csvData.get(0);
        String[] columnsFormat =
            new String[] {"idLogement", "idLocataire", "date", "montant", "provision"};
        if (!Arrays.equals(columns, columnsFormat)) {
          new ModalDanger(
                  "Erreur",
                  "Le fichier CSV doit contenir les colonnes suivantes: "
                      + Arrays.toString(columnsFormat),
                  true)
              .setVisible(true);
          return;
        }
        List<String[]> values = csvData.subList(1, csvData.size());

        for (String[] row : values) {
          LocalDate date =
              VuesUtils.toLocalDate("01/" + row[2].split("/")[0] + "/20" + row[2].split("/")[1]);
          Loyer loyer = new Loyer(Float.parseFloat(row[3]), 1, date, date, ModeDePaiment.CHEQUE);
          // TODO: Save loyer to database
          System.out.println(loyer.toString());
        }
        new ModalSuccess("Succès", "Les loyers ont été importés avec succès", true)
            .setVisible(true);
      } catch (Exception ex) {
        new ModalDanger("Erreur", ex.getMessage(), true).setVisible(true);
      }
    }
  }

  private static List<String[]> parseCSV(String filePath) {
    File file = new File(filePath);
    if (!file.exists() || !file.isFile() || !filePath.endsWith(".csv")) {
      throw new IllegalArgumentException("Le fichier n'existe pas ou n'est pas un fichier CSV");
    }

    List<String[]> data = new ArrayList<>();

    try (BufferedReader br = new BufferedReader(new FileReader(file))) {
      String line;
      while ((line = br.readLine()) != null) {
        String[] values = line.split(",");
        data.add(values);
      }
    } catch (IOException e) {
      e.printStackTrace();
    }

    return data;
  }
}
