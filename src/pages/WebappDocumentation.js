import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import { SectionHeading } from "components/misc/Headings";
import UML from "../images/UML.png"

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

            {/* <h2>Definitions</h2>
            <p>For the purposes of these Terms and Conditions:</p>
            <ul>
              <li>
                <strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control
                with a party, where "control" means ownership of 50% or more of the shares, equity interest or other
                securities entitled to vote for election of directors or other managing authority.
              </li>
              <li>
                <strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement)
                refers to Treact Inc., Navi Mumbai.
              </li>
              <li>
                <strong>Country</strong> refers to: Maharashtra, India
              </li>
              <li>
                <strong>Service</strong> refers to the Website.
              </li>
              <li>
                <strong>Terms and Conditions</strong> (also referred as "Terms") mean these Terms and Conditions that
                form the entire agreement between You and the Company regarding the use of the Service.
              </li>
              <li>
                <strong>Third-party Social Media Service</strong> means any services or content (including data,
                information, products or services) provided by a third-party that may be displayed, included or made
                available by the Service.
              </li>
              <li>
                <strong>Website</strong> refers to Treact, accessible from https://treact.com
              </li>
              <li>
                <strong>You</strong> means the individual accessing or using the Service, or the company, or other legal
                entity on behalf of which such individual is accessing or using the Service, as applicable.
              </li>
            </ul>

            <h1>Acknowledgement</h1>
            <p>
              These are the Terms and Conditions governing the use of this Service and the agreement that operates
              between You and the Company. These Terms and Conditions set out the rights and obligations of all users
              regarding the use of the Service.
            </p>
            <p>
              Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms
              and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the
              Service.
            </p>
            <p>
              By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree
              with any part of these Terms and Conditions then You may not access the Service.
            </p>
            <p>
              You represent that you are over the age of 18. The Company does not permit those under 18 to use the
              Service.
            </p>
            <p>
              Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the
              Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection,
              use and disclosure of Your personal information when You use the Application or the Website and tells You
              about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before
              using Our Service.
            </p>

            <h1>Links to Other Websites</h1>
            <p>
              Our Service may contain links to third-party web sites or services that are not owned or controlled by the
              Company.
            </p>
            <p>
              The Company has no control over, and assumes no responsibility for, the content, privacy policies, or
              practices of any third party web sites or services. You further acknowledge and agree that the Company
              shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be
              caused by or in connection with the use of or reliance on any such content, goods or services available on
              or through any such web sites or services.
            </p>
            <p>
              We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites
              or services that You visit.
            </p>

            <h1>Termination</h1>
            <p>
              We may terminate or suspend Your access immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if You breach these Terms and Conditions.
            </p>
            <p>Upon termination, Your right to use the Service will cease immediately.</p>

            <h1>Limitation of Liability</h1>
            <p>
              Notwithstanding any damages that You might incur, the entire liability of the Company and any of its
              suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be
              limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased
              anything through the Service.
            </p>
            <p>
              To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be
              liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not
              limited to, damages for loss of profits, loss of data or other information, for business interruption, for
              personal injury, loss of privacy arising out of or in any way related to the use of or inability to use
              the Service, third-party software and/or third-party hardware used with the Service, or otherwise in
              connection with any provision of this Terms), even if the Company or any supplier has been advised of the
              possibility of such damages and even if the remedy fails of its essential purpose.
            </p>
            <p>
              Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or
              consequential damages, which means that some of the above limitations may not apply. In these states, each
              party's liability will be limited to the greatest extent permitted by law.
            </p>

            <h1>"AS IS" and "AS AVAILABLE" Disclaimer</h1>
            <p>
              The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty
              of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on
              behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims
              all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including
              all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement,
              and warranties that may arise out of course of dealing, course of performance, usage or trade practice.
              Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no
              representation of any kind that the Service will meet Your requirements, achieve any intended results, be
              compatible or work with any other software, applications, systems or services, operate without
              interruption, meet any performance or reliability standards or be error free or that any errors or defects
              can or will be corrected.
            </p>
            <p>
              Without limiting the foregoing, neither the Company nor any of the company's provider makes any
              representation or warranty of any kind, express or implied: (i) as to the operation or availability of the
              Service, or the information, content, and materials or products included thereon; (ii) that the Service
              will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information
              or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails
              sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware,
              timebombs or other harmful components.
            </p>
            <p>
              Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable
              statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to
              You. But in such a case the exclusions and limitations set forth in this section shall be applied to the
              greatest extent enforceable under applicable law.
            </p>

            <h1>Governing Law</h1>
            <p>
              The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the
              Service. Your use of the Application may also be subject to other local, state, national, or international
              laws.
            </p>

            <h1>Disputes Resolution</h1>
            <p>
              If You have any concern or dispute about the Service, You agree to first try to resolve the dispute
              informally by contacting the Company.
            </p>

            <h1>For European Union (EU) Users</h1>
            <p>
              If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the
              country in which you are resident in.
            </p>

            <h1>United States Legal Compliance</h1>
            <p>
              You represent and warrant that (i) You are not located in a country that is subject to the United States
              government embargo, or that has been designated by the United States government as a “terrorist
              supporting” country, and (ii) You are not listed on any United States government list of prohibited or
              restricted parties.
            </p>

            <h1>Severability and Waiver</h1>
            <h2>Severability</h2>
            <p>
              If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and
              interpreted to accomplish the objectives of such provision to the greatest extent possible under
              applicable law and the remaining provisions will continue in full force and effect.
            </p>

            <h2>Waiver</h2>
            <p>
              Except as provided herein, the failure to exercise a right or to require performance of an obligation
              under this Terms shall not effect a party's ability to exercise such right or require such performance at
              any time thereafter nor shall be the waiver of a breach constitute a waiver of any subsequent breach.
            </p>

            <h1>Translation Interpretation</h1>
            <p>
              These Terms and Conditions may have been translated if We have made them available to You on our Service.
            </p>
            <p>You agree that the original English text shall prevail in the case of a dispute.</p>

            <h1>Changes to These Terms and Conditions</h1>
            <p>
              We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision
              is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms
              taking effect. What constitutes a material change will be determined at Our sole discretion.
            </p>
            <p>
              By continuing to access or use Our Service after those revisions become effective, You agree to be bound
              by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the
              website and the Service.
            </p>

            <h1>Contact Us</h1>
            <p>If you have any questions about these Terms and Conditions, You can contact us:</p>

            <ul>
              <li>By email: support@example.com</li>
              <li>By phone number: 408.996.1010</li>
            </ul> */}
          </Text>
        </ContentWithPaddingXl>
      </Container>
      <Footer />
    </AnimationRevealPage>
  );
};
