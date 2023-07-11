from sage.all import *

x = var('x')

f = x**2 - 6*x + 8
print(f.factor())