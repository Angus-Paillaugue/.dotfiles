import matplotlib.pyplot as plt
mu = 100 # moyenne
sigma = 15 # ´ecart-type
x = mu + sigma * np.random.randn(1000)
num bins = 50
plt.hist(x, num bins, density=True)
plt.xlabel('Valeur')
plt.ylabel('Probabilite')
plt.title("Histogramme d’une loi gaussienne : μ = 100, σ = 15")
plt.show()
