# Newton Raphson Method to find root of equations
from sage.all import *

x = var('x')

# kasus penting
# y = x**3 - 5*x**2 + 7*x - 3 # x= 3, x=1, x=1
# y = x**4 - 8*x**3 + 20*x**2 - 16*x + 3 # x = 0.2679491924311, x=1, x=3, x=3.7320508075689
# y = x**2 # satu titik potong dan f >= 0
# y = 3*x**5 - 5*x**3 + 2 # ada dua titik stasioner dan satu titik belok, x = -1.384811563344, x = 1
# y = x**2 + 1 # tidak memotong sumbu x dan selalu positif
# y = 1 / x + 1 # satu perpotongan sumbu x dan ada titik yang diskontinu, x = -1
# y = 1 / x # tidak memotong sumbu x dan diskontinu di satu titik
# y = exp(x) # konvergen ke sumbu x
# y = sin(x) # banyak perpotongan sumbu x, x=0, x=pi, x=2pi, dst
# y = tan(x) # banyak perpotongan dan banyak diskontinu, x=0, x=pi, x=2pi, dst
# y = 9.81 * 68.1 / x * (1 - exp(-(x / 68.1) * 10)) - 40 # dari buku
# y = x**7 - 5
# y = exp(-x) - x
y = x**4 - 6*x**3 + 12*x**2 - 10*x + 3

x0 = float(input("masukkan x0 : "))
x1 = float(input("masukkan x1 : "))

def epsilon_a(xr_old, xr_new):
    if xr_new != 0:
        return abs((xr_new - xr_old) / xr_new) * 100
    return 0

def f(xo):
    global y
    return y.subs({ x: xo })

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