import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function TickInactiveSvg(props) {
  return (
    <Svg width="18px" height="16px" viewBox="0 0 18 16" {...props}>
      <Path
        d="M17.156 5.488a2.264 2.264 0 00-3.163.35l-7.074 8.85-2.799-4.186a2.255 2.255 0 00-3.118-.626 2.253 2.253 0 00-.626 3.12l4.5 6.75c.4.599 1.058.968 1.778 1.004h.094a2.25 2.25 0 001.76-.846l9-11.252a2.252 2.252 0 00-.352-3.164z"
        transform="translate(-20 -472) translate(20 467)"
        fill="#A3B4C2"
        fillRule="nonzero"
        stroke="none"
        strokeWidth={1}
      />
    </Svg>
  );
}

export default TickInactiveSvg;
