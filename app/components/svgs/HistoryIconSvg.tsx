import * as React from 'react';
import Svg, { SvgProps, Circle, G, Path } from 'react-native-svg';

function HistoryIconSvg(props: SvgProps) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" height={40} width={40} {...props}>
      <Circle r={20} cy={20} cx={20} fill="#eaecff" fillOpacity={0.941} />
      <G fill="none" fillRule="evenodd">
        <Path d="M10 10h20v20H10z" />
        <Path
          d="M20 11.667a8.333 8.333 0 110 16.666A8.333 8.333 0 0111.667 20h1.666a6.667 6.667 0 101.155-3.75h2.179v1.667h-5v-5h1.666V15A8.317 8.317 0 0120 11.667zm.833 4.166v3.821l2.703 2.703-1.18 1.179-3.19-3.192v-4.51z"
          fill="#000"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
}

export default HistoryIconSvg;
