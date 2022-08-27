import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function IdCardSvg(props) {
  return (
    <Svg width="30px" height="26px" viewBox="0 0 30 26" {...props}>
      <G fillRule="nonzero" stroke="none" strokeWidth={1} fill="none">
        <Path
          d="M29.063 16.455a.946.946 0 00-.938.954v6.682H1.875V12.636h10.313a.946.946 0 00.937-.954.946.946 0 00-.938-.955H1.876V6.91h10.313a.946.946 0 00.937-.954.946.946 0 00-.938-.955H1.876C.84 5 0 5.855 0 6.91v17.18C0 25.146.84 26 1.875 26h26.25C29.16 26 30 25.145 30 24.09v-6.68a.946.946 0 00-.938-.955z"
          fill="#000"
          transform="translate(-35 -328) translate(20 311) translate(15 17)"
        />
        <Path
          d="M9 16H5a1 1 0 000 2h4a1 1 0 000-2z"
          fill="#000"
          transform="translate(-35 -328) translate(20 311) translate(15 17)"
        />
        <Path
          d="M29.432 2.926L22.869.076a.946.946 0 00-.74 0l-6.563 2.85A.953.953 0 0015 3.8v3.8c0 5.227 1.907 8.282 7.033 11.275a.931.931 0 00.934 0C28.093 15.89 30 12.835 30 7.6V3.8a.951.951 0 00-.568-.874zM28.125 7.6c0 4.387-1.433 6.802-5.625 9.348-4.192-2.552-5.625-4.967-5.625-9.348V4.427L22.5 1.983l5.625 2.444V7.6z"
          fill="#4519F7"
          transform="translate(-35 -328) translate(20 311) translate(15 17)"
        />
        <Path
          d="M26.625 5.217a1.006 1.006 0 00-1.406.156l-3.144 3.933-1.244-1.86a1.002 1.002 0 00-1.386-.279 1.001 1.001 0 00-.278 1.386l2 3c.178.267.47.431.79.447H22a1 1 0 00.782-.376l4-5.001a1.001 1.001 0 00-.156-1.406z"
          fill="#1EE500"
          transform="translate(-35 -328) translate(20 311) translate(15 17)"
        />
      </G>
    </Svg>
  );
}

export default IdCardSvg;
