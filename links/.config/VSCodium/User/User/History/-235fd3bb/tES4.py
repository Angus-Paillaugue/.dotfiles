######################
# Imports de modules #
######################

import numpy as np

######################
# Fonctions à écrire #
######################

def gauss_jordan(A,B):
  if(len(A) != len(B)):
    raise ValueError("Les matrices n'ont pas les mêles tailles")

  n = len(A)
  C = np.concatenate((A, B), axis=1)
  for i in range(n):
    C[i] = C[i]/C[i,i]
    for j in range(n):
      if i != j:
        C[j] = C[j] - C[i]*C[j,i]

  return C[:,n:]

#exerice 1
def test_error():
  print("######################")
  print("# Test de contrainte #")
  print("######################")
  success = True

  try :
    gauss_jordan(
      np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
      np.array([1, 2, 3, 4])
    )
    success = False
  except:
    pass

  try:
    gauss_jordan(
      np.array([[1, 2], [3, 4]]),
      np.array([1, 2])
    )
  except:
    success = False

  if success:
    print("Les tests de contrainte ont réussi\n")
  else:
    print("Les tests de contrainte ont échoué\n")



#exercice 2
def test_diago_inv1():
  print("#############################")
  print("# Test de diagonalisation 1 #")
  print("#############################\n")
  A = np.array([[1, 2], [3, 4]])
  B = np.array([[5], [6]])

  print(gauss_jordan(A, B))
  return


#exercice 3
def test_diago_inv2():
    print("#############################")
    print("# Test de diagonalisation 2 #")
    print("#############################\n")

    return


#exercice 3
def test_diago_ninv():
    print("#############################")
    print("# Test de diagonalisation 3 #")
    print("#############################\n")

    return


#exercice 4
def test_second_membre():
    print("###########################")
    print("# Test calcul du résultat #")
    print("###########################\n")

    return


#######################
# Programme principal #
#######################

if __name__ == "__main__":
    test_error()
    test_diago_inv1()
    test_diago_inv2()
    test_diago_ninv()
    test_second_membre()
