let hasStarted = false;
let videoWidth = 640;
let videoHeight = 480;

let activeFilters = 0x000000;
let useColor = true;
let useWASM = true;

let savedTimingData = [];
let maxTimingData = 50;
let timingDataSize = 0;
let saveData = false;
let saveTotal = 0;
let timeToFile = [];

//start the webcam on the server
function startWebcam() {
    //gets the video element to manipulate
    var video = document.getElementById("webcam");
    
    if (navigator.mediaDevices.getUserMedia) {
        //if the webcam is available, then start it
        navigator.mediaDevices.getUserMedia(
            { video: { 
                width: { ideal: videoWidth },
                height: { ideal: videoHeight }  
            }
        })
        .then(stream => {
            //start the stream and an event listener that lets the video play and starts initial functions
            video.srcObject = stream;
            video.addEventListener("canplay", e => {
                if (!hasStarted) {
                    let canvas = document.getElementById("convolutedImage");
                    canvas.setAttribute("width", videoWidth);
                    canvas.setAttribute("height", videoHeight);
                    setUpListeners();
                    startProgram();
                    hasStarted = true;
                }
            });
        })
        .catch(e => {
            console.log("Something went wrong!");
        });
    }
}

//sets up the event listener for each slider and radio button and the save button
function setUpListeners() {
    //all the sliders XOR the activeFilters variable for use in bitmasking later (1 in their corresponding filter spot means it's active)
    //they also reset the currently displayed timing data
    document.getElementById( "GB3" ).onclick = function () {
        activeFilters = activeFilters ^ 1;
        savedTimingData = [];
        timingDataSize = 0;
        document.getElementById( "timingData" ).innerHTML = "Waiting For Timing Data";
    }
    document.getElementById( "GB5" ).onclick = function () {
        activeFilters = activeFilters ^ 2;
        savedTimingData = [];
        timingDataSize = 0;
        document.getElementById( "timingData" ).innerHTML = "Waiting For Timing Data";
    }
    document.getElementById( "BB" ).onclick = function () {
        activeFilters = activeFilters ^ 4;
        savedTimingData = [];
        timingDataSize = 0;
        document.getElementById( "timingData" ).innerHTML = "Waiting For Timing Data";
    }
    document.getElementById( "SP" ).onclick = function () {
        activeFilters = activeFilters ^ 8;
        savedTimingData = [];
        timingDataSize = 0;
        document.getElementById( "timingData" ).innerHTML = "Waiting For Timing Data";
    }
    document.getElementById( "ED" ).onclick = function () {
        activeFilters = activeFilters ^ 16;
        savedTimingData = [];
        timingDataSize = 0;
        document.getElementById( "timingData" ).innerHTML = "Waiting For Timing Data";
    }
    document.getElementById( "EB" ).onclick = function () {
        activeFilters = activeFilters ^ 32;
        savedTimingData = [];
        timingDataSize = 0;
        document.getElementById( "timingData" ).innerHTML = "Waiting For Timing Data";
    }

    //the radio buttons will switch from RGB color to greyscale or from using WASM code to JS Native code
    //all of these also reset the currently displayed timing data
    document.getElementById( "RGB" ).onclick = function () {
        useColor = true;
        savedTimingData = [];
        timingDataSize = 0;
        document.getElementById( "timingData" ).innerHTML = "Waiting For Timing Data";
    }
    document.getElementById( "GR" ).onclick = function () {
        useColor = false;
        savedTimingData = [];
        timingDataSize = 0;
        document.getElementById( "timingData" ).innerHTML = "Waiting For Timing Data";
    }
    document.getElementById( "WASM" ).onclick = function () {
        useWASM = true;
        savedTimingData = [];
        timingDataSize = 0;
        document.getElementById( "timingData" ).innerHTML = "Waiting For Timing Data";
    }
    document.getElementById( "JS" ).onclick = function () {
        useWASM = false;
        savedTimingData = [];
        timingDataSize = 0;
        document.getElementById( "timingData" ).innerHTML = "Waiting For Timing Data";
    }

    //the button displays a progress bar od downloading the CSV and starts the downloading of timing data
    document.getElementById( "timing" ).onclick = function () {
        document.getElementById( "timing" ).disabled = true;
        document.getElementById( "bar" ).style.visibility = "visible";
        saveData = true;
    }
}

