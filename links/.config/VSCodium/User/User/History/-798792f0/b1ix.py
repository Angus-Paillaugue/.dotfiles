import matplotlib.pyplot as plt
import numpy as np

mu = 100 # moyenne
sigma = 15 # ´ecart-type
x = mu + sigma * np.random.randn(1000)
num_bins = 50

plt.hist(x, num_bins, density=True)
plt.xlabel('Valeur')
plt.ylabel('Probabilite')
plt.title(f"Histogramme d'une loi gaussienne : μ = {mu}, σ = {sigma}")
plt.show()
