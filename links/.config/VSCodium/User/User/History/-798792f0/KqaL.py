import matplotlib.pyplot as plt
import numpy as np
import math

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

n = 20
p = 0.3
k = np.arange(0, n+1)
binom_pmf = [math.comb(n, i) * (p**i) * ((1-p)**(n-i)) for i in k]

plt.figure()
plt.bar(k, binom_pmf, width=0.6, color='blue', alpha=0.7)
plt.xlabel('Valeur')
plt.ylabel('Probabilite')
plt.title(f"Histogramme d'une loi binomiale : n = {n}, p = {p}")
plt.show()
