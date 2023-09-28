from sage.all import *
# n = 20
# R = PolynomialRing(RR, 'x', n+1) # n0 ga dipake mulai dari n1
# x = R.gens()[1:]
# print(x[0])

x, y = var('x y')
p = x * y
h = p.subs({ x: 2})
print(h.subs({ x: 3 }))
