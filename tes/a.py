# Enter your code here. Read input from STDIN. Print output to STDOUT
import re

n = int(input())

textLS = []

for i in range(n):
    s = input()
    textLS.append(s)

t = int(input())

queryLS = []

for i in range(t):
    query = input()
    queryLS.append(query)

hasilLS = []
    
for i in range(t):
    sum = 0
    for j in range(n):
        pattern = re.compile(r'\b' + queryLS[i] + r'\b|^' + queryLS[i] + r'\b|\b' + queryLS[i] +  r'$', flags=re.MULTILINE)
        matches = re.findall(pattern, textLS[j])
        sum += len(matches)
    hasilLS.append(sum)

for i in range(len(hasilLS)):
    print(hasilLS[i])
    
^tac{2,}((?<!tic)tic(?!tic))(tac|((?<!tic)tic(?!tic)))+$