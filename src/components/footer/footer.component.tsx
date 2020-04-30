import React from 'react';
import styled from 'styled-components/macro';

import Anchor from 'components/anchor/anchor.component';

import { Padding } from 'styles/base';
import { Media } from 'styles/variables';

const Footer: React.FC = () => (
  <FooterContainer role="contentinfo">
    <FooterDate>{`© ${new Date().getFullYear()}`} Sal Anvarov.</FooterDate>
    <Anchor secondary href="/humans.txt">
      Crafted with a lot of{' '}
      <span role="img" aria-label="heart emoji">
        💙
      </span>{' '}
      and{' '}
      <span role="img" aria-label="coffee emoji">
        ☕
      </span>{' '}
      by Sal Anvarov
    </Anchor>
  </FooterContainer>
);

const FooterContainer = styled.footer`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  width: 100vw;
  padding: 70px 30px;
  z-index: 16;
  position: relative;
  font-size: 16px;
  color: rgb(var(--rgbTitle) / 0.6);
  ${Padding}
  @media (max-width: ${Media.tablet}px) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
  ${Anchor} {
    display: inline-flex;
  }
`;

const FooterDate = styled.span`
  padding-right: 5px;
  display: inline-flex;
`;

export default Footer;
