import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const ExploreIcon = (props: SvgProps) => (
  <Svg width={props.width || 24} height={props.height || 24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.8433 4.99789L16.2022 6.09214L17.942 10.439L19.9252 9.85691L17.8433 4.99789ZM14.502 7.22398L4.57828 13.8409L4.80928 14.3029L16.014 11.006L14.502 7.22398ZM18.7348 2L22.6522 11.1404L15.285 13.307L18.2501 21.1899L16.3775 21.8922L13.361 13.873L12.005 14.271L9.20836 21.8929L7.37006 21.105L9.62002 14.973L3.76889 16.6943L2.00002 13.1565L18.7348 2Z"
      fill={props.color || "white"}
    />
  </Svg>
);

export default ExploreIcon;