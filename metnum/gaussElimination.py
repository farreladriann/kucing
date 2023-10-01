from sage.all import *

# scaling
# partial pivoting
# complete pivoting
# forward elimination upper triangular
# forward elimination lower triangular
# back substitution

# urutanPivot ke 0 itu A[0, 0]
    
def inputAugmentedMatrix(N):
    flag = False
    for i in range(N):
        inputRow = input().split()
        jumlahVektor = len(inputRow) - N
        if flag == False:
            A = matrix(RR, N, N+jumlahVektor)
            flag = True
        for j in range(0, N+jumlahVektor):
            A[i, j] = float(inputRow[j])
    return A
    
# make upper to be 0
def partialPivoting(A, N, urutanPivot):
    iWillSwap = urutanPivot
    greatestPivot = A[urutanPivot][urutanPivot]
    for i in range(urutanPivot+1, N):
        if abs(greatestPivot) <= abs(A[i][urutanPivot]):
            iWillSwap = i
            greatestPivot = A[i][urutanPivot]
    A.swap_rows(urutanPivot, iWillSwap)
    return A

def completePivoting(A, N, urutanPivot):
    iWillSwap = urutanPivot
    jWillSwap = urutanPivot
    greatestPivot = A[urutanPivot][urutanPivot]
    for i in range(urutanPivot, N):
        for j in range(urutanPivot, N):
            if abs(greatestPivot) <= abs(A[i][j]):
                iWillSwap = i
                jWillSwap = j
                greatestPivot = A[i][j]
    A.swap_rows(urutanPivot, iWillSwap)
    A.swap_columns(urutanPivot, jWillSwap)
    return A

# forward elimination fokus membuat bawah menjadi 0
def forwardElimination(A, N, urutanPivot):
    for i in range(urutanPivot+1, N):
        # add to row i multiple k times row urutanPivot
        # A.add_multiple_of_row(i, urutanPivot, k)
        multipler = -A[i][urutanPivot] / A[urutanPivot][urutanPivot]
        A.add_multiple_of_row(i, urutanPivot, multipler)
    return A

def isSingular(A, N):
    flag = False
    solusi = ""
    for i in range(N):
        if A[i, i] == 0:
            flag = True
            solusi = "Memiliki solusi tak hingga"
            if A[i, N] != 0:
                solusi = "Tidak memiliki solusi"
                break
    return [flag, solusi]

def backSubstitution(A, N):
    hasil = []
    for i in range(N-1, -1, -1):
        hasilkei = A[i][N]
        for j, k in zip(range(N-1, i, -1), range(len(hasil))):
            hasilkei -= (A[i][j] * hasil[k])
        hasilkei /= A[i][i]
        hasil.append(hasilkei)
    hasil.reverse()
    return hasil

def gaussElimination(A, N):
    for i in range(N-1):
        A = partialPivoting(A, N, i)
        A = forwardElimination(A, N, i)
    if isSingular(A, N)[0]:
        print("Matrix nya singular")
        print(isSingular(A, N)[1])
    print(backSubstitution(A, N))
    return A

def main():
    N = int(input())
    A = inputAugmentedMatrix(N)
    A = gaussElimination(A, N)
    print(A)

if __name__ == "__main__":
    main()
    
#masih cacat pada tahap complete pivoting