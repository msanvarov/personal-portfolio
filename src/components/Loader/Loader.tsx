import React from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components/macro";
import { prefersReducedMotion } from "@hooks";

const defaultLoaderProps = {
  size: 32,
  color: "#fff",
  text: "Loading ..."
};

type LoaderProps = typeof defaultLoaderProps;

const Loader: React.FC<LoaderProps> = ({ size, color, text }) => {
  const renderScreenReaderTextPortal = () =>
    ReactDOM.createPortal(
      <LoaderAnnouncement aria-live="assertive">{text}</LoaderAnnouncement>,
      document.body
    );

  if (prefersReducedMotion) {
    return (
      <LoaderText color={color}>
        {text}
        {renderScreenReaderTextPortal()}
      </LoaderText>
    );
  }
  const gapSize = Math.round((size / 3) * 0.2);
  const spanSize = Math.round(size / 3 - gapSize * 2 - 1);

  return (
    <LoaderContainer aria-label={text} size={size}>
      <LoaderSpanWrapper gapSize={gapSize} spanSize={spanSize}>
        <LoaderSpan spanColor={color} />
        <LoaderSpan spanColor={color} />
        <LoaderSpan spanColor={color} />
      </LoaderSpanWrapper>
      {renderScreenReaderTextPortal()}
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  justify-content: center;
`;

const LoaderText = styled.div<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 16px;
  font-weight: 500;
`;

const LoaderAnnouncement = styled.div`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
`;

const LoaderSpanWrapper = styled.span<{ spanSize: number; gapSize: number }>`
  display: grid;
  grid-template-columns: repeat(3, ${({ spanSize }) => spanSize}px);
  grid-gap: ${({ gapSize }) => gapSize}px;
  align-items: center;
  justify-content: center;
  transform: skewX(22deg);
`;

const AnimSpan = keyframes`
  0% {
    transform: scaleY(0);
    opacity: 0.5;
    transform-origin: top;
  }
  40% {
    transform: scaleY(1);
    opacity: 1;
    transform-origin: top;
  }
  60% {
    transform: scaleY(1);
    opacity: 1;
    transform-origin: bottom;
  }
  100% {
    transform: scaleY(0);
    opacity: 0.5;
    transform-origin: bottom;
  }
`;

const LoaderSpan = styled.span<{ spanColor: string }>`
  height: 60%;
  background: ${({ spanColor }) => spanColor};
  animation: ${AnimSpan} 1s ${props => props.theme.curveFastoutSlowin} infinite;
  transform: scaleY(0);
  transform-origin: top left;

  &:nth-child(2) {
    animation-delay: 0.1s;
  }

  &:nth-child(3) {
    animation-delay: 0.2s;
  }
`;

export default Loader;
