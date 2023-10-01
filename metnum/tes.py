from sage.all import *
# n = 20
# R = PolynomialRing(RR, 'x', n+1) # n0 ga dipake mulai dari n1
# x = R.gens()[1:]
# print(x[0])

# x, y = var('x y')
# p = x * y
# h = p.subs({ x: 2})
# print(h.subs({ x: 3 }))
titikX = []
titikY = []
n = int(input())
for i in range(n):
    inputXY = input().split()
    titikX.append(RR(float(inputXY[0])))
    titikY.append(RR(float(inputXY[1])))
m = int(input())
b = vector(RR, m+1)

b[0] = sum(titikY)
for k in range(1, m+1):
        for r in range(n):
            b[k] += (titikX[r]**k * titikY[r])
print(b)