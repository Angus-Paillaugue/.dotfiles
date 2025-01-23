from rembg import remove
from PIL import Image
import os
import glob

if __name__ == "__main__":
    inputDirectory = './input'
    outputDirectory = './output'

    # Get a list of all image files in the input directory
    imageFiles = glob.glob(f"{inputDirectory}/*.jpg") + glob.glob(f"{inputDirectory}/*.jpeg") + glob.glob(f"{inputDirectory}/*.png")

    # Loop through each image file
    for imageFile in imageFiles:
        try:
            # Remove the background of the image
            removebg(imageFile)

            # Remove the original image if the function returns without an error
            os.remove(imageFile)

            # Move the output image to the output directory
            outputImageFile = os.path.join(outputDirectory, os.path.basename(imageFile))
            os.rename(imageFile.replace('.jpg', '.png').replace('.jpeg', '.png'), outputImageFile)

            print(f"Background removed and original image removed: {imageFile}")
        except Exception as e:
            print(f"An error occurred: {e}")