//this starts the program to start looking for convolution filters
function startProgram() {
    //gets the class object for WASM and JS
    let convolutionClass = new Module.Convolution();
    let convolutionClassJS = new ConvolutionClassJS();

    //gets the buffer for the second image and a pointer to its location, the WASM manipulates the pointer, the JS manipulates the buffer directly
    let imageSize = videoWidth*videoHeight*4;
    let outputImagePtr = Module._malloc(imageSize);
    let outputImageBuffer = new Uint8ClampedArray(Module.HEAP8.buffer, outputImagePtr, imageSize);
    
    //gets the video and canvase element to manipulate in the convolute function
    let videoElement = document.getElementById("webcam");
    let canvasElement = document.getElementById("convolutedImage");

    //continually calls convolute till the page is closed
    setInterval(convolute.bind(null, convolutionClass, convolutionClassJS, outputImagePtr, outputImageBuffer, imageSize, videoElement, canvasElement), 0);
}

//performs the convolution based on the WASM or JS code and updates the canvase
function convolute(convolutionClass, convolutionClassJS, outputImagePtr, outputImageBuffer, imageSize, videoElement, canvasElement) {
    //gets the canvas context to manipulate
    let context = canvasElement.getContext('2d');

    //draws the first or copy of previous image from previous iteration
    context.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

    //gets the image data to manipulate
    let imageData = context.getImageData(0, 0, videoWidth, videoHeight);

    //sets the image data that the JS will manipulate to the current image
    outputImageBuffer.set(imageData.data);

    //starts timing
    let t1 = performance.now();

    if(useWASM) {
        if(!useColor) {
            //if greyscale is selected, then turn the image grey
            convolutionClass.turnToGreyscale(outputImagePtr, imageSize);
        }
        //perform the convolution function from WASM based on active filters
        convolutionClass.applyFilter(outputImagePtr, videoWidth, videoHeight, useColor, activeFilters)
    }
    else {
        if(!useColor) {
            //if greyscale is selected, then turn the image grey
            convolutionClassJS.turnToGreyscale(outputImageBuffer, imageSize);
        }
        //perform the convolution function from WASM based on active filters
        convolutionClassJS.applyFilter(outputImageBuffer, videoWidth, videoHeight, useColor, activeFilters);
    }

    //ends timing
    let t2 = performance.now();

    //if the timing range is less than the max then add to the array otherwise...
    if(timingDataSize >= maxTimingData) {
        //remove a value and add the new one
        savedTimingData.shift();
        savedTimingData.push(t2-t1);
        //and update the live timing value
        document.getElementById("timingData").innerHTML = getTimingDataAvg() + " ms";
        if(saveData) {
            //if the save data button is pushed then perform the save timing data function
            saveTimingData(t2-t1);
        }
    }
    else {
        savedTimingData.push(t2-t1);
        timingDataSize++;
    }

    //put out the new image to the canvas element
    context.putImageData(new ImageData(outputImageBuffer, videoWidth, videoHeight), 0, 0);

}


//gets the average timing data over the specified timing range
function getTimingDataAvg() {
    let timeSum = 0;
    //loop through the timing loop history and sum the values to return the average
    for(let i = 0; i < timingDataSize; i++) {
        timeSum = timeSum + savedTimingData[i];
    }
    return (timeSum/timingDataSize).toFixed(3);
}

//save the timing data over the last 2000 iterations
function saveTimingData(currTime) {
    //loop for 2000 convolution iterations
    if(saveTotal < 2000) {
        //add the current time to the total and update the progress bar
        timeToFile.push(currTime);
        saveTotal++;
        let percent = Math.floor((saveTotal/2000)*100);
        document.getElementById("progress").style=`width: ${percent}%`;
        document.getElementById("progress").innerHTML=`${percent}% Done`;
    }
    else {
        //when done set up a csv to download
        let csvContent = "data:text/csv;charset=utf-8,";

        //add the to the csv file
        timeToFile.forEach( data => {
            csvContent += data + "\r\n";
        });

        //pop the file to download in the browser
        let encodedUri = encodeURI(csvContent);
        window.open(encodedUri);

        //reset the save values/array and progress bar and button
        saveTotal = 0;
        timeToFile = [];
        saveData = false;
        document.getElementById("progress").style=`width: 0%`;
        document.getElementById("progress").innerHTML=`0% Done`;
        document.getElementById( "timing" ).disabled = false;
        document.getElementById( "bar" ).style.visibility = "hidden";
    }
}

startWebcam();