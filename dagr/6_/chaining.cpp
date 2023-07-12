#include <iostream>
#include <string>

class Car {
    std::string color;
    std::string model;
public:
    Car& setColor(const std::string& color) {
        this->color = color;
        return *this;
    }

    Car& setModel(const std::string& model) {
        this->model = model;
        return *this;
    }

    void print() const {
        std::cout << "Color: " << color << ", Model: " << model << std::endl;
    }
};

int main() {
    Car car;
    car.setColor("Red").setModel("Bugatti");
    car.print();

    return 0;
}
