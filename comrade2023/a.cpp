#include <iostream>

bool canFindSquareOrRectangle(int n, int width) {
    if (width > n) {
        return false;
    }
    int numberOfSquaresOrRectangles = (n - width + 1) * (n - width + 1);
    std::cout << "Number of squares or rectangles of width " << width << ": " << numberOfSquaresOrRectangles << std::endl;
    return true;
}

int main() {
    int n = 10;
    int width = 10;
    if (canFindSquareOrRectangle(n, width)) {
        std::cout << "You can find a square or rectangle of width " << width << " in a " << n << "x" << n << " grid." << std::endl;
    } else {
        std::cout << "You cannot find a square or rectangle of width " << width << " in a " << n << "x" << n << " grid." << std::endl;
    }
    return 0;
}