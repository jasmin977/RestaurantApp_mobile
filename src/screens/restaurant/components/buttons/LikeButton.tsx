import { useState, FunctionComponent } from 'react';

import { LikeIcon } from '../../../../assets';
import { useTheme } from '../../../../context';
import { RNButton, RNIcon, RNToast } from '../../../../components/themed';

interface ButtnProps {}
const LikeButton: FunctionComponent<ButtnProps> = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 5000); // Set the duration for the toast to be visible
  };
  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      showToast();
    }
  };
  const { theme } = useTheme();
  return (
    <>
      {toastVisible && (
        <RNToast
          title="You liked this restaurant"
          duration={3000} // Customize the duration for the toast to be visible
          onClose={() => setToastVisible(false)}
        />
      )}
      <RNButton
        size="sm"
        centerIcon={<RNIcon as={<LikeIcon />} outline={!isLiked} color="onPrimary" />}
        onPress={handleLike}
      />
    </>
  );
};

export default LikeButton;
