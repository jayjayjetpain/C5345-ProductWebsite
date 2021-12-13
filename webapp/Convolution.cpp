#include "Convolution.h"

Convolution::Convolution() {
    //defines the 6 convolution filters used for the applyFilter function
    float tempValGB[9] = {0.0625,0.125,0.0625,0.125,0.25,0.125,0.0625,0.125,0.0625};
    float tempValG5[25] = {0.00390625,0.015625,0.0234375,0.015625,0.00390625,
                           0.015625,0.0625,0.09375,0.0625,0.015625,
                           0.0234375,0.09375,0.140625,0.09375,0.0234375,
                           0.015625,0.0625,0.09375,0.0625,0.015625,
                           0.00390625,0.015625,0.0234375,0.015625,0.00390625};
    float tempValBB[9] = {0.11111,0.11111,0.11111,0.11111,0.11111,0.11111,0.11111,0.11111,0.11111};
    float tempValSP[9] = {0,-1,0,-1,5,-1,0,-1,0};
    float tempValED[9] = {-1,-1,-1,-1,8,-1,-1,-1,-1};
    float tempValEB[9] = {-2,-1,0,-1,1,1,0,1,2};

    //pushes the value arrays back into the list of filters
    filterList.push_back(tempValGB);
    filterList.push_back(tempValG5);
    filterList.push_back(tempValBB);
    filterList.push_back(tempValSP);
    filterList.push_back(tempValED);
    filterList.push_back(tempValEB);
}

Convolution::~Convolution() {
}

//used to convert the image to greyscale using the linear scale Clinear = 0.2126 R + 0.7152 G + 0.0722 B
void Convolution::turnToGreyscale(uintptr_t imagePtr, unsigned int arrayLen) {
    //using uintptr_t since embind doesn't allow exposure of pointers, cast to uint8_t to access the array of the image
    uint8_t* newImagePtr = reinterpret_cast<uint8_t*>(imagePtr);

    //calculates the greyscale value and sets it in all rgb channels
    for(int i = 0; i < arrayLen; i += 4) {
        float greyVal = 0.2126*newImagePtr[i] + 0.7152*newImagePtr[i+1] + 0.0722*newImagePtr[i+2];
        newImagePtr[i] = greyVal;
        newImagePtr[i+1] = greyVal;
        newImagePtr[i+2] = greyVal;
    }
}

//used to apply one of the convolution filters to the image passed in
void Convolution::applyFilter(uintptr_t imagePtr, unsigned int width, unsigned int height, bool useColor, unsigned long filterApplied) {
    //gets a temp image to work on instead of directly editing the original in the middle
    float* tempImage = new float[width*height*4];

    //using uintptr_t since embind doesn't allow exposure of pointers, cast to uint8_t to access the array of the image
    uint8_t* newImagePtr = reinterpret_cast<uint8_t*>(imagePtr);

    //gets whether to calculate the convolution values using the rgb values or the greyscale values
    int numChannels = useColor ? 3 : 1;

    //starts a loop to go through all the filters (they can stack on an image)
    for(int filNum = 0; filNum < this->filterList.size(); filNum++) {
        //using a bit mask to determine which filters are active, if there is a one in the corresponding bit location to the current filter, then apply it
        int mask = 1 << filNum;
        if((mask & filterApplied) == mask) {
            //the default filter size is 3x3, only the second is 5x5 (updated later)
            int filSize = 3;
            //get current filter to use for easier access
            float* tempFilter = filterList.at(filNum);
            if(filNum == 1) { filSize = 5; }

            //loop through each row of pixels in the image
            for(int rowNum = 0; rowNum < height; rowNum++) {
                //loop through each pixel in each column in each row in the image
                for(int colNum = 0; colNum < width; colNum++) {
                    //loop through each channel (rgb or grey) for each pixel in each column in each row in the image
                    for(int chanNum = 0; chanNum < numChannels; chanNum++) {
                        //for every pixel, we calculate a new sum value based on a filter which takes weights of the pixels around it within the current filter (3x3 or 5x5)
                        float tempSum = 0;
                        
                        //loop through each filter row to get each weight
                        for(int fRowNum = 0; fRowNum < filSize ; fRowNum++) {
                            //loop through each sector of each column of each row in the filter
                            for(int fColNum = 0; fColNum < filSize; fColNum++) {
                                //gets the offset to the "current" position in the filter being looked at and being manipulated
                                //the filter is "focused" on the current pixel so this allows to go "backward" and "up" in the array to access the values
                                int currfilterRowPos = -(filSize/2) + fRowNum;
                                int currfilterColPos = -(filSize/2) + fColNum;

                                //logic to check if the filter sector is currently outside of the image (shouldn't use and would cause errors)
                                if((rowNum + currfilterRowPos) < 0 || (rowNum + currfilterRowPos) >= height ||
                                   (colNum + currfilterColPos) < 0 || (colNum + currfilterColPos) >= width) { continue; }
                                else {
                                    //gets the value based on the filter and the current pixel value and adds their product to the sum
                                    float filterVal = tempFilter[fRowNum*3 + fColNum];
                                    float imageVal = (float) newImagePtr[(rowNum+currfilterRowPos)*width*4 + (colNum+currfilterColPos)*4 + chanNum];
                                    tempSum += (filterVal * imageVal);
                                }
                            }
                        }

                        //updates the tempImage with the convoluted values
                        tempImage[rowNum*width*4 + colNum*4 + chanNum] = tempSum;
                    }
                }
            }

            //index to keep track of whick pixel we are on while we copy from the temp image to the real one
            int imageIndex = 0;
            while(imageIndex < width*height) {
                if(useColor) {
                    //if using color, get each color value and normal it between 0 and 255 to not cause image issues and then update each channel of the original
                    for(int i = 0; i < 4; i++) {
                        int colorVal = tempImage[imageIndex*4 + i];
                        if(colorVal < 0) { colorVal = 0; }
                        else if(colorVal > 255) { colorVal = 255; }
                        if(i == 3) { newImagePtr[imageIndex*4 + i] = 255; }
                        else { newImagePtr[imageIndex*4 + i] = colorVal; }
                    }
                }
                else {
                    //if not using color, get the color value and normal it between 0 and 255 to not cause image issues and then update all channel of the original
                    int colorVal = tempImage[imageIndex*4];
                    if(colorVal < 0) { colorVal = 0; }
                    else if(colorVal > 255) { colorVal = 255; }
                    for(int i = 0; i < 4; i++) {
                        if(i == 3) { newImagePtr[imageIndex*4 + i] = 255; }
                        else { newImagePtr[imageIndex*4 + i] = colorVal; }
                    }
                }
                imageIndex++;
            }
        }
    }
    delete[] tempImage;
}