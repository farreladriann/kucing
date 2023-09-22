from sage.all import *

x = var('x')

y = 3/(x-2)
Dy = diff(y, x)
x0 = 1.999

def epsilon_a(xr_old, xr_new):
    if xr_new != 0:
        return abs((xr_new - xr_old) / xr_new) * 100
    return 0

def g(xo):
    global y
    return y.subs({ x: xo })

def Dg(xo):
    global Dy
    return Dy.subs({ x: xo })

n = 100
X = matrix(RR, n+1, 5)

X[0] = [0, x0, g(x0), Dg(x0), 100]

for i in range(0, n):
    xi = X[i, 1]
    xi_plus1 = X[i, 2]
    X[i+1] = [i+1, xi_plus1, g(xi_plus1), Dg(xi_plus1), epsilon_a(xi, xi_plus1)]
    if X[i+1, 4] == 0 or X[i+1, 4] == infinity:
        break
    
print(X[:i+2])
