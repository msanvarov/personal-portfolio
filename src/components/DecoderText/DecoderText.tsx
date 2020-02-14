import React, { useRef, useState, useEffect, memo } from "react";
import styled from "styled-components/macro";
import { prefersReducedMotion } from "@hooks/usePrefersReducedMotion";

const chars = [
  "А",
  "а",
  "Б",
  "б",
  "В",
  "в",
  "Г",
  "г",
  "Д",
  "д",
  "Е",
  "е",
  "Ё",
  "ё",
  "Ж",
  "ж",
  "З",
  "з",
  "И",
  "и",
  "Й",
  "й",
  "К",
  "к",
  "Л",
  "л",
  "М",
  "м",
  "Н",
  "н",
  "О",
  "о",
  "П",
  "п",
  "Р",
  "р",
  "С",
  "с",
  "Т",
  "т",
  "У",
  "у",
  "Ф",
  "ф",
  "Х",
  "х",
  "Ц",
  "ц",
  "Ч",
  "ч",
  "Ш",
  "ш",
  "Щ",
  "щ",
  "Ъ",
  "ъ",
  "Ы",
  "ы",
  "Ь",
  "ь",
  "Э",
  "э",
  "Ю",
  "ю",
  "Я",
  "я"
];

const russianFonts = [
  "Charcoal",
  "Geneva",
  "Helvetica Neue",
  "Helvetica",
  "Arial",
  "sans-serif"
];

const shuffle = (content: string[], chars: string[], position: number) => {
  return content.map((value, index) => {
    if (index < position) {
      return { type: "actual", value };
    }

    const rand = Math.floor(Math.random() * chars.length);
    return { type: "code", value: chars[rand] };
  });
};

const defaultDecoderTextProps = {
  offset: 100,
  delay: 300,
  fps: 24
};

type DecoderTextProps = {
  text: string;
  start: boolean;
} & typeof defaultDecoderTextProps;

const DecoderText: React.FC<DecoderTextProps> = ({
  text,
  start,
  offset,
  delay,
  fps
}) => {
  const position = useRef(0);
  const [started, setStarted] = useState(false);
  const output = useRef([{ type: "code", value: "" }]);
  const content = useRef(text.split(""));
  const contentRef = useRef();
  const startTime = useRef(0);
  const elapsedTime = useRef(0);

  useEffect(() => {
    let timeout;

    if (start && !started && !prefersReducedMotion) {
      timeout = setTimeout(() => {
        startTime.current = Date.now();
        elapsedTime.current = 0;
        setStarted(true);
      }, delay);
    }

    if (prefersReducedMotion) {
      output.current = content.current.map((value, index) => ({
        type: "actual",
        value: content.current[index]
      }));
      setStarted(true);
    }

    return function cleanUp() {
      clearTimeout(timeout);
    };
  }, [delay, start, started]);

  useEffect(() => {
    let animation;

    const animate = () => {
      if (!started) return;
      const elapsed = Date.now() - startTime.current;
      const deltaTime = elapsed - elapsedTime.current;
      const needsUpdate = 1000 / fps <= deltaTime;

      if (needsUpdate) {
        elapsedTime.current = elapsed;
        position.current = elapsedTime.current / offset;
        output.current = shuffle(content.current, chars, position.current);

        const characterMap = output.current.map(item => {
          const className =
            item.type === "actual"
              ? "decoder-text__value"
              : "decoder-text__code";
          return `<span aria-hidden="true" class="${className}">${item.value}</span>`;
        });

        contentRef.current.innerHTML = characterMap.join("");
      }

      if (position.current <= content.current.length) {
        animation = requestAnimationFrame(animate);
      }
    };

    animation = requestAnimationFrame(animate);

    return function cleanup() {
      cancelAnimationFrame(animation);
    };
  }, [fps, offset, started]);

  return (
    <DecoderWrapper className="decoder-text" {...rest}>
      <span className="decoder-text__label">{text}</span>
      <span className="decoder-text__content" ref={contentRef} />
    </DecoderWrapper>
  );
};

const DecoderWrapper = styled.span`
  &::after {
    content: "_";
    visibility: hidden;
  }
  .decoder-text__label {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    position: absolute;
  }
  .decoder-text__code {
    opacity: 0.8;
    font-weight: 400;
    font-family: ${japaneseFonts.join(", ")};
    line-height: 0;
  }
`;

export default memo(DecoderText);
