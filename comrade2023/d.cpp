#include <iostream>
#include <stack>
#include <map>
using namespace std;

int main() {
    string s;
    cin >> s;

    stack<char> st;
    map<char, char> pairs = {{')', '('}, {'}', '{'}, {']', '['}, {'>', '<'}};
    map<char, int> counts;

    for (char c : s) {
        if (pairs.count(c)) {
            if (st.empty() || st.top() != pairs[c]) {
                cout << "0\n0\n0\n0\n0\n";
                return 0;
            }
            st.pop();
            counts[c]++;
        } else {
            st.push(c);
        }
    }

    if (!st.empty()) {
        cout << "0\n0\n0\n0\n0\n";
        return 0;
    }

    cout << "1\n";
    cout << counts['}'] << "\n";
    cout << counts[']'] << "\n";
    cout << counts[')'] << "\n";
    cout << counts['>'] << "\n";

    return 0;
}