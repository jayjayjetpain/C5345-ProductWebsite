import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SectionHeading, Subheading as SubheadingBase } from "../misc/Headings.js";
import { SectionDescription } from "../misc/Typography.js";

import defaultCardImage from "../../images/filter.png";

import FilterIconImage from "../../images/filter.png";
import ColorIconImage from "../../images/color.png";
import CodeIconImage from "../../images/code.png";
import TimeIconImage from "../../images/time.png";
import ElectronIconImage from "../../images/electron.png";

const Container = tw.div`relative bg-primary-900 -mx-8 px-8 text-gray-100`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-20 md:py-24`}
`;
const Subheading = tw(SubheadingBase)`mb-4 text-gray-100`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center text-gray-300`;

const VerticalSpacer = tw.div`mt-10 w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 max-w-xs`}
`;

const Card = styled.div`
  ${tw`flex flex-col items-center sm:items-start text-center sm:text-left h-full mx-4 px-2 py-8`}
  .imageContainer {
    ${tw`bg-gray-100 text-center rounded-full p-5 flex-shrink-0`}
    img {
      ${tw`w-6 h-6`}
    }
  }

  .textContainer {
    ${tw`mt-6`}
  }

  .title {
    ${tw`tracking-wider font-bold text-xl leading-none`}
  }

  .description {
    ${tw`mt-2 font-normal text-gray-400 leading-snug`}
  }
`;

export default ({
  cards = null,
  heading = "Amazing Features",
  subheading = "",
  description = "Perform Real-Time Image Processing with a Variety of differnt Filters and Options."
}) => {

  const defaultCards = [
    {
      imageSrc: FilterIconImage,
      title: "Convolutional Filters",
      description: "Choose from one or more filters to apply to your webcam/image."
    },
    {
      imageSrc: ColorIconImage,
      title: "Color Options",
      description: "Choose to view your webcam in color or greyscale. Greyscale images process faster."
    },
    {
      imageSrc: CodeIconImage,
      title: "Code-Base Options",
      description: "Choose from a native JS implementation or use WebAssembly."
    },    
    {
      imageSrc: TimeIconImage,
      title: "Timing Analysis",
      description: "Use the \"Timing Data\" section to view the processing latency for the current options selected. Use the button to save the data to a CSV file of last 2000 renders."
    },
    {
      imageSrc: ElectronIconImage,
      title: "Native App Features",
      description: "Use the native application to get access to more features such as Multithreading and Local File Processing."
    }
  ];

  if (!cards) cards = defaultCards;

  return (
    <Container>
      <ThreeColumnContainer>
        {subheading && <Subheading>{subheading}</Subheading>}
        <Heading>{heading}</Heading>
        {description && <Description>{description}</Description>}
        <VerticalSpacer />
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <span className="imageContainer">
                <img src={card.imageSrc || defaultCardImage} alt="" />
              </span>
              <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
                <p className="description">
                  {card.description || "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."}
                </p>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
    </Container>
  );
};
