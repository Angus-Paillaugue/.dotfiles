from rembg import remove
from PIL import Image
import os


inputDir = './input'
outputDir = './output'

# Create output directory if it doesn't exist
os.makedirs(outputDir, exist_ok=True)

# Loop through all files in the input directory
for filename in os.listdir(inputDir):
  # Check if the file is an image
  if filename.endswith('.jpg') or filename.endswith('.png'):
    # Construct the input and output paths
    inputPath = os.path.join(inputDir, filename)
    outputPath = os.path.join(outputDir, filename)

    # Open the input image
    inputImage = Image.open(inputPath)

    # Remove the background
    outputImage = remove(inputImage)

    # Save the output image
    outputImage.save(outputPath)

    # Delete the input image
    os.remove(inputPath)
