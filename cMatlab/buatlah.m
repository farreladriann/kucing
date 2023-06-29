Xmin = -5
Xmax = 5
Ymin = -5
Ymax = 5
hold on
[Tdot, Ydot] = meshgrid(Xmin:0.2:Xmax, Ymin:0.2:Ymax)
yt = -2*Ydot + 5
LengthOfVector = sqrt(1 + yt.^2)
hasil = quiver(Tdot, Ydot, 1./LengthOfVector, yt./LengthOfVector, 0.5)

y0 = [20 5 5/2 0 -10]
t = -10:0.1:0
a = -2
b = -5
for k = 1:5
    y = b/a + (y0(k) - b/a)*exp(-2*-t)
    plot(t, y)
end
hold off