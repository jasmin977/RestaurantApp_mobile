import { useState, FunctionComponent } from 'react';

import { LikeIcon } from '../../../../assets';
import { useAppState, useTheme } from '../../../../context';
import { RNButton, RNIcon, RNToast } from '../../../../components/themed';

interface ButtnProps {}
const LikeButton: FunctionComponent<ButtnProps> = () => {
  const [isLiked, setIsLiked] = useState(false);
  const { setToastVisible } = useAppState();

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setToastVisible(true);
    }
  };
  const { theme } = useTheme();
  return (
    <>
      <RNButton
        size="sm"
        style={{ borderRadius: 100 }}
        color="card"
        centerIcon={<RNIcon as={<LikeIcon />} outline={!isLiked} color="primary" />}
        onPress={handleLike}
      />
    </>
  );
};

export default LikeButton;
