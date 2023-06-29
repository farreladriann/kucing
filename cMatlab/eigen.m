A = [2    -1;
     2     0;]

eig(A)
C = [1 0;
    1 1;]
B= [1 -1;
    1 1;]

unitV = randn(2,100)
for i=1:100
    unitV(1:2,i) = unitV(1:2,i)/norm(unitV(1:2,i))
    unitV(1:2,i) = A * unitV(1:2,i)
end
% quiver(zeros(1,100), zeros(1,100), unitV(1, 1:100), unitV(2, 1:100))
quiver(0, 0, 2, 1)