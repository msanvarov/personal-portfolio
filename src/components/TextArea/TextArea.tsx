import React, { useRef, useState, useEffect } from "react";

const defaultTextAreaProps = {
  minRows: 1,
};

type TextAreaProps = {
  allowResize: boolean;
  maxRows: number;
} & React.PropsWithoutRef<JSX.IntrinsicElements["textarea"]> &
  typeof defaultTextAreaProps;

const TextArea: React.FC<TextAreaProps> = ({
  allowResize,
  value,
  onChange,
  minRows,
  maxRows,
  ...rest
}) => {
  const [rows, setRows] = useState(minRows);
  const [textareaDimensions, setTextareaDimensions] = useState<{
    lineHeight: number;
    paddingHeight: number;
  } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      const style = getComputedStyle(textareaRef.current);
      const lineHeight = parseInt(style.lineHeight, 10);
      const paddingHeight =
        parseInt(style.paddingTop, 10) + parseInt(style.paddingBottom, 10);
      setTextareaDimensions({ lineHeight, paddingHeight });
    }
  }, []);
  const handleChange = (event: any): void => {
    if (onChange) {
      onChange(event);
    }

    if (textareaDimensions) {
      const { lineHeight, paddingHeight } = textareaDimensions;

      const previousRows = (event.target as HTMLTextAreaElement).rows;
      (event.target as HTMLTextAreaElement).rows = minRows;

      const currentRows = ~~(
        ((event.target as HTMLTextAreaElement).scrollHeight - paddingHeight) /
        lineHeight
      );

      if (currentRows === previousRows) {
        (event.target as HTMLTextAreaElement).rows = currentRows;
      }

      if (maxRows && currentRows >= maxRows) {
        (event.target as HTMLTextAreaElement).rows = maxRows;
        (event.target as HTMLTextAreaElement).scrollTop = (event.target as HTMLTextAreaElement).scrollHeight;
      }

      setRows(maxRows && currentRows > maxRows ? maxRows : currentRows);
    }
  };

  return (
    <textarea
      {...rest}
      ref={textareaRef}
      onChange={handleChange}
      style={{ resize: allowResize ? undefined : "none" }}
      rows={rows}
      value={value}
    />
  );
};

TextArea.defaultProps = defaultTextAreaProps;

export default TextArea;
