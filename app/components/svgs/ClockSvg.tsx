import * as React from 'react';
import Svg, { SvgProps, G, Path } from 'react-native-svg';

function ClockSvg(props: SvgProps) {
  return (
    <Svg width={16} height={16} xmlns="http://www.w3.org/2000/svg" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path d="M0 0h16v16H0z" />
        <Path
          d="M8 14.667A6.667 6.667 0 118 1.334a6.667 6.667 0 010 13.333zm0-1.334A5.333 5.333 0 108 2.667a5.333 5.333 0 000 10.666zM8.667 8h2.666v1.333h-4V4.667h1.334V8z"
          fill="#000"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
}

export default ClockSvg;
