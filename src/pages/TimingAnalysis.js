import React from "react";
import AnimationRevealPage from "components/helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import HeaderSub from "components/headers/HeaderSub.js";
import Footer from "components/footers/Footer";
import { SectionHeading } from "components/misc/Headings";

import WRW from "../images/WasmRgbWeb.png"
import WGW from "../images/WasmGreyWeb.png"
import JRW from "../images/JsRgbWeb.png"
import JGW from "../images/JsGreyWeb.png"
import RIW from "../images/RgbIntervalsWeb.png"
import CIW from "../images/CodeIntervalsWeb.png"

import WMRN from "../images/WasmMultiRgbNative.png"
import WMGN from "../images/WasmMultiGreyNative.png"
import WSRN from "../images/WasmSingleRgbNative.png"
import WSGN from "../images/WasmSingleGreyNative.png"
import JRN from "../images/JsRgbNative.png"
import JGN from "../images/JsGreyNative.png"
import FIN from "../images/FilterIntervalsNative.png"
import RIN from "../images/RgbIntervalsNative.png"
import CIN from "../images/CodeIntervalsNative.png"

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900 mb-10`;
const Text = styled.div`
  ${tw`text-lg  text-gray-800`}
  p {
    ${tw`mt-2 leading-loose`}
  }
  h1 {
    ${tw`text-3xl font-bold mt-10`}
  }
  h2 {
    ${tw`text-2xl font-bold mt-8`}
  }
  h3 {
    ${tw`text-xl font-bold mt-6`}
  }
  ul {
    ${tw`list-disc list-inside`}
    li {
      ${tw`ml-2 mb-3`}
      p {
        ${tw`mt-0 inline leading-normal`}
      }
    }
  }
