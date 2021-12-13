import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { Container as ContainerBase, ContentWithPaddingXl } from "components/misc/Layouts";
import { SectionDescription } from "components/misc/Typography";

const Container = tw(ContainerBase)`my-8 lg:my-10 text-primary-500 -mx-8 px-8`;
const HeadingContainer = tw.div``;
const Heading = tw(SectionHeading)`sm:text-3xl md:text-4xl lg:text-5xl`;
const Subheading = tw(SubheadingBase)`text-primary-100 text-center`;
const Description = tw(SectionDescription)`text-primary-100 text-center mx-auto max-w-screen-md`;

const StatsContainer = tw.div`mt-8 flex flex-col sm:flex-row items-center justify-center flex-wrap max-w-screen-md justify-between mx-auto`
const Stat = tw.div`flex flex-col text-center p-4 tracking-wide`
const StatKey = tw.div`text-xl font-medium`
const StatValue = tw.div`text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-black`
export const NavLink = tw.a`
  
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

export default ({
  subheading = "",
  heading = "Fast Timing Processing",
  description1 = "Performing Image Processing at Fast Speeds. View the ",
  description2 = " page for more details and documentation on the app's performance.",
  stats = [
    {
      key: "2 3x3 filter w/ Color and Single-Threaded WASM --> ~55.5ms Latency per Render",
      value: "Example 1 - Webapp",
    },    
    {
      key: "All filters w/ Greyscale and Single-Threaded WASM --> ~72.5ms Latency per Render",
      value: "Example 2 - Webapp",
    },
    {
      key: "2 3x3 filter w/ Color and Multithreaded WASM --> ~26.5ms Latency per Render",
      value: "Example 3 - Native App",
    },
    {
      key: "All filter w/ Greyscale and Multithreaded WASM --> ~38ms Latency per Render",
      value: "Example 4 - Native App",
    }
  ]
}) => {
  return (
    <Container>
      <ContentWithPaddingXl>
        <HeadingContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
          <Heading>{heading}</Heading>
          {description1 && <Description>{description1}<NavLink href="#">Timing Anaylsis</NavLink>{description2}</Description>}
        </HeadingContainer>
        <StatsContainer>
          {stats.map((stat, index) => (
            <Stat key={index}>
              <StatValue>{stat.value}</StatValue>
              <StatKey>{stat.key}</StatKey>
            </Stat>
          ))}
        </StatsContainer>
      </ContentWithPaddingXl>
    </Container>
  );
};
