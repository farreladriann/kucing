% v = [1i; 1i; 1i;]
% u = [1+1i; 1-1i; 1+2i;]
% u'*u
% v'*v
% u'*v

% A = [1i 1  1i;
%      1  1i 1i;]
% % 
% % AH = A'
% % Ah1 = AH(1:3, 1)
% % Ah2 = AH(1:3, 2)
% % NA = null(A)
% % 
% % dot(NA, Ah2)
% 
% % A = [1 2;
% %     3 4;]
% % inv(A+1i*eye(2))
% 
% her = A' * A
% if her' == her
%     A
% end

% P = [0 1i 0;
%      0 0  1i;
%      1i 0 0;]
%  
% [V, D] = eig(2*eye(1)+5*P)

A = [1 1-1i;
     1+1i -1;] * 1/sqrt(3)

 [V, D] = eig(A)