#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

int main()
{
    string x;
    cin >> x;
    int len = x.length();
    int A = 0, T = 0, G = 0, C = 0;
    for (int i = 0; i < len; i += 3)
    {
        if (x[i] == 'A' && x[i] == x[i + 1] && x[i] == x[i + 2])
            A++;
        if (x[i] == 'T' && x[i] == x[i + 1] && x[i] == x[i + 2])
            T++;
        if (x[i] == 'G' && x[i] == x[i + 1] && x[i] == x[i + 2])
            G++;
        if (x[i] == 'C' && x[i] == x[i + 1] && x[i] == x[i + 2])
            C++;
    }
    if (A == 1)
    {
        cout << "DJAWA" << endl;
        cout << "AAA" << endl;
    }
    else if (T == 1)
    {
        cout << "DJAWA" << endl;
        cout << "TTT" << endl;
    }
    else if (G == 1)
    {
        cout << "DJAWA" << endl;
        cout << "GGG" << endl;
    }
    else if (C == 1)
    {
        cout << "DJAWA" << endl;
        cout << "CCC" << endl;
    }
    else
    {
        cout << "BUKAN DJAWA" << endl;
        if (A > 1)
            cout << "AAA" << endl;
        else if (T > 1)
            cout << "TTT" << endl;
        else if (G > 1)
            cout << "GGG" << endl;
        else if (C > 1)
            cout << "CCC" << endl;
    }
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */
    return 0;
}
