# Newton Raphson Method to find root of equations
from sage.all import *

x = var('x')

y = x**4 - 6*x**3 + 12*x**2 - 10*x + 3

def 

x0 = float(input("masukkan x0 : "))
x1 = float(input("masukkan x1 : "))

def epsilon_a(xr_old, xr_new):
    if xr_new != 0:
        return abs((xr_new - xr_old) / xr_new) * 100
    return 0

def f(sigma, epsilon_nol, r, R, beta, error_minimal):
    global x
    y = - sigma / epsilon_nol * ln(x / R) * (1 - cos(beta / 2))
    return y.subs({ x: r })

def next_xi(xi, xi_before):
    return xi - f(xi) * (xi - xi_before) / (f(xi) - f(xi_before))

# initial guess

# [nomor, xi, f(xi), Df(xi), epsilon_a] 5
n = 1000
X = matrix(RR, n, 6)

# u/ epsilon a
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

    xi_plus1 = next_xi(xi, xi_min1)
    X[i] = [i+1, xi, xi_plus1, X[i-1, 4], f(xi_plus1), epsilon_a(xi, xi_plus1)]
    if X[i, 5] == 0:
        break

print(X[:i+1])