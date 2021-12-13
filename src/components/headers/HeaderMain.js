import React from "react";
import tw from "twin.macro";
import HeaderSub, { NavLinks, NavLink } from "../headers/HeaderSub.js";
import { SectionHeading } from "../misc/Headings.js";
import { SectionDescription } from "../misc/Typography.js";
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons.js";
import { Container, ContentWithVerticalPadding } from "../misc/Layouts.js";
import { ReactComponent as CheckboxIcon } from "feather-icons/dist/icons/check-circle.svg";
import logo from "../../images/ProductPreview.png";

const Header = tw(HeaderSub)`max-w-none`;
const Row = tw.div`flex flex-col lg:flex-row justify-between items-center lg:pt-16 max-w-screen-2xl mx-auto sm:px-8`;
const Column = tw.div``;
const TextColumn = tw(Column)`mr-auto lg:mr-0 max-w-lg lg:max-w-xl xl:max-w-2xl`;
const Heading = tw(SectionHeading)`text-left text-primary-900 leading-snug xl:text-6xl`;
const Description = tw(SectionDescription)`mt-4 lg:text-base text-gray-700 max-w-lg`;
const PrimaryButton = tw(PrimaryButtonBase)`mt-8 inline-block w-56 tracking-wide text-center py-5`;
const FeatureList = tw.ul`mt-12 leading-loose`;
const Feature = tw.li`flex items-center`;
const FeatureIcon = tw(CheckboxIcon)`w-5 h-5 text-primary-500`;
const FeatureText = tw.p`ml-2 font-medium text-gray-700`;
const ImageColumn = tw(Column)`ml-auto lg:mr-0 relative mt-16 lg:mt-0 lg:ml-32`;
const Image = tw.img`max-w-full rounded-t sm:rounded relative z-20`;


export default ({
  heading = "Convolutional Image Processing",
  description = "Apply Convolution Filters in Real-Time from your webcam source or by selecting a image file.",
  primaryButtonUrl = "webapp/index.html",
  primaryButtonText = "Open Webapp",
  secondaryButtonUrl = "#downloads",
  secondaryButtonText = "Download Native App",
  buttonRounded = true,
  features = ["Real-Time Image Processing with Webcam Feed", "Ability to get Timing Data for Convolutions", "Ability to perform Convolutions on PNG/JPG FIles", "Downloadable Native Application for Window, Mac, and Linux"]
}) => {
  const buttonRoundedCss = buttonRounded && tw`rounded-full`;
  const navLinks = [
    <NavLinks key={1}>
      <NavLink href="webapp/index.html">Open Webapp</NavLink>
      <NavLink href="doc">Webapp Documentation</NavLink>
      <NavLink href="timing">Timing Analysis</NavLink>
    </NavLinks>
  ];
  return (
    <>
      <Header links={navLinks} />
      <Container>
        <ContentWithVerticalPadding>
          <Row>
            <TextColumn>
              <Heading>{heading}</Heading>
              <Description>{description}</Description>
              <PrimaryButton as="a" href={primaryButtonUrl} css={buttonRoundedCss}>
                {primaryButtonText}
              </PrimaryButton>
              <PrimaryButton as="a" href={secondaryButtonUrl} css={buttonRoundedCss}>
                {secondaryButtonText}
              </PrimaryButton>
              <FeatureList>
                {features.map((feature, index) => (
                  <Feature key={index}>
                    <FeatureIcon />
                    <FeatureText>{feature}</FeatureText>
                  </Feature>
                ))}
              </FeatureList>
            </TextColumn>
            <ImageColumn>
                <Image src={logo} width={860} height={600} />
            </ImageColumn>
          </Row>
        </ContentWithVerticalPadding>
      </Container>
    </>
  );
};
