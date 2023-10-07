from sage.all import *

def f(xo):
    global y
    return y.subs({ x: xo })

x = var('x')
y = x**4-24*x**2+11

print(f(20))