import React, { useEffect, useRef } from "react";
import styled, { css, useTheme } from "styled-components/macro";
import Lottie from "lottie-web/build/player/lottie_light.min";
import { Button } from "@components/Button/Button";
import themeIconData from "./ThemeIcon.json";
import { prefersReducedMotion } from "@hooks/usePrefersReducedMotion";
import { AppContext } from "@app/App";

type ToggleThemeProps = {
  isMobile: boolean;
};

export const ToggleTheme: React.FC<ToggleThemeProps> = ({
  isMobile,
  ...rest
}) => {
  const theme = useTheme();
  const { dispatch } = React.useContext(AppContext);
  // TODO fix useRef
  const initThemeId = useRef((theme as any).id);
  const lottieContainerRef = useRef();
  const lottieAnimRef = useRef();

  useEffect(() => {
    lottieAnimRef.current = Lottie.loadAnimation({
      container: lottieContainerRef.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: themeIconData,
    });

    const duration = (lottieAnimRef.current as any).totalFrames - 1;
    (lottieAnimRef.current as any).goToAndStop(
      initThemeId.current === "dark" ? duration : 0,
      true
    );

    return () => {
      (lottieAnimRef.current as any).destroy();
    };
  }, []);

  useEffect(() => {
    (lottieAnimRef.current as any).setDirection(
      (theme as any).id === "dark" ? 1 : -1
    );

    if (prefersReducedMotion) {
      const duration = (lottieAnimRef.current as any).totalFrames - 1;
      (lottieAnimRef.current as any).goToAndStop(
        (theme as any).id === "dark" ? duration : 0,
        true
      );
    } else {
      (lottieAnimRef.current as any).play();
    }
  }, [prefersReducedMotion, theme.id]);

  const handleClick = () => {
    dispatch({ type: "toggleTheme" });
  };

  return (
    <ThemeToggleButton
      iconOnly
      aria-label="Toggle theme"
      onClick={handleClick}
      isMobile={isMobile}
      {...rest}
    >
      <ThemeToggleWrapper ref={lottieContainerRef} />
    </ThemeToggleButton>
  );
};

const ThemeToggleButton = styled(Button)`
  position: fixed;
  z-index: 2048;
  width: 48px;
  height: 48px;
  padding: 6px;
  top: ${(props) => props.theme.spacingOuter.desktop - 8}px;
  right: ${(props) => props.theme.spacingOuter.desktop - 8}px;
  transform: translate3d(0, 0, 0);
  @media (max-width: ${(props) => props.theme.tablet}px) {
    top: ${(props) =>
      props.isMobile ? "unset" : `${props.theme.spacingOuter.tablet - 8}px`};
    right: ${(props) =>
      props.isMobile ? "30px" : `${props.theme.spacingOuter.tablet - 8}px`};
  }
  ${(props) =>
    props.isMobile &&
    css`
      top: unset;
      bottom: 30px;
    `}
  ${(props) =>
    !props.isMobile &&
    css`
      @media (max-width: ${(props) => props.theme.mobile}px),
        (max-height: ${(props) => props.theme.mobile}px) {
        display: none;
      }
    `}
  svg {
    flex: 1 1 100%;
    position: relative;
  }
  svg path {
    transition-property: fill, stroke;
    transition-timing-function: ease;
    transition-duration: 0.4s;
  }
  svg g > path {
    stroke: ${(props) => props.theme.colorText};
  }
  svg g[mask] path {
    fill: ${(props) => props.theme.colorText};
    stroke: none;
  }
`;

const ThemeToggleWrapper: any = styled.span`
  display: flex;
`;

export default ToggleTheme;
