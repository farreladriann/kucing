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
# y = x**7 - 1000
# y = x**2 - x -1
# y = sqrt(1 - x**2) # setengah lingkaran dengan jari2 = 1
# y = x**3
# y = x**4 - 6*x**3 + 12*x**2 - 10*x + 3
# y = x**3 - 5*x**2 + 7*x - 3
y = 300*cos(0.34*pi)*x - 0.5*9.81*x**2 - 10

Dy = diff(y, x)
# initial guess
x0 = float(input("Masukkan x0: "))
# x0 = 2.4*pi

def epsilon_a(xr_old, xr_new):
    if xr_new != 0:
        return abs((xr_new - xr_old) / xr_new) * 100
    return 0

def f(xo):
    global y
    return y.subs(x, xo).evalf()

def Df(xo):
    global Dy
    return Dy.subs(x, xo).evalf()

def next_xi(xi):
    return xi - f(xi) / Df(xi)

def m_next_xi(xi, m): # m dengan banyaknya root
    return xi - m * f(xi) / Df(xi)

def modified_next_xi(xi):
    return xi - f(xi) * Df(xi) / ( Df(xi) ** 2 - f(xi) * diff(Dy, x).subs({ x: xi }) )

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
    
    if X[i+1, 4] == RR(0):
        break

print(X[:i+2])