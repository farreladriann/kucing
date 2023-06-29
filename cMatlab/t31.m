u = [.6 ; .4]; 
A = [.8 .3 ; .2 .7];
x = u; 
k = [0 : 100];
while size(x,2) <= 100
    u = A*u; 
    x = [x u];
end
plot(k, x)