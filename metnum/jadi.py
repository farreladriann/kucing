# Newton Raphson Method to find root of equations
from sage.all import *

x = var('x')
y = x**4-24*x**2+11

Dy = diff(y, x)
# initial guess
# x0 = 2.4*pi

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

def m_next_xi(xi, m): # m dengan banyaknya root
    return xi - m * f(xi) / Df(xi)

def modified_next_xi(xi):
    return xi - f(xi) * Df(xi) / ( Df(xi) ** 2 - f(xi) * diff(Dy, x).subs({ x: xi }) )

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

    return X[:i+2]

n = int(input(("Masukkan jumlah iterasi: ")))
x0 = int(input("Masukkan nilai awal x: "))
toleransi_error = int(input("Masukkan batas error: "))

Hasil = newton_raphson_method(n, x0, toleransi_error)
print(Hasil)