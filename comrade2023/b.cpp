#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;


int main() {
    int n;
    cin >> n;
    vector<int> grid;
    vector<int>width;
    vector<int> hasil;
    for (int i=0; i <n; i++)
    {
        int x;
        cin >> x;
        grid.push_back(x);
        int y;
        cin >> y;
        width.push_back(y);
        int numberOfSquaresOrRectangles = (grid[i] - width[i] + 1) * (grid[i]  - width[i] + 1);
        hasil.push_back(numberOfSquaresOrRectangles);
    }
    for (int i=0; i <n; i++)
    {
        cout << hasil[i] << endl;
    }

    return 0;
}
