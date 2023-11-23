#include <iostream>
#include <stack>
#include <unordered_map>

// Fungsi untuk mendeteksi apakah kurung berpasangan
bool are_brackets_matching(const std::string& brackets) {
    std::stack<char> stack;
    std::unordered_map<char, char> bracket_pairs = {
        {'(', ')'},
        {'{', '}'},
        {'[', ']'},
        {'<', '>'}
    };

    for (char bracket : brackets) {
        if (bracket_pairs.find(bracket) != bracket_pairs.end()) {
            // Kurung buka
            stack.push(bracket);
        } else if (!stack.empty() && bracket == bracket_pairs[stack.top()]) {
            // Kurung tutup yang sesuai dengan kurung buka paling atas di stack
            stack.pop();
        } else {
            // Kurung tutup yang tidak sesuai dengan kurung buka yang diharapkan
            return false;
        }
    }

    // Program valid jika stack kosong setelah mengecek semua kurung
    return stack.empty();
}

// Fungsi untuk menghitung pasangan dari empat jenis kurung
std::unordered_map<char, int> count_bracket_pairs(const std::string& brackets) {
    std::unordered_map<char, int> bracket_count;
    std::stack<char> stack;
    std::unordered_map<char, char> bracket_pairs = {
        {'(', ')'},
        {'{', '}'},
        {'[', ']'},
        {'<', '>'}
    };

    for (char bracket : brackets) {
        if (bracket_pairs.find(bracket) != bracket_pairs.end()) {
            // Kurung buka
            stack.push(bracket);
        } else if (!stack.empty() && bracket == bracket_pairs[stack.top()]) {
            // Kurung tutup yang sesuai dengan kurung buka paling atas di stack
            stack.pop();
            bracket_count[bracket]++;
        }
    }

    return bracket_count;
}

int main() {
    std::string brackets;

    // Baca input
    std::cin >> brackets;

    // Deteksi apakah kurung berpasangan
    bool is_matching = are_brackets_matching(brackets);

    // Output hasil deteksi
    std::cout << (is_matching ? "1" : "0") << std::endl;

    if (is_matching) {
        // Menghitung dan menampilkan pasangan kurung
        std::unordered_map<char, int> bracket_pairs = count_bracket_pairs(brackets);
        std::cout << bracket_pairs['{'] << std::endl;
        std::cout << bracket_pairs['['] << std::endl;
        std::cout << bracket_pairs['('] << std::endl;
        std::cout << bracket_pairs['<'] << std::endl;
    } else {
        // Output 0 jika kurung tidak berpasangan
        std::cout << "0\n0\n0\n0\n";
    }

    return 0;
}
