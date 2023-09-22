# Regula Falsi Method to find root of equations
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
# y = x**10 - 1

xl = 0.5
xu = 4

def epsilon_a(xr_old, xr_new):
    if xr_new != 0:
        return abs((xr_new - xr_old) / xr_new) * 100
    return 0

def f(xo):
    global y
    return y.subs({ x: xo})

def xr(xl, xu):
    global y
    return xu - f(xu)*(xl - xu) / (f(xl) - f(xu))

if f(xl) * f(xu) > 0:
    print('buat nilai tebakan lain')
    exit()

n = 100
X = matrix(RR, n, 6)

# nomor, xl, xu, xr, f(xr), epsilon a
X[0] = [1, xl, xu, xr(xl, xu), f(xr(xl, xu)), 100]

for i in range(1, n):
    xr_lama = X[i-1, 3]
    flxfmid = f(xl) * f(xr_lama)

    if flxfmid < 0:
        xu = xr_lama
        xr_baru = xr(xl, xu)
        X[i] = [i+1, xl, xu, xr_baru, f(xr_baru), epsilon_a(xr_lama, xr_baru)]
    elif flxfmid == 0:
        xr_baru = xr(xl, xu)
        X[i] = [i+1, xl, xu, xr_baru, f(xr_baru), epsilon_a(xr_lama, xr_baru)]
        break
    else:
        xl = xr_lama
        xr_baru = xr(xl, xu)
        X[i] = [i+1, xl, xu, xr_baru, f(xr_baru), epsilon_a(xr_lama, xr_baru)]

print(X[:i+1])
