import React from "react";
import tw from "twin.macro";
import AnimationRevealPage from "components/helpers/AnimationRevealPage.js";
import fileAccess from "../images/FileAccess.PNG";
import notification from "../images/Notification.png";
import multithreading from "../images/Multithreading.PNG";


import HeaderMain from "components/headers/HeaderMain.js";
import AppFeatures from "components/features/AppFeatures.js";
import LearnMore from "components/banners/LearnMore.js";
import Footer from "components/footers/Footer";
import MainFeature from "components/features/MainFeature.js";
import DownloadApp from "components/banners/DownloadApp";

const HighlightedText = tw.span`text-primary-100`
const Subheading = tw.span`uppercase tracking-wider text-sm`;
const Container = tw.div`-mx-8 px-8`;

export default () => {
  return (
    <AnimationRevealPage>
      <HeaderMain />
      <AppFeatures 
        heading={<>Amazing <HighlightedText>Features</HighlightedText></>}
        />
      {/* <FeatureStats/> */}
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
          heading="Multithreaded Processing"
          description="Utilizing SharedArrayBuffers, you can use multithreaded WebAssembly code to perform convolutions faster using your computer's CPU cores."
          imageSrc={multithreading}
        />
      </Container>
      <DownloadApp
        subheading = "Download Native App"
        text = "Download the Native version of the app in Window/Mac/Linux for the extra features."
      />
      <LearnMore/>
      <Footer />
    </AnimationRevealPage>
  );
}
