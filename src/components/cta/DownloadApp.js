import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-9.svg";
import { ContentWithPaddingXl, Container as ContainerBase } from "components/misc/Layouts";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import windowsIconImageSrc from "images/windows.png";
import macIconImageSrc from "images/mac.png"
import linuxIconImageSrc from "images/linux.png"

const Container = tw(ContainerBase)`bg-gray-900 -mx-8`
const Content = tw(ContentWithPaddingXl)``
const Row = tw.div`px-8 flex items-center relative z-10 flex-col lg:flex-row text-center lg:text-left justify-center`;

const ColumnContainer = tw.div``
const TextContainer = tw(ColumnContainer)``;
const Text = tw(SectionHeading)`text-gray-100 lg:text-left max-w-none text-3xl leading-snug`;
const Subheading = tw(SubheadingBase)`text-yellow-500 mb-4 tracking-wider`

const LinksContainer = tw.div`mt-8 lg:mt-16 flex flex-col items-center text-center sm:block`
const Link = styled.a`
  ${tw`w-56 p-3 sm:p-4 text-sm sm:text-base font-bold uppercase tracking-wider rounded-full inline-flex justify-center items-center mt-6 first:mt-0 sm:mt-0 sm:ml-8 first:ml-0 bg-gray-100 hocus:bg-gray-300 text-gray-900 hocus:text-gray-900 shadow hover:shadow-lg focus:shadow-outline focus:outline-none transition duration-300`}
  img {
    ${tw`inline-block h-8 mr-3`}
  }
  span {
    ${tw`leading-none inline-block`}
  }
`;

const DecoratorBlobContainer = tw.div`absolute inset-0 overflow-hidden rounded-lg`
const DecoratorBlob1 = tw(SvgDecoratorBlob1)`absolute bottom-0 left-0 w-80 h-80 transform -translate-x-20 translate-y-32 text-gray-800 opacity-50`
const DecoratorBlob2 = tw(SvgDecoratorBlob1)`absolute top-0 right-0 w-80 h-80 transform  translate-x-20 -translate-y-64 text-gray-800 opacity-50`
export default ({
  subheading = "Download App",
  text = "Developers all over the world are happily using Treact.",
  link1Text = "Windows",
  link1Url = "zipFiles\\Multithreading Convolution App-win32-x64.zip",
  link1IconSrc = windowsIconImageSrc,
  link2Text = "Mac",
  link2Url = "zipFiles\\Multithreading Convolution App-darwin-x64.zip",
  link2IconSrc = macIconImageSrc,
  link3Text = "Linux",
  link3Url = "zipFiles\\Multithreading Convolution App-linux-x64.zip",
  link3IconSrc = linuxIconImageSrc,
  pushDownFooter = false,
}) => {
  return (
    <Container css={pushDownFooter && tw`mb-20 lg:mb-24`} id="downloads">
      <Content>
        <Row>
          <TextContainer>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Text>{text}</Text>
            <LinksContainer>
              <Link href={link1Url} download={true}>
                <img src={link1IconSrc} alt=""/>
                <span>{link1Text}</span>
              </Link>
              <Link href={link2Url} download={true}>
                <img src={link2IconSrc} alt=""/>
                <span>{link2Text}</span>
              </Link>
              <Link href={link3Url} download={true}>
                <img src={link3IconSrc} alt=""/>
                <span>{link3Text}</span>
              </Link>
            </LinksContainer>
          </TextContainer>
        </Row>
        <DecoratorBlobContainer>
          <DecoratorBlob1/>
          <DecoratorBlob2/>
        </DecoratorBlobContainer>
      </Content>
    </Container>
  );
};
