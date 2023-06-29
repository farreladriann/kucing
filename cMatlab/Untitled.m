A = [1.5 .5;
    .5 1.5;]

unitV = randn(2,100)
for i=1:100
    unitV(1:2,i) = unitV(1:2,i)/norm(unitV(1:2,i))
    unitV(1:2,i) = A * unitV(1:2,i)
end
quiver(zeros(1,100), zeros(1,100), unitV(1, 1:100), unitV(2, 1:100))
% a = [0 1;
%     1 0;
%     -1 0;
%     0 -1;]'
% quiver(zeros(1,4), zeros(1,4), a(1, 1:4), unitV(2, 1:4))
grid on

