import matplotlib.pyplot as plt
import numpy as np

mu = 100 # moyenne
sigma = 50 # ´ecart-type
x = mu + sigma * np.random.randn(1000)
num_bins = 50
plt.hist(x, num_bins, density=True)
plt.xlabel('Valeur')
plt.ylabel('Probabilite')
plt.title("Histogramme d'une loi gaussienne : μ = 100, σ = 15")
plt.show()
