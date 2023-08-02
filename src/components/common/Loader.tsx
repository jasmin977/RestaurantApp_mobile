import assets from '../../assets';

import LottieView from 'lottie-react-native';
import { scale } from '../../helpers';

interface Props {
  size?: number;
}
const Loader = ({ size = 200 }: Props) => {
  return (
    <LottieView
      autoPlay
      loop
      style={{
        width: scale(size),
        height: scale(size),
      }}
      source={assets.lottieFiles.Loader}
    />
  );
};

export default Loader;
