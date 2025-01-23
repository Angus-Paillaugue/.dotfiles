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

#exerice 1
def test_error():
  print("######################")
  print("# Test de contrainte #")
  print("######################\n")
  try :
    gauss_jordan(
      np.array([1, 2, 3, 4]),
      np.array([[1, 2], [3, 4], [5, 6]])
    )
    print("Test de contrainte échoué")
    return False
  except:
    print("Test de contrainte réussi")
    return True



#exercice 2
def test_diago_inv1():
    print("#############################")
    print("# Test de diagonalisation 1 #")
    print("#############################\n")

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
