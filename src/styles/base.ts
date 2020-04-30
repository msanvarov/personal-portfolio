import { css, keyframes } from 'styled-components';

import { Media } from './variables';

export const AnimationFade = keyframes`
  0% {opacity: 0}
  100% {opacity: 1}
`;

// stylelint-disable selector-type-no-unknown
export const Padding = css`
  padding-right: 120px;
  padding-left: 200px;
  @media (min-width: ${Media.desktop}px) {
    padding-left: 120px;
  }
  @media (max-width: ${Media.tablet}px) {
    padding-left: 160px;
  }
  @media (max-width: ${Media.mobile}px) {
    padding-right: 25px;
    padding-left: 25px;
  }
  @media (max-width: ${Media.mobile}px), (max-height: ${Media.mobile}px) {
    padding-left: var(--spacingOuter);
    padding-right: var(--spacingOuter);
  }
  @media ${Media.mobileLS} {
    padding-left: 100px;
    padding-right: 100px;
  }
`;
