package utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class ParseCSV {
	public static List<String[]> parseCSV(String filePath) {
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
