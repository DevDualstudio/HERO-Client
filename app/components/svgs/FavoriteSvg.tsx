import * as React from 'react';
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
} from 'react-native-svg';

function FavoriteSvg(props: SvgProps) {
  return (
    <Svg width={25} height={30} xmlns="http://www.w3.org/2000/svg" {...props}>
      <Defs>
        <LinearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="icon_fav-places_svg__a">
          <Stop stopColor="#D2D8E3" offset="0%" />
          <Stop stopColor="#4519F7" offset="100%" />
        </LinearGradient>
      </Defs>
      <G fill="none" fillRule="evenodd">
        <Path
          d="M24.38 3.89L12.75.429a.875.875 0 00-.5 0L.62 3.889a.863.863 0 00-.62.826v12.69c0 1.651.674 3.34 2.002 5.022 1.015 1.285 2.419 2.575 4.173 3.834 2.947 2.116 5.848 3.413 5.97 3.468a.874.874 0 00.71 0c.122-.055 3.024-1.352 5.97-3.468 1.754-1.26 3.158-2.549 4.173-3.834C24.326 20.746 25 19.056 25 17.405V4.715a.862.862 0 00-.62-.825z"
          fill="url(#icon_fav-places_svg__a)"
        />
        <Path
          d="M17.5 12.57l-3.936-.255L12.08 8.65 10.6 12.315l-3.932.255 3.016 2.52-.99 3.823 3.388-2.108 3.388 2.108-.99-3.823z"
          fill="#FFF"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
}

export default FavoriteSvg;
