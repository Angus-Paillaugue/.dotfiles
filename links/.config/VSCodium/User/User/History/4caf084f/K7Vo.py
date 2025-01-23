from rembg import remove
from PIL import Image
import os


inputDir = './input'
outputDir = './output'

def isValidImage(file_name):
  try:
    with Image.open(file_name) as img:
      img.verify()
      return True
  except (IOError, SyntaxError):
    return False

# Create output directory if it doesn't exist
os.makedirs(outputDir, exist_ok=True)

# Loop through all files in the input directory
for filename in os.listdir(inputDir):
  # Check if the file is an image
  if isValidImage(os.path.join(inputDir, filename)) == False:
    # Construct the input and output paths
    inputPath = os.path.join(inputDir, filename)
    outputPath = os.path.join(outputDir, filename)

    # Open the input image
    inputImage = Image.open(inputPath)

    # Remove the background
    outputImage = remove(inputImage)

    # Save the output image
    outputImage.save(outputPath)
    print(f"Saved {outputPath}")

    # Delete the input image
    os.remove(inputPath)
