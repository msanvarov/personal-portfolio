import React, { useState } from "react";
import useID from "@hooks/useID";
import { rgba } from "@utils/style";
import TextArea from "@components/TextArea/TextArea";
import styled, { css } from "styled-components/macro";

type InputProps = {
  id: string;
  label: string;
  value: string;
  hasValue: boolean;
  multiline: boolean;
  className: string;
};

const Input = ({ id, label, value, multiline, className }: InputProps) => {
  const [focused, setFocused] = useState(false);
  const generatedId = useID();
  const inputID = id || `input-${generatedId}`;
  return (
    <InputWrapper className={className}>
      <InputLabel
        id={`${inputID}-label`}
        hasValue={!!value}
        htmlFor={inputID}
        focused={focused}
      >
        {label}
      </InputLabel>
      <InputElement
        as={multiline ? TextArea : undefined}
        id={inputID}
        aria-labelledby={`${inputID}-label`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <InputUnderline focused={focused} />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
  display: flex;
`;

const AutoFillStyle = css`
  -webkit-text-fill-color: ${props => props.theme.colorText};
  box-shadow: 0 0 0px 1000px ${props => rgba(props.theme.colorText, 0.1)} inset;
`;

const InputElement = styled.input`
  background: transparent;
  color: ${props => props.theme.colorText};
  box-shadow: inset 0 -2px 0 0 ${props => rgba(props.theme.colorText, 0.2)};
  transition: background-color 5000s linear 0s;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  margin: 0;
  border: 0;
  padding: 24px 0 16px;
  z-index: 16;
  appearance: none;
  border-radius: 0;
  line-height: 1.4;
  overflow-x: hidden;

  @media (prefers-reduced-motion: reduce) {
    #root & {
      transition: background-color 5000s linear 0s;
    }
  }

  &:-internal-autofill-selected {
    ${AutoFillStyle}
  }

  /* Needs to be a single selector to work in safari */
  &:-webkit-autofill {
    ${AutoFillStyle}
  }

  &:focus {
    outline: none;
  }

  &::-webkit-contacts-auto-fill-button:hover {
    background-color: ${props => props.theme.colorPrimary};
  }
`;

const InputUnderline = styled.div<{ focused: boolean }>`
  background: ${props => props.theme.colorPrimary};
  transform: scale3d(${props => (props.focused ? 1 : 0)}, 1, 1);
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  transition: transform 0.4s ${props => props.theme.curveFastoutSlowin};
  transform-origin: left;
`;

const InputLabel = styled.label<{ hasValue: boolean; focused: boolean }>`
  color: ${props => rgba(props.theme.colorText, 0.8)};
  position: absolute;
  top: 26px;
  left: 0;
  display: block;
  transform-origin: top left;
  transition: transform 0.4s ${props => props.theme.curveFastoutSlowin},
    color 0.4s ease;

  ${props =>
    (props.hasValue || props.focused) &&
    css`
      color: ${rgba(props.theme.colorText, 0.54)};
      transform: scale(0.8) translateY(-28px);
    `}
`;

export default Input;
