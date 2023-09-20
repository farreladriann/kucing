# Bisection Method to find root of equations
# from sage.all import *

# x = var('x')

# # inisialiasi fungsi
# f = x**3 - 5*x**2 + 7*x - 3
# # f = 5*x**3 - 5*x**2 + 6*x - 2
# # f = 9.81 * 68.1 / x * (1 - exp(-(x / 68.1) * 10)) - 40

# # inisialisasi x_left dan x_right
# x_left = -10
# x_right = 7

# n = 100
# X = matrix(RR, n, 6)

# # nomor, x_left, x_right, x_mid, f(x_mid), epsilon a
# X[0] = [1, x_left, x_right, (x_left + x_right) / 2, f.subs({x: (x_left + x_right) / 2}), 100]

# if f.subs({x: x_left}) * f.subs({x: x_right}) > 0:
#     print('buat nilai tebakan lain')
#     exit()

# for i in range(1, n):
#     x_mid = X[i-1, 3]
#     flxfmid = f.subs({x: x_left}) * f.subs({x: x_mid})

#     if flxfmid < 0:
#         x_right = x_mid
#         x_mid_baru = (x_left + x_right) / 2
#         X[i] = [i+1, x_left, x_right, x_mid_baru, f.subs({x: x_mid_baru}), abs((x_mid_baru - x_mid) / x_mid_baru) * 100]
#     elif flxfmid == 0:
#         x_mid_baru = (x_left + x_right) / 2
#         X[i] = [i+1, x_left, x_right, x_mid_baru, f.subs({x: x_mid_baru}), abs((x_mid_baru - x_mid) / x_mid_baru) * 100]
#         break
#     else:
#         x_left = x_mid
#         x_mid_baru = (x_left + x_right) / 2
#         X[i] = [i+1, x_left, x_right, x_mid_baru, f.subs({x: x_mid_baru}), abs((x_mid_baru - x_mid) / x_mid_baru) * 100]

# print(X)

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
    X[i+1, 2] = abs((X[i+1, 0] - X[i, 0]) / X[i+1, 0]) * 100
    
    if X[i+1, 1] == RR(0):
        break
    i = i + 1

print(X[0: i+2, 0:])