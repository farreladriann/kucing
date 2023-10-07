from sage.all import *

def inputMatrix(n):
    A = matrix(RR, n, n+1)
    for i in range(n):
        inputRow = input().split() 
        for j in range(0, n+1):
            A[i, j] = float(inputRow[j])    
    return A

def membuat_rumus_xi(A, n):
    R = PolynomialRing(RR, 'x', n+1) # x0 ga dipake mulai dari n1
    rumus_xi = []
    x = R.gens()[1:] #tuple
    for i in range(n):  
    # membuat polynomial rumus xi
        y = A[i, n]
        for x_val, j in zip(x, range(n)):
            if i != j:
                y -= (A[i, j] * x_val)
        rumus_xi.append(y / A[i, i])
    
    return rumus_xi

def gauss_seidel(n, rumus_xi, jumlahPerulangan):
    X = matrix(RR, jumlahPerulangan, n)
    Error = matrix(RR, jumlahPerulangan, n)
    R = PolynomialRing(RR, 'x', n+1) # x0 ga dipake mulai dari n1
    x = R.gens()[1:] #tuple
    
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
            X[i+1, j] = x_iplus1
    
    return X

def epsilon_a(xr_old, xr_new):
    if xr_new != 0:
        return abs((xr_new - xr_old) / xr_new) * 100
    return 0

def f(xo):
    global y
    return y.subs({ x: xo })

def Df(xo):
    global Dy
    return Dy.subs({x: xo})

def next_xi(xi):
    return xi - f(xi) / Df(xi)

def newton_raphson_method(n, x0, toleransi_error):
    X = matrix(RR, n+1, 5)
    # u/ epsilon a
    X[0] = [0, x0, f(x0), Df(x0), 100]

    for i in range(0, n):
        xi = X[i, 1]
        
        if Df(xi) == 0:
            print('Coba gunakan tebakan lain, karena ada yg turunannya 0')
            exit()
            
        xi_plus1 = next_xi(xi)
        
        X[i+1] = [i+1, xi_plus1, f(xi_plus1), Df(xi_plus1), epsilon_a(xi, xi_plus1)]
        
        if X[i+1, 4] < toleransi_error:
            break

    return X

def next_xi_secant(xi, xi_before):
    return xi - f(xi) * (xi - xi_before) / (f(xi) - f(xi_before))

def secant(n, x0, x1, toleransi_error):
    X = matrix(RR, n, 6)
    X[0] = [1, x0, x1, f(x0), f(x1), epsilon_a(x0, x1)]

    if f(x0) == f(x1):
        print('pilih tebakan lain')
        exit()

    for i in range(1, n):
        xi_min1 = X[i-1, 1]
        xi = X[i-1, 2]
        
        if f(xi) == f(xi_min1):
            print('pilih tebakan lain')
            print(xi, xi_min1)
            print(X[:i+6])
            exit()

        xi_plus1 = next_xi_secant(xi, xi_min1)
        X[i] = [i+1, xi, xi_plus1, X[i-1, 4], f(xi_plus1), epsilon_a(xi, xi_plus1)]
        if X[i, 5] < toleransi_error:
            break
    return X

n = int(input("Ukuran matrix n: "))
jumlahPerulangan = int(input("Maksimal iterasi: "))

print("Inputkan augmented matrix di bawah ini")
A = inputMatrix(n)

rumus_xi = membuat_rumus_xi(A, n)
print("Input terkaan awal untuk ln(x_1) cos(x_2) tan(x_3)")

X = gauss_seidel(n, rumus_xi, jumlahPerulangan)

toleransi_error = float(input("Masukkan toleransi error: "))

x = var('x')

y = ln(x) - X[jumlahPerulangan-1, 0]
Dy = diff(y, x)
x1 = float(input("Masukkan terkaan awal x1: "))
X1 = newton_raphson_method(jumlahPerulangan, x1, toleransi_error)

y = cos(x) - X[jumlahPerulangan-1, 1]
Dy = diff(y, x)
x1 = float(input("Masukkan terkaan awal x2: "))
X2 = newton_raphson_method(jumlahPerulangan, x1, toleransi_error)

y = tan(x) - X[jumlahPerulangan-1, 2]
Dy = diff(y, x)
x1 = float(input("Masukkan terkaan awal x3: "))
X3 = newton_raphson_method(jumlahPerulangan, x1, toleransi_error)

print("X")
print(X)

print("Untuk Newton Raphson Method")
print("X1")
print(X1)

print("X2")
print(X2)

print("X3")
print(X3)

y = ln(x) - X[jumlahPerulangan-1, 0]
x10 = float(input("x1, Masukkan terkaan awal x0: "))
x11 = float(input("x1, Masukkan terkaan awal x1: "))
X1 = secant(jumlahPerulangan, x10, x11, toleransi_error)

y = cos(x) - X[jumlahPerulangan-1, 1]
x20 = float(input("x2, Masukkan terkaan awal x0: "))
x21 = float(input("x2, Masukkan terkaan awal x1: "))
X2 = secant(jumlahPerulangan, x20, x21, toleransi_error)

y = tan(x) - X[jumlahPerulangan-1, 2]
x30 = float(input("x3, Masukkan terkaan awal x0: "))
x31 = float(input("x3, Masukkan terkaan awal x1: "))
X3 = secant(jumlahPerulangan, x30, x31, toleransi_error)

print("Untuk Secant Method")
print("X1")
print(X1)

print("X2")
print(X2)

print("X3")
print(X3)
