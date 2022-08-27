import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function HelpSvg(props) {
  return (
    <Svg width="24px" height="24px" viewBox="0 0 24 24" {...props}>
      <G
        transform="translate(-376 -417) translate(20 411) translate(356 6)"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd">
        <Path d="M0 0L24 0 24 24 0 24z" />
        <Path
          d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm2-1.645A3.502 3.502 0 0012 6.5a3.501 3.501 0 00-3.433 2.813l1.962.393A1.5 1.5 0 1112 11.5a1 1 0 00-1 1V14h2v-.645z"
          fill="#9FB5C4"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
}

export default HelpSvg;
