A = [4 0;
   3 -5;];
[U, S, V] = svd(A);
SignChanger = [1 0; 0 -1;];
U = U * SignChanger;
V = V * SignChanger;
HASIL = V(1:2, 1);
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
plot(x, y, x, y)
hold on
quiver(zeros(1,2), zeros(1,2), V(1, 1:2), V(2,1:2), 'linewidth', 3, 'color', 'r', 'AutoScale','off')
grid on
axis equal
xline(0)
yline(0)