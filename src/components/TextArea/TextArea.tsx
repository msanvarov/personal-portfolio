import React, { useRef, useState, useEffect } from "react";

const defaultTextAreaProps = {
  minRows: 1
};

type TextAreaProps = {
  allowResize: boolean;
  maxRows: number;
} & React.HTMLProps<HTMLTextAreaElement> &
  typeof defaultTextAreaProps;

const TextArea: React.FC<TextAreaProps> = ({
  allowResize,
  value,
  onChange,
  minRows,
  maxRows,
  ...props
}) => {
  const [rows, setRows] = useState(minRows);
  const [textareaDimensions, setTextareaDimensions] = useState();
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
  const handleChange = (event: React.FormEvent<HTMLTextAreaElement>): void => {
    if (onChange) {
      onChange(event);
    }

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
  };

  return (
    <textarea
      {...props}
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