`;
export default ({ headingText = "Timing Analysis for WebApp and Native App" }) => {
  return (
    <AnimationRevealPage>
      <HeaderSub />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{headingText}</Heading>
          </HeadingRow>
          <Text>
            <p>Last updated: December 12, 2021</p>

            <p>
              This Section will show raw timing data as well as analysis for both the WebApp and the Native Application. This will be in the form of screenshots of tabulated data as well as some description of descriptive statistics.
            </p>

            <h1>Procedure of Collecting Data and Analysis Method</h1>
            <h2>Collecting Data</h2>
            <p>
              Data was collected using the "Timing Data" Section from both apps. This collects 2000 renders of the webcam and saves the values to a csv file. This was collected for a variety of filter/color/code options.
            </p>
            <p>
              For the WebApp, data was collected for each filter individually, for color and greyscale for both WASM and JS implementations. Similarly for the Natvie App, data was collected using the filters individually, for color and greyscale for WASM multithreaded, WASM single-threaded, and JS Native implementations.
            </p>

            <h2>Analysis Method</h2>
            <p>
              Using these data files, Excel's Descriptive Stattistics Module was used to perform One-Variable Descriptive Statistics with a Confidence Intervals with Confidence Level of 95%. This provided lists of tabular data that were transferred to a big Excel file, and confidence intervals were compared.
            </p>
            <p>
              Using the Confidence Intervals, those filter combinations whose intervals overlapped are said to not be statistically different, so for our purposes they perform the same.
            </p>
            
            <br /><br />

            <h1>WebApp Timing Analysis</h1>
            <h2>Raw Timing Analysis Description</h2>

            <p>
              From the data that I collected, there were a few pair of intervals that overlapped. Two pairs that overlapped were the WASM execution in color of the Edge Detection (LoG) and the JS execution in greyscale of the Box Blur and of the Sharpen and the WASM execution in color of the Gaussian Blur 3x3 and the JS execution in greyscale of the Gaussian Blur 3x3, although these doesn’t give much info. Others were the WASM execution of Gaussian Blur 3x3 and Edge Detection (LoG) for color, WASM execution of all but Gaussian Blur 5x5 for greyscale, JS execution of Gaussian Blur 3x3, Emboss, and Sharpen for color, and the JS execution of Gaussian Blur 3x3, Sharpen, and Box Blur for greyscale. For all these pairs, there is enough statistical evidence to show that the execution of convolution with the filters is the same.
            </p><br />
            <p>
              Based on the timing data collected, it appears that the WASM code performs about 2.19 times faster than the JS for both color and greyscale for Gaussian Blur 3x3. The WASM code performs about 2.52 times faster than the JS for both color and greyscale for Gaussian Blur 5x5. The WASM code performs about 2.18 times faster than the JS for both color and greyscale for Box Blur. The WASM code performs about 2.16 times faster than the JS for both color and greyscale for Sharpen. The WASM code performs about 2.32 times faster than the JS for both color and greyscale for Edge Detection (LoG). And the WASM code performs about 2.22 times faster than the JS for both color and greyscale for Emboss.
            </p><br />
            <p>
              Other timing data observations, for both code bases the greyscale calculations were over 2 times faster for every filter as expected since there is less looping. The greyscale performs about 2.18 and 2.2 times faster than the RGB for Gaussian Blur 3x3 (WASM and JS respectively). The greyscale performs about 2.59 and 2.64 times faster than the RGB for Gaussian Blur 5x5. The greyscale performs about 2.15 and 2.16 times faster than the RGB for Box Blur. The greyscale performs about 2.25 and 2.2 times faster than the RGB for Sharpen. The greyscale performs about 2.18 and 2.12 times faster than the RGB for Edge Detection (LoG). And the greyscale performs about 2.13 and 2.16 times faster than the RGB for Emboss. This may show that Gaussian Blur 3x3, 5x5, Box Blur, and Emboss are faster in scale relative for WASM over JS and Sharpen and Edge Detection (LoG) are slightly faster in scale for JS over WASM. In scale meaning if the code bases performed relatively the same (JS twice as fast), then those filters perform slightly better on the corresponding bases.
            </p><br />
            <p>
              Lastly, the timing data shows that for WASM, the quickest to the slowest filters are Emboss, Box Blur, Gaussian Blur 3x3 and Edge Detection (LoG), Sharpen, Gaussian Blur 5x5 for color and Gaussian Blur 3x3, Emboss, Sharpen, Edge Detection (LoG) and Box Blur, Gaussian Blur 5x5 for greyscale. And then for JS the order is Box Blur, Emboss and Gaussian Blur 3x3, Sharpen, Edge Detection (LoG), Gaussian Blur 5x5 for color and Gaussian Blur 3x3 and Sharpen and Box Blur, Emboss, Edge Detection (LoG), Gaussian Blur 5x5 for greyscale.
            </p>

            <h2>Raw Timing Data</h2>
            <h3>WASM Timing Data</h3>

            <img src={WRW} alt="WasmRgbWeb"></img>
            <img src={WGW} alt="WasmGreyWeb"></img>

            <h3>JS Timing Data</h3>

            <img src={JRW} alt="JsRgbWeb"></img>
            <img src={JGW} alt="JsGreyWeb"></img>

            <h3>Confidence Intervals Comparisons</h3>

            <img src={RIW} alt="RgbIntervalsWeb"></img><br />
            <img src={CIW} alt="CodeIntervalsWeb"></img>

            <br /><br />

            <h1>Native App Timing Analysis</h1>
            <h2>Raw Timing Analysis Description</h2>

            <p>
              When comparing between multithreading and WASM and JS, there is no overlap between their confidence intervals. However, within multithreading executions, the Gaussian Blur 3x3, Box Blur, Edge Detection (or LoG), and Emboss overlap and Emboss and Sharpen overlap for RGB and all but the Gaussian Blur 5x5 overlap for greyscale. Other intervals that overlap (similar to Lab 2) are the WASM execution in color of the Edge Detection (LoG) and the JS execution in greyscale of the Box Blur and of the Sharpen and the WASM execution in color of the Gaussian Blur 3x3 and the JS execution in greyscale of the Gaussian Blur 3x3, the WASM execution of Gaussian Blur 3x3 and Edge Detection (LoG) for color, WASM execution of all but Gaussian Blur 5x5 for greyscale, JS execution of Gaussian Blur 3x3, Emboss, and Sharpen for color, and the JS execution of Gaussian Blur 3x3, Sharpen, and Box Blur for greyscale. For all these there is enough statistical evidence to show that the execution of convolution with the filters is the same.
            </p><br />
            <p>
              Based on the timing data collected, the multithreading code runs about 1.77 times faster than normal WASM for RGB and 1.52 times faster for greyscale with the Gaussian Blur 3x3 filter. Multithreading code runs about 1.63 times faster than normal WASM for RGB and 1.62 times faster for greyscale with the Gaussian Blur 5x5 filter. Multithreading code runs about 1.75 times faster than normal WASM for RGB and 1.54 times faster for greyscale with the Box Blur 3x3 filter. Multithreading code runs about 1.75 times faster than normal WASM for RGB and 1.54 times faster for greyscale with the Sharpen filter. Multithreading code runs about 1.79 times faster than normal WASM for RGB and 1.53 times faster for greyscale with the Edge Detection (or LoG) filter. And Multithreading code runs about 1.69 times faster than normal WASM for RGB and 1.52 times faster for greyscale with the Emboss filter.
            </p><br />
            <p>
              Compared to the native JS code, the multithreading ran 3.8 to 4.1 times faster using RGB colors and it ran 3.3 to 3.6 times faster for all filters except Gaussian Blur 5x5 where it ran 4 times faster with greyscale values. Using all this data, on average we can see that multithreading provides a larger improvement when applying convolution to RGB images versus those in greyscale. The one exception seems to be using the Gaussian Blur 5x5 filter, as for both RGB and greyscale images, multithreading improves basic WASM by about 1.64 times and improves JS by about 4.1 times.
            </p><br />
            <p>
              Lastly, within the multithreading WASM, the quickest to slowest filters are Gaussian Blur 3x3 and Edge Detection (or LoG) and Box Blur and Emboss, Sharpen, and Gaussian Blur 5x5 for RGB and Sharpen and Box Blur and Edge Detection (or LoG), Emboss and Gaussian Blur 3x3, and Gaussian Blur 5x5 for greyscale.
            </p>

            <h2>Raw Timing Data</h2>
            <h3>WASM Multithreaded Timing Data</h3>

            <img src={WMRN} alt="WasmMultiRgbNative"></img>
            <img src={WMGN} alt="WasmMultiGreyNative"></img>

            <h3>WASM Single-Threaded Timing Data</h3>

            <img src={WSRN} alt="WasmSingleRgbNative"></img>
            <img src={WSGN} alt="WasmSingleGreyNative"></img>

            <h3>JS Timing Data</h3>

            <img src={JRN} alt="JsRgbNative"></img>
            <img src={JGN} alt="JsGreyNative"></img>

            <h3>Confidence Intervals Comparisons</h3>

            <img src={FIN} alt="FilterIntervalsNative"></img><br />
            <img src={RIN} alt="RgbIntervalsNative"></img><br />
            <img src={CIN} alt="CodeIntervalsNative"></img>
            
            
           
          </Text>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
