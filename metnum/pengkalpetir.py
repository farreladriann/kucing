from sage.all import *

x = var('x')
x0 = float(input("Masukkan x0: "))
sigma = float(input("Masukkan sigma: "))
epsilon_nol = float(input("Masukkan epsilon_nol: "))
R = float(input("Masukkan R: "))
beta = float(input("Masukkan beta: "))
y = - sigma / epsilon_nol * ln(x / R) * (1 - cos(beta / 2))
Dy = diff(y, x)
# initial guess

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