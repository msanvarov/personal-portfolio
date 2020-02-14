import React from "react";

export enum IconEnum {
  LINKEDIN,
  MEDIUM,
  GITHUB,
  EMAIL,
  MENU,
  ARROWRIGHT,
  CHEVRONRIGHT,
  CLOSE,
  SEND,
  SLIDERIGHT,
  SLIDELEFT,
  PLAY,
  PAUSE
}

type IconProps = {
  className: string;
  color: string;
  icon: IconEnum;
  size: number;
};

const Icon: React.FC<IconProps> = ({ icon, className, color, size }) => {
  switch (icon) {
    case IconEnum.LINKEDIN:
      return (
        <svg
          className={className}
          fill={color}
          width={size}
          height={size}
          viewBox="0 0 24 24"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    case IconEnum.MEDIUM:
      return (
        <svg
          className={className}
          fill={color}
          width={size}
          height={size}
          viewBox="0 0 24 24"
        >
          <path d="M19 24h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5v14c0 2.761-2.237 4.999-5 5zm.97-5.649v-.269l-1.247-1.224c-.11-.084-.165-.222-.142-.359v-8.998c-.023-.137.032-.275.142-.359l1.277-1.224v-.269h-4.422l-3.152 7.863-3.586-7.863h-4.638v.269l1.494 1.799c.146.133.221.327.201.523v7.072c.044.255-.037.516-.216.702l-1.681 2.038v.269h4.766v-.269l-1.681-2.038c-.181-.186-.266-.445-.232-.702v-6.116l4.183 9.125h.486l3.593-9.125v7.273c0 .194 0 .232-.127.359l-1.292 1.254v.269h6.274z" />
        </svg>
      );
    case IconEnum.GITHUB:
      return (
        <svg
          className={className}
          fill={color}
          width={size}
          height={size}
          viewBox="0 0 24 24"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z" />
        </svg>
      );
    case IconEnum.EMAIL:
      return (
        <svg
          className={className}
          fill={color}
          width={size}
          height={size}
          viewBox="0 0 24 24"
        >
          <path d="M20 8l-8 5-8-5V6l8 5 8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-1.11-.9-2-2-2z" />
        </svg>
      );
    case IconEnum.MENU:
      return (
        <svg
          className={className}
          fill={color}
          width={size}
          height={size}
          viewBox="0 0 24 24"
        >
          <path d="M2 13h16v-2H2zm0 7h20v-2H2zM2 6h20V4H2z" />
        </svg>
      );
    case IconEnum.ARROWRIGHT:
      return (
        <svg
          className={className}
          fill={color}
          width={size}
          height={size}
          viewBox="0 0 24 24"
        >
          <path d="M3 11h14.17l-3.58-3.59L15 6l6 6-6 6-1.41-1.41L17.17 13H3z" />
        </svg>
      );
    case IconEnum.CHEVRONRIGHT:
      return (
        <svg
          className={className}
          fill={color}
          width={size}
          height={size}
          viewBox="0 0 24 24"
        >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      );
    case IconEnum.CLOSE:
      return (
        <svg
          className={className}
          fill={color}
          width={size}
          height={size}
          viewBox="0 0 24 24"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      );
    case IconEnum.SEND:
      return (
        <svg
          className={className}
          fill={color}
          width={size}
          height={size}
          viewBox="0 0 24 24"
        >
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      );
    case IconEnum.SLIDERIGHT:
      return (
        <svg
          className={className}
          fill={color}
          width="18"
          height="42"
          viewBox="0 0 18 42"
        >
          <path d="M-.03 1.375L1.53.125l16.5 20.625-16.5 20.625-1.562-1.25 15.5-19.375z" />
        </svg>
      );
    case IconEnum.SLIDELEFT:
      return (
        <svg
          className={className}
          fill={color}
          width="18"
          height="42"
          viewBox="0 0 18 42"
        >
          <path d="M18.03 1.375L16.47.125-.031 20.75l16.5 20.625 1.562-1.25L2.53 20.75z" />
        </svg>
      );
    case IconEnum.PLAY:
      return (
        <svg
          className={className}
          fill={color}
          width={size}
          height={size}
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      );
    case IconEnum.PAUSE:
      return (
        <svg
          className={className}
          width={size}
          height={size}
          viewBox="0 0 24 24"
        >
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      );
  }
};

export default Icon;
