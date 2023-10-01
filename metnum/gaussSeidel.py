from sage.all import *

n = int(input())
A = matrix(RR, n, n+1)
rumus_xi = []
jumlahPerulangan = 100
X = matrix(RR, jumlahPerulangan, n)
Error = matrix(RR, jumlahPerulangan, n)
R = PolynomialRing(RR, 'x', n+1) # x0 ga dipake mulai dari n1
x = R.gens()[1:] #tuple

# input, index dimulai dari 1 dan berakhir di n
for i in range(n):
    inputRow = input().split() 
    for j in range(0, n+1):
        A[i, j] = float(inputRow[j])    
    # membuat polynomial rumus xi
    y = A[i, n]
    for x_val, j in zip(x, range(n)):
        if i != j:
            y -= (A[i, j] * x_val)
    rumus_xi.append(y / A[i, i])

# initial guess
list_initial = input().split()
for i in range(n):
    X[0, i] = float(list_initial[i])

# start iteration
for i in range(jumlahPerulangan-1):
    for j in range(n):
        x_iplus1 = rumus_xi[j]
        # di bawah ini perbedaannya dengan jacobi method
        for k in (range(n)):
            if k < j:
                x_iplus1 = x_iplus1.subs({ x[k]: X[i+1, k] })
            elif k > j:
                x_iplus1 = x_iplus1.subs({ x[k]: X[i, k] })
            print(x_iplus1)
        X[i+1, j] = x_iplus1
        

print(rumus_xi)
print(X)
