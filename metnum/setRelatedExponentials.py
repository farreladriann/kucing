from sage.all import *

t = var('t')

def eksp(k, T):
    x = cos(2*pi*k*t/T)
    y = sin(2*pi*k*t/T)
    # t = 0, 1, 2, 3, 4
    return [x.subs({t: i}) + I * y.subs({t: i}) for i in range(0, 5)]

# T = 3

for i in range(-3, 4):
    print(f"T = 3, k = {i}")
    print(eksp(i, 3))
    print()