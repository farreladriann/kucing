A = [4 8;
    11 7;
    14 -2;]
[U,S,V] = svd(A)
U*S*V'
[U,S,V] = svd(A, "econ")
U*S*V'