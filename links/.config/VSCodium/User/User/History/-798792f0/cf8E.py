import matplotlib.pyplot as plt
import numpy as np

mu = 100 # moyenne
sigma = 15 # ecart-type
x = mu + sigma * np.random.randn(1_000_000)
num_bins = 100
y = np.linspace(np.min(x), np.max(x), 1000)
f = 1/(sigma * np.sqrt(2 * np.pi)) * np.exp(-(y - mu)**2 / (2 * sigma**2))

plt.hist(x, num_bins, density=True)
plt.plot(y, f)
plt.xlabel('Valeur')
plt.ylabel('Probabilite')
plt.title(f"Histogramme d'une loi gaussienne : μ = {mu}, σ = {sigma}")
plt.show()

