package utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class ParseCSV {
	public static String[][] parseCSV(String filePath) {
		File file = new File(filePath);
		if (!file.exists() || !file.isFile() || !filePath.endsWith(".csv")) {
			throw new IllegalArgumentException("Le fichier n'existe pas ou n'est pas un fichier CSV");
		}

		List<String[]> data = new ArrayList<>();
		String[] columns = null;

		try (BufferedReader br = new BufferedReader(new FileReader(file))) {
			String line;
			boolean isFirstLine = true;
			while ((line = br.readLine()) != null) {
				String[] values = line.split(",");
				if (isFirstLine) {
					columns = values;
					isFirstLine = false;
				} else {
					data.add(values);
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}

		String[][] result = new String[2][columns.length];
		result[0] = columns;
		System.out.println(data);

		result[1] = Arrays.asList(data).toArray(new String[0]);

		return result;
	}
}
