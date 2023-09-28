from sympy import *

x = Symbol('x')

y = 300*cos(0.34*pi)*x - 0.5*9.81*x**2 - 10
Dy = y.diff(x)
# initial guess
x0 = float(input("Masukkan x0: "))
# x0 = 2.4*pi

def epsilon_a(xr_old, xr_new):
    if xr_new != 0:
        return ((xr_new - xr_old) / xr_new) * 100
    return 0

def f(xo):
    global y
    return y.subs(x, xo).evalf()

def Df(xo):
    global Dy
    return Dy.subs(x, xo).evalf()

def next_xi(xi):
    return xi - f(xi) / Df(xi)

# [nomor, xi, f(xi), Df(xi), epsilon_a] 5
n = 100

X = []
X.append([0, x0, f(x0), Df(x0), 100])

for i in range(0, n):
    xi = X[i][1]
    
    if Df(xi) == 0:
        print('Coba gunakan tebakan lain, karena ada yg turunannya 0')
        exit()
        
    xi_plus1 = next_xi(xi)
    
    X.append([i+1, xi_plus1, f(xi_plus1), Df(xi_plus1), epsilon_a(xi, xi_plus1)])
    
    if X[i+1][4] == 0:
        break

for i in range(0, len(X)):
    for j in range(0, 5):
        if len(str(X[i][j])) <= 5 :
            print(X[i][j], end="\t\t\t\t")
        else:
            print(X[i][j], end="\t\t")
    print()
