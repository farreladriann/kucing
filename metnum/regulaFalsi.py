# Regula Falsi Method to find root of equations
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

def epsilon_a(xr_old, xr_new):
    return abs((xr_new - xr_old) / xr_new) * 100

def f(xo):
    global y
    return y.subs({ x: xo})

def xr(xl, xu):
    global y
    return xu - f(xu)*(xl - xu) / (f(xl) - f(xu))
