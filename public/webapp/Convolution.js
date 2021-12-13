//JS Implementation of Convolution.cpp/h
class ConvolutionClassJS {

    //public member functions similar to the vector in c++
    numFilters = 0;
    filterList = [];

    constructor() {
        //creates the filters with prototype arrays a little more elegantly than c++
        this.filterList.push([1/16,1/8,1/16,1/8,1/4,1/8,1/16,1/8,1/16]);
        this.filterList.push([1/256,1/64,3/128,1/64,1/256, 1/64,1/16,3/32,1/16,1/64, 3/128,3/32,9/64,3/32,3/128, 
            1/64,1/16,3/32,1/16,1/64, 1/256,1/64,3/128,1/64,1/256]);
        this.filterList.push([1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9]);
        this.filterList.push([0,-1,0,-1,5,-1,0,-1,0]);
        this.filterList.push([-1,-1,-1,-1,8,-1,-1,-1,-1]);
        this.filterList.push([-2,-1,0,-1,1,1,0,1,2]);
        this.numFilters = 6;
    }

    //used to convert the image to greyscale using the linear scale Clinear = 0.2126 R + 0.7152 G + 0.0722 B
    turnToGreyscale(image, imageLength) {
        for(let i = 0; i < imageLength; i += 4) {
            //calculates the greyscale value and sets it in all rgb channels
            let greyVal = 0.2126*image[i] + 0.7152*image[i+1] + 0.0722*image[i+2];
            image[i] = greyVal;
            image[i+1] = greyVal;
            image[i+2] = greyVal;
        }
    }

    //used to apply one of the convolution filters to the image passed in
    applyFilter(image, width, height, useColor, filterApplied) {
        //gets a temp image to work on instead of directly editing the original in the middle
        let tempImage = new Float32Array(width*height*4);

        //gets whether to calculate the convolution values using the rgb values or the greyscale values
        let numChannels = useColor ? 3 : 1;

        //starts a loop to go through all the filters (they can stack on an image)
        for(let filNum = 0; filNum < this.numFilters; filNum++) {
            //using a bit mask to determine which filters are active, if there is a one in the corresponding bit location to the current filter, then apply it
            let mask = 1 << filNum;
            if((mask & filterApplied) == mask) {
                //the default filter size is 3x3, only the second is 5x5 (updated later)
                let filSize = 3;
                //get current filter to use for easier access
                let tempFilter = this.filterList[filNum];
                if(filNum == 1) { filSize = 5; }

                //loop through each row of pixels in the image
                for(let rowNum = 0; rowNum < height; rowNum++) {
                    //loop through each pixel in each column in each row in the image
                    for(let colNum = 0; colNum < width; colNum++) {
                        //loop through each channel (rgb or grey) for each pixel in each column in each row in the image
                        for(let chanNum = 0; chanNum < numChannels; chanNum++) {
                            //for every pixel, we calculate a new sum value based on a filter which takes weights of the pixels around it within the current filter (3x3 or 5x5)
                            let tempSum = 0;

                            //loop through each filter row to get each weight
                            for(let fRowNum = 0; fRowNum < filSize ; fRowNum++) {
                                for(let fColNum = 0; fColNum < filSize; fColNum++) {
                                    //gets the offset to the "current" position in the filter being looked at and being manipulated
                                    //the filter is "focused" on the current pixel so this allows to go "backward" and "up" in the array to access the values
                                    let currfilterRowPos = -Math.floor(filSize/2) + fRowNum;
                                    let currfilterColPos = -Math.floor(filSize/2) + fColNum;

                                    //logic to check if the filter sector is currently outside of the image (shouldn't use and would cause errors)
                                    if((rowNum + currfilterRowPos) < 0 || (rowNum + currfilterRowPos) >= height ||
                                    (colNum + currfilterColPos) < 0 || (colNum + currfilterColPos) >= width) { continue; }
                                    else {
                                        //gets the value based on the filter and the current pixel value and adds their product to the sum
                                        let filterVal = tempFilter[fRowNum*3 + fColNum];
                                        let imageVal = image[(rowNum+currfilterRowPos)*width*4 + (colNum+currfilterColPos)*4 + chanNum];
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
                let imageIndex = 0;
                while(imageIndex < width*height) {
                    if(useColor) {
                        //if using color, get each color value and then update each channel of the original
                        for(let i = 0; i < 4; i++) {
                            if(i == 3) { image[imageIndex*4 + i] = 255; }
                            else { image[imageIndex*4 + i] = tempImage[imageIndex*4 + i]; }
                        }
                    }
                    else {
                        //if not using color, get the color value and then update all channel of the original
                        for(let i = 0; i < 4; i++) {
                            if(i == 3) { image[imageIndex*4 + i] = 255; }
                            else { image[imageIndex*4 + i] = tempImage[imageIndex*4]; }
                        }
                    }
                    imageIndex++;
                }
            }
        }
    }
};