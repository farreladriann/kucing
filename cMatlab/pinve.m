A = [2 2 1;
    2 -2 -1;];
[m, n] = size(A);
% rank(A);
[U, S, V] = svd(A, "econ");
pvA = V*pinv(S)*U';
% pvA
% pinv(A)
% u1 = U(1:2, 1)
% v1 = V(1:2, 1)
% s1 = S(1,1)
% v1*inv(s1)*u1'
b = [3 1;]'
pinv(A) * b
pvA * b