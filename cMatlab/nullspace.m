u = [1/6 1/6 3/6 5/6]
P = u'*u

NULLSPACE

function NULLSPACE
    global P
    RRP = rref(P)
    for i = 1:width(RRP)
        
end