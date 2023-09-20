# Newton Raphson Method to find root of equations
from sage.all import *

x = var('x')

# kasus penting
y = x**3 - 5*x**2 + 7*x - 3 # x= 3, x=1, x=1
# y = x**2 # satu titik potong dan f >= 0
# y = 3*x**5 - 5*x**3 + 2 # ada dua titik stasioner dan satu titik belok, x = -1.384811563344, x = 1
# y = x**2 + 1 # tidak memotong sumbu x dan selalu positif
# y = 1 / x + 1 # satu perpotongan sumbu x dan ada titik yang diskontinu, x = -1
# y = 1 / x # tidak memotong sumbu x dan diskontinu di satu titik
# y = exp(x) # konvergen ke sumbu x
# y = sin(x) # banyak perpotongan sumbu x, x=0, x=pi, x=2pi, dst
# y = tan(x) # banyak perpotongan dan banyak diskontinu, x=0, x=pi, x=2pi, dst
# y = 9.81 * 68.1 / x * (1 - exp(-(x / 68.1) * 10)) - 40 # dari buku

Dy = diff(y, x)

def epsilon_a(xr_old, xr_new):
    return abs((xr_new - xr_old) / xr_new) * 100

def f(xo):
    global y
    return y.subs({ x: xo })

def Df(xo):
    global Dy
    return Dy.subs({ x: xo })

def next_xi(xi):
    return xi - f(xi) / Df(xi)

# initial guess
x0 = 4

# [nomor, xi, f(xi), Df(xi), epsilon_a] 5
n = 100
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
    
    if X[i+1, 2] == RR(0):
        break

print(X[0: i+2, 0:])