% clear,clc;
% Xmin = 0; Xmax = 5;
% Ymin = -2; Ymax = 3;
% [t, y] = meshgrid(Xmin:0.2:Xmax, Ymin:0.2:Ymax);
% % S = dy/dt = slope at point (t,y)
% S = 3 - 2*y;
% L = sqrt(1 + S.^2); %length of the slope vector
% % Create a unit vector (hypotenuse) from L,S
% % scale by 0.5, color blue
% q = quiver(t,y, 1./L, S./L,0.5);
% %q.ShowArrowHead = 'off';
% axis([Xmin Xmax Ymin Ymax]);

clear,clc;
t = 0:0.1:10;
y0 =[20, 10, 5, 0, -10];
hold on
for n = 1:5
 eqn = 5 + (y0(n) - 5)*exp(-t);
 plot(t, eqn)
end
hold off
xlabel 't', ylabel 'y'
title '5 + (y0 - 5)*exp(-t) y0 = 20,10,5,0,-10'