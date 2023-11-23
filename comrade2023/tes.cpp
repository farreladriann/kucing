#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
#include <utility>
using namespace std;

string x;
int len;
bool udah[10000] = {false};


int main() {
    int ke1=1, ke2=0, ke3=0, ke4=0, ke5=0;
    cin >> x;
    len = x.length();
    for (int i = 0; i < len; i++) 
    {
        if (udah[i]) continue;
        int ind;
        if (x[i]=='{' || x[i]=='(' || x[i]=='[' || x[i]=='<')
        {
            udah[i] = true;
        }
        if (x[i]=='}' || x[i]==')' || x[i]==']' || x[i]=='>')
        {
            if (!udah[i])
            {
                ke1 = 0;
                break;
            }
        }
        while (true)
        {
            int lebihdarii = i+1;
            string tofind;
            if (x[i] == '{') tofind = "}";
            if (x[i] == '(') tofind = ")";
            if (x[i] == '[') tofind = "]";
            if (x[i] == '<') tofind = ">";
            int ind = x.find(tofind, lebihdarii);
            if (udah[ind]) ind++;
            else
            {
                udah[ind] = true;
                break;
            }
            if (ind == -1) break;
        }
        
        if (ind != -1)
        {
            if (x[i] == '{') ke2++;
            if (x[i] == '[') ke3++;
            if (x[i] == '(') ke4++;
            if (x[i] == '<') ke5++;
        }
        udah[ind] = true;
    }
    if (!ke1)
    {
        cout << ke1 << endl;
        cout << 0 << endl;
        cout << 0 << endl;
        cout << 0 << endl;
        cout << 0 << endl;
    }
    else
    {
        cout << ke1 << endl;
        cout << ke2 << endl;
        cout << ke3 << endl;
        cout << ke4 << endl;
        cout << ke5 << endl;
    }
    
    return 0;
}
