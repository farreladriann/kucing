A = [4 0;
   3 -5;];
[U, S, V] = svd(A);
SignChanger = [1 0; 0 -1;];
U = U * SignChanger;
V = V * SignChanger;
HASIL = V'*[1; 1;];
JariKuadrat = HASIL(1,1)*HASIL(1,1) + HASIL(2,1) * HASIL(2,1);
Jari2 = sqrt(JariKuadrat);
x = -Jari2 : 0.001 : Jari2;
x = [x Jari2];
[mx, nx] = size(x);
y1 = zeros(1, nx);
y2 = zeros(1, nx);
for i = 1:nx
    y1(1, i) = sqrt(JariKuadrat - x(1, i)*x(1,i));
    y2(1, i) = -sqrt(JariKuadrat - x(1, i)*x(1,i));
end
x = [x x];
y = [y1 y2];
pengelips = S*[x; y;];
[mx, nx] = size(pengelips);
HASIL = S*HASIL;
plot(pengelips(1,1:nx), pengelips(2,1:nx), pengelips(1,1:nx), pengelips(2,1:nx), 'color', 'y')
hold on
quiver(0, 0, HASIL(1,1), HASIL(2,1), 'linewidth', 3, 'color', 'b', 'AutoScale','off')
axis equal
HASIL