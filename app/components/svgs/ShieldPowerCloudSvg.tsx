import * as React from 'react';
import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg';

function ShieldPowerCloudSvg(props: SvgProps) {
  return (
    <Svg width={202} height={175} xmlns="http://www.w3.org/2000/svg" {...props}>
      <G fill="none" fillRule="evenodd">
        <Circle fill="#F6F5FA" cx={97.5} cy={87.5} r={87.5} />
        <Circle fill="#F6F5FA" cx={41} cy={44} r={41} />
        <Path
          stroke="#CED0E1"
          strokeWidth={4}
          strokeLinecap="round"
          d="M160.662 105.764L190 76.426M161.653 129.764l38.192-38.669"
        />
        <Path d="M47 38h102v101H47z" />
        <Path
          d="M62.35 50.636L97.5 43l35.15 7.636c1.957.425 3.35 2.122 3.35 4.081v41.764c0 8.39-4.29 16.223-11.43 20.876L97.5 135l-27.07-17.643c-7.139-4.652-11.428-12.484-11.43-20.872V54.717c0-1.96 1.393-3.656 3.35-4.081zm39.428 30V59.727L80.388 89h12.834v20.91l21.39-29.274h-12.834z"
          fill="#4519F7"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
}

export default ShieldPowerCloudSvg;
