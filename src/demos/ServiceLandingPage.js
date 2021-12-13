import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import fileAccess from "../images/FileAccess.PNG";
import notification from "../images/Notification.png";
import multithreading from "../images/Multithreading.PNG";


import Hero from "components/hero/TwoColumnWithFeaturesAndTestimonial.js";
import Features from "components/features/ThreeColWithSideImageWithPrimaryBackground";
// import MainFeature from "components/features/TwoColWithTwoHorizontalFeaturesAndButton.js";
import FeatureStats from "components/features/ThreeColCenteredStatsPrimaryBackground.js";
import Pricing from "components/pricing/TwoPlansWithDurationSwitcher.js";
import Blog from "components/blogs/GridWithFeaturedPost.js";
import Testimonial from "components/testimonials/TwoColumnWithImageAndRating.js";
import FAQ from "components/faqs/SingleCol.js";
import GetStarted from "components/cta/GetStartedLight.js";
import Footer from "components/footers/MiniCenteredFooter";
import MainFeature from "components/features/TwoColWithButton.js";
import DownloadApp from "components/cta/DownloadApp";

const HighlightedText = tw.span`text-primary-100`
const Subheading = tw.span`uppercase tracking-wider text-sm`;
const Container = tw.div`-mx-8 px-8 bg-primary-500`;

export default () => {
  return (
    <AnimationRevealPage>
      <Hero />
      <Features 
        heading={<>Amazing <HighlightedText>Features</HighlightedText></>}
        />
      <FeatureStats/>
      <Container >
        <MainFeature
          subheading={<Subheading>New Native App Feature</Subheading>}
          heading="Local File Access"
          description="Utilizing Electron's Local File Access System, you can select local PNG or JPG files from your computer and perform the same image processing to them as well as seve the results to your computer."
          imageSrc={fileAccess}
        />
        <MainFeature
          subheading={<Subheading>New Native App Feature</Subheading>}
          heading="Application Notifications"
          description="Utilizing Electron's Notifications, when opening the app and processing a local file, notifications will appear to show progress/statuses of the processing."
          imageSrc={notification}
          textOnLeft={false}
        />
        <MainFeature
          subheading={<Subheading>New Native App Feature</Subheading>}
          heading="Mutlithreaded Processing"
          description="Utilizing SharedArrayBuffers, you can use mutlithreaded WebAssembly code to perform convolutions faster using your computer's CPU cores."
          imageSrc={multithreading}
        />
      </Container>
      <DownloadApp
        subheading = "Download Native App"
        text = "Download the Native version of the app in Window/Mac/Linux for the extra features."
      />
      {/* <MainFeature
        heading={<>Cloud built by and for <HighlightedText>Professionals</HighlightedText></>}
      /> */}
      {/* <Testimonial 
        heading={<>Our Clients <HighlightedText>Love Us</HighlightedText></>}
      /> */}
      {/* <Pricing 
        heading={<>Flexible <HighlightedText>Plans</HighlightedText></>}
      /> */}
      {/* <FAQ
        heading={<>Any <HighlightedText>Questions ?</HighlightedText></>}
      /> */}
      {/* <Blog
        subheading="Blog"
        heading={<>We love <HighlightedText>Writing</HighlightedText></>}
      /> */}
      <GetStarted/>
      <Footer />
    </AnimationRevealPage>
  );
}
