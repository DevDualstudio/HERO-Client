import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function InvalidLocationSvg(props) {
  return (
    <Svg width="30px" height="30px" viewBox="0 0 30 30" {...props}>
      <G
        transform="translate(-35 -696) translate(15 666) translate(20 30)"
        stroke="none"
        strokeWidth={1}
        fill="none"
        fillRule="evenodd">
        <Path
          d="M19.601.037l-9.255 2.401L0 0v27.386l10.362 2.574.285-.072 4.762-1.205-2.004-1.908-1.875.475V4.55l6.907-1.792v19.11l1.518 1.446.823-.914V2.741l6.848 1.68v10.373l2.341-2.6V2.611L19.601.037zm-17.26 2.92L9.19 4.57v22.685l-6.848-1.7v-22.6z"
          fill="#000"
          fillRule="nonzero"
        />
        <Path
          fill="#F13564"
          d="M25.2986678 17.8325423L27.0559955 19.3630788 17.8139799 28.8325423 16.0559955 27.2902946z"
        />
        <Path
          fill="#F13564"
          transform="matrix(-1 0 0 1 43.112 0)"
          d="M25.2986678 17.8325423L27.0559955 19.3630788 17.8139799 28.8325423 16.0559955 27.2902946z"
        />
      </G>
    </Svg>
  );
}

export default InvalidLocationSvg;
