# Newton Raphson Method to find root of equations
from sage.all import *

x = var('x')

# inisialiasi fungsi dan turunannya
f = x**3 - 5*x**2 + 7*x - 3
Df = diff(f, x)

# urutan x terakhir
n = 10

# initial guess
x0 = 4

## matrix sample initial with first row to x0
## kolom 1 => xn
## kolom 2 => f(xn)
## kolom 3 => Relative error (epsilon t) atau bisa milih (epsilon a)
X = matrix(RR, n+1, 3)

# u/ epsilon t
X[0] = [x0, f.subs({ x: x0 }), (1-X[0, 0]) / 1 * 100]
# u/ epsilon a
X[0] = [x0, f.subs({ x: x0 }), 100]

i = 0
while(i < n):
    # X[i+1, 0] = Xi+1, X[i+1, 1] = f(Xi+1)
    
    if Df.subs({ x: X[i, 0] }) == 0:
        print('Coba gunakan tebakan lain, karena ada yg turunannya 0')
        exit()
        
    X[i+1, 0] = X[i, 0] - (X[i, 1] / Df.subs({ x: X[i, 0] }))
    X[i+1, 1] = f.subs({ x: X[i+1, 0]})
    
    # epsilon t
    # X[i+1, 2] = (1-X[i+1, 0]) /  * 100
    
    # epsilon a
    X[i+1, 2] = abs((X[i+1, 0] - X[i, 0]) / X[i+1, 0] * 100)
    
    if X[i+1, 1] == RR(0):
        break
    i = i + 1

print(X[0: i+2, 0:])