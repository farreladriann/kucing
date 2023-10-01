import numpy as np

# Matriks awal
A = np.array([[2, 1, 1],
            [4, -6, 0],
            [1, -1, 3]], dtype=float)

# Vektor hasil
b = np.array([3, 9, 4], dtype=float)

n = len(b)

for k in range(n):
    print(f"Step {k+1}:")
    
    # Cetak matriks A pada tahap ini
    print("Matrix A:")
    print(A)
    
    # Hitung skala untuk setiap baris
    scales = np.max(np.abs(A), axis=1)
    
    # Temukan baris dengan skala paling besar
    pivot_row = np.argmax(scales[k:]) + k
    
    # Lakukan pertukaran baris
    A[[k, pivot_row]] = A[[pivot_row, k]]
    b[k], b[pivot_row] = b[pivot_row], b[k]
    
    # Cetak matriks A setelah pertukaran
    print("Matrix A setelah pertukaran:")
    print(A)
    
    # Tahap eliminasi Gauss
    for i in range(k+1, n):
        factor = A[i, k] / A[k, k]
        A[i, k:] -= factor * A[k, k:]
        b[i] -= factor * b[k]
    
    # Cetak matriks A setelah eliminasi Gauss
    print("Matrix A setelah eliminasi Gauss:")
    print(A)
    
    # Cetak vektor b saat ini
    print("Vektor b:")
    print(b)

# Proses pengembalian mundur (back-substitution)
x = np.zeros(n)
for i in range(n - 1, -1, -1):
    x[i] = (b[i] - np.dot(A[i, i+1:], x[i+1:])) / A[i, i]

print("Solusi x:", x)
