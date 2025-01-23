from rembg import remove
from PIL import Image
import os

def removeBg(inputPath):
    # Get the file extension
    file_extension = os.path.splitext(inputPath)[1][1:].lower()

    # Check if the file extension is in the list of accepted file types
    if file_extension not in ['jpg', 'jpeg', 'png']:
        print(f"Warning: Unsupported file type '{file_extension}'. Supported file types are: jpg, jpeg, png.")

    try:
        originalImage = Image.open(inputPath)
        imageWithoutBg = remove(originalImage)

        # Create the output path by replacing the file extension with ".png"
        outputPath = os.path.splitext(inputPath)[0] + '.png'
        imageWithoutBg.save(outputPath)

        print("Background removed successfully.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    inputDirectory = './input'
    outputDirectory = './output'

    # Get a list of all image files in the input directory
    imageFiles = [f for f in os.listdir(mypath) if os.isfile(os.join(mypath, f))]

    # Loop through each image file
    for imageFile in imageFiles:
        try:
            # Remove the background of the image
            removeBg(imageFile)

            # Remove the original image if the function returns without an error
            os.remove(imageFile)

            print(f"Background removed : {imageFile}")
        except Exception as e:
            print(f"An error occurred: {e}")
