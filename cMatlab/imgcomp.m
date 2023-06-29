A = imread('lenaa.jpg');
[m, n] = size(A);
% imshow(A)
[U, S, V] = svd(double(A), "econ");
B = U*S*V';
[m, n] = size(A);
k = 30;
U1 = U(1:256, 1:k);
S1 = S(1:k, 1:k);
V1 = V(1:256, 1:k);
% [U1,S1,V1] = svdsketch(double(A),1e-1);
Anew1 = uint8(U1*S1*V1');
imshow(Anew1)