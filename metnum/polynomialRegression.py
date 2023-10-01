from sage.all import *

# y = a0 + a1x1 + a2x2 + .. + amxm
def createPolynomial(m, n, titikX, titikY):
    A = matrix(RR, m+1, m+1)
    b = vector(RR, m+1)
    A[0, 0] = n
    b[0] = sum(titikY)
    for k in range(1, m+1):
        for r in range(n):
            b[k] += (titikX[r]**k * titikY[r])
    
    i = 1
    j = 0
    s = 1
    while(i <= m and j <= m):
        for k in range(n):
            A[i, j] += (titikX[k]**s)
        
        rowBerjalan = i
        columnBerjalan = j
        while rowBerjalan <= m and columnBerjalan >= 0:
            A[rowBerjalan, columnBerjalan] = A[i, j]
            rowBerjalan += 1
            columnBerjalan -= 1
            
        rowBerjalan = i
        columnBerjalan = j
        while rowBerjalan >= 0 and columnBerjalan <= m:
            A[rowBerjalan, columnBerjalan] = A[i, j]
            rowBerjalan -= 1
            columnBerjalan += 1
        
        if i == j:
            i += 1
        else:
            j += 1
        s += 1
    
    print(A)
    print(b)
    a = A.solve_right(b)
    y = ""
    for i in range(m+1):
        y += f"{a[i]}x^{i} + "
    print(a)
    return y

titikX = []
titikY = []
n = int(input())
for i in range(n):
    inputXY = input().split()
    titikX.append(RR(float(inputXY[0])))
    titikY.append(RR(float(inputXY[1])))
m = int(input())

print(createPolynomial(m, n, titikX, titikY))
