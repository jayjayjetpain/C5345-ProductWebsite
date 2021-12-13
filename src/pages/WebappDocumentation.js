import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import HeaderSub from "components/headers/HeaderSub.js";
import Footer from "components/footers/Footer";
import { SectionHeading } from "components/misc/Headings";
import UML from "../images/UML.png"

const Header = tw(HeaderSub)`max-w-none`;
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

export default ({ headingText = "Webapp Documentation" }) => {
  return (
    <AnimationRevealPage>
      <Header />
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{headingText}</Heading>
          </HeadingRow>
          <Text>

            <p>Last updated: December 12, 2021</p>

            <p>Use the page to see developer documentation (API calls) and optional steps to set up a local server using the webapp code. This code can be found on the GitHub under the webapp folder.</p>

            <h1>API Documentation for the JS Library</h1>
            <ul>
              <li>
                <b>void turnToGreyscale(uintptr_t, unsigned int)</b><ul style={{ listStyleType: "circle" }}>
                <li>
                  <u>Function Description</u><ul style={{ listStyleType: "square" }}>
                  <li>
                    This function takes a pointer to the beginning of an image and the size of the image (its width times its height times 4 for each channel) and uses a linear conversion to convert the RGB values for each pixel to a greyscale value. This is done by using a linear transform of the current RGB values and summing the result to get a grey transform value.
                  </li>
                </ul></li>
                <li>
                  <u>Arguments:</u><ul style={{ listStyleType: "square" }}>
                  <li>
                    Uintptr_t imagePtr (required)<ul>
                    <li>
                      An unsigned integer type that is capable of storing a data pointer, meaning it has the same size as a typical pointer. This is used to point to the beginning of an image in order to perform the greyscale convolution on each pixel. Uintptr_t is used instead another pointer since Embind does not allow exposure of pointers directly.
                    </li>
                  </ul></li>
                  <li>
                    Unsigned int arrayLen (required)<ul>
                    <li>
                      A positive integer to represent the total size of the image referred to by the uintptr_t image pointer multiplied by 4 to account for all the channels (R, G, B and alpha). This is for ease of use.
                    </li>
                  </ul></li>
                </ul></li>
                <li>
                  <u>Expected Outputs and Assumptions</u><ul style={{ listStyleType: "square" }}>
                  <li>
                    Void --&gt; although the return type is void, this function should modify the RGB values for each pixel in the image and convert them to a greyscale value.
                  </li>
                  <li>
                    Inside this function, the uintptr_t is cast to a uint8_t pointer which is a pointer to an unsigned 8-bit integer array. This is done since the image data being passed in should contain data of the same type, which should be unsigned 8-bit integers. This is then updated with the greyscale values which should update the actual data passed-in.
                  </li>
                  <li>
                    After this function is called, the image or canvas element should be reloaded, or new image data should be sent to the 2d context in order to show the updated image now in greyscale.
                  </li>
                  <li>
                    This function should not conflict with the applyFilter function and should be able to be used in tandem with it and any convolution filters that may be applied in addition to the greyscale.  
                  </li>
                </ul></li>
              </ul></li>
              <br />
              <li>
                <b>void applyFilter(uintptr_t, unsigned int, unsigned int, bool, unsigned long)</b><ul style={{ listStyleType: "circle" }}>
                <li>
                  <u>Function Description</u><ul style={{ listStyleType: "square" }}>
                  <li>
                    This function is used to apply convolution filters onto an image that is passed in via an image pointer. Using the images width and height, this method loops through each pixel and applies each filter that is marked active. The method will loop through each function and only apply the filters (from the class’s filter list) whose index is marked active (see the filterApplied argument for details). In addition, this also takes into account greyscale and RGB images, and will not perform extra loops through the RGB channels if the image is not using color. This method creates a temporary image array equal in size to the that of the passed-in image and stores the manipulated data from the filters. At the end, the function loops through this temporary image and transfers the new values over to the image data.
                  </li>
                </ul></li>
                <li>
                  <u>Arguments:</u><ul style={{ listStyleType: "square" }}>
                  <li>
                    Uintptr_t imagePtr (required)<ul>
                    <li>
                      An unsigned integer type that is capable of storing a data pointer, meaning it has the same size as a typical pointer. This is used to point to the beginning of an image in order to perform the selected convolutions on each pixel. Uintptr_t is used instead another pointer since Embind does not allow exposure of pointers directly.
                    </li>
                  </ul></li>
                  <li>
                    Unsigned int width (required)<ul>
                    <li>
                      A positive integer that represents the number of columns of pixels in the image (e.g., 400x300). This is used to keep track of column number in each row that is currently being manipulated by the convolution filter.
                    </li>
                  </ul></li>
                  <li>
                    Unsigned int height (required)<ul>
                    <li>
                      A positive integer that represents the number of rows of pixels in the image (e.g., 400x300). This is used to keep track of row number that is currently being manipulated by the convolution filter.
                    </li>
                  </ul></li>
                  <li>
                    Bool useColor (required)<ul>
                    <li>
                      A Boolean value (true or false) that is used to determine whether color is being used in the image currently. If this is true, then all three channels (RGB) will be looked at by the convolution filter and updated accordingly. If this is false, only the first will be looked at, and all three RGB will be set to the same thing since this assumes the image is in greyscale.
                    </li>
                  </ul></li>
                  <li>
                    Unsigned long filterApplied (optional)<ul>
                    <li>
                      A positive integer value that stores which filters are going to be used in the function. The way this is used, is each binary digit corresponds to a filter (e.g., 0x000001 is the first filter and 0x010010 is the second and fifth filters). This is used to determine which filters are active by ORing its binary with a 1 in the binary digit that corresponds to the filter being processed (e.g., filter 1 is “Gaussian Blur 3x3” so the value will be ORed with 0x1, and filter 5 is “Edge Detection” so the value will be ORed with 0x10000). By default, this value is 0x000000 so no filters will be active.
                    </li>
                  </ul></li>
                </ul></li>
                <li>
                  <u>Expected Outputs and Assumptions</u><ul style={{ listStyleType: "square" }}>
                  <li>
                    Void --&gt; although the return type is void, this function should modify the RGB values for each pixel in the image according to the active filters to display a new convoluted image.
                  </li>
                  <li>
                    Inside this function, the uintptr_t is cast to a uint8_t pointer which is a pointer to an unsigned 8-bit integer array. This is done since the image data being passed in should contain data of the same type, which should be unsigned 8-bit integers. This is then updated with the convoluted values which should update the actual data passed-in.
                  </li>
                  <li>
                    After this function is called, the image or canvas element should be reloaded, or new image data should be sent to the 2d context in order to show the updated image potentially now convoluted. This also should be called multiple times in succession if using a webcam feed to show the filter’s affect constantly.
                  </li>
                  <li>
                    Although filterApplied has a default value, since this may be called repeatedly to actively show convolutions on an image, passing-in a 0 value long should be done.  
                  </li>
                  <li>
                    Before using this method with useColor set to false, the turnToGreyscale method should be utilized so that when only one channel is manipulated in the function, the correct effect will occur. If this method is not used or a greyscale image is not used, then the result of the convolution filters may not look correctly. 
                  </li>
                  <li>
                    The format of filterApplied should be properly formatted before passing it into this function. In this code base there is 6 filters, so the value of this variable should be between 0 and 63 which corresponds to 0x0 to 0x111111 (however, this is every filter on). If only one filter is to be used at a time, make sure the input is 0, 1, 2, 4, 8, 16, or 32 (0x0, 0x1, 0x10, 0x100, 0x1000, 0x10000, or 0x100000).  
                  </li>
                </ul></li>
              </ul></li>
            </ul>

            <h2>UML Class Diagram for Webapp</h2>
              <img src={UML} className="align-self-center" alt="UML" />

          </Text>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
