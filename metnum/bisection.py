# Bisection Method to find root of equations
from sage.all import *

x = var('x')

# inisialiasi fungsi
# f = x**3 - 5*x**2 + 7*x - 3
# f = 5*x**3 - 5*x**2 + 6*x - 2
f = 9.81 * 68.1 / x * (1 - exp(-(x / 68.1) * 10)) - 40

# inisialisasi x_left dan x_right
x_left = 12
x_right = 16

n = 100
X = matrix(RR, n, 6)

# nomor, x_left, x_right, x_mid, f(x_mid), epsilon a
X[0] = [1, x_left, x_right, (x_left + x_right) / 2, f.subs({x: (x_left + x_right) / 2}), 100]

if f.subs({x: x_left}) * f.subs({x: x_right}) > 0:
    print('buat nilai tebakan lain')
    exit()

for i in range(1, n):
    x_mid = X[i-1, 3]
    flxfmid = f.subs({x: x_left}) * f.subs({x: x_mid})

    if flxfmid < 0:
        x_right = x_mid
        x_mid_baru = (x_left + x_right) / 2
        X[i] = [i+1, x_left, x_right, x_mid_baru, f.subs({x: x_mid_baru}), abs((x_mid_baru - x_mid) / x_mid_baru) * 100]
    elif flxfmid == 0:
        x_mid_baru = (x_left + x_right) / 2
        X[i] = [i+1, x_left, x_right, x_mid_baru, f.subs({x: x_mid_baru}), abs((x_mid_baru - x_mid) / x_mid_baru) * 100]
        break
    else:
        x_left = x_mid
        x_mid_baru = (x_left + x_right) / 2
        X[i] = [i+1, x_left, x_right, x_mid_baru, f.subs({x: x_mid_baru}), abs((x_mid_baru - x_mid) / x_mid_baru) * 100]

print(X)
