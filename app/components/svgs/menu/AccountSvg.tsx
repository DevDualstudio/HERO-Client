import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function AccountSvg(props) {
  return (
    <Svg width="24px" height="24px" viewBox="0 0 24 24" {...props}>
      <G
        transform="translate(-32 -394) translate(32 394)"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd">
        <Path d="M0 0L24 0 24 24 0 24z" />
        <Path
          d="M3.783 2.826L12 1l8.217 1.826a1 1 0 01.783.976v9.987a6 6 0 01-2.672 4.992L12 23l-6.328-4.219A6 6 0 013 13.79V3.802a1 1 0 01.783-.976zM5 4.604v9.185a4 4 0 001.781 3.328L12 20.597l5.219-3.48A4 4 0 0019 13.79V4.604L12 3.05 5 4.604zM12 11a2.5 2.5 0 110-5 2.5 2.5 0 010 5zm-4.473 5a4.5 4.5 0 018.946 0H7.527z"
          fill="#000"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
}

export default AccountSvg;
