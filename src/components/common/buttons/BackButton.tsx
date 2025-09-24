import { BackIcon } from '../../../assets';
import { RNButton, RNIcon } from '../../themed';

interface Props {
  onPress: () => void;
}

const BackButton = ({ onPress }: Props) => {
  return (
    <RNButton
      size="xs"
      color="card"
      onPress={onPress}
      centerIcon={<RNIcon outline color="onCard" as={<BackIcon />} />}
    />
  );
};

export default BackButton;
