#pragma once

#include <iostream>
#include <vector>
#include <emscripten/bind.h>

class Convolution {

public:
    Convolution();
    ~Convolution();

    void turnToGreyscale(uintptr_t imagePtr, unsigned int arrayLen);
    void applyFilter(uintptr_t imagePtr, unsigned int width, unsigned int height, bool useColor, unsigned long filterApplied=0x000000);

private:
    std::vector<float*> filterList;
};

EMSCRIPTEN_BINDINGS(convolution_class) {
    emscripten::class_<Convolution>("Convolution")
        .constructor()
        .function("turnToGreyscale", &Convolution::turnToGreyscale)
        .function("applyFilter", &Convolution::applyFilter);
}