import { css } from 'styled-components';

export const cornerClip = (size: number = 8) => {
  return css`
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - ${size}px),
      calc(100% - ${size}px) 100%,
      0 100%
    );
  `;
};
