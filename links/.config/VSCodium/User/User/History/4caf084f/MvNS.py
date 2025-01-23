from rembg import remove
from PIL import Image



input = Image.open(inputPath)
output = remove(input)
output.save(outputPath)
