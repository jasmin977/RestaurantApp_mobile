import { View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../hooks';
import { Box, RNIcon, RNText } from '../../../components/themed';
import { StarIcon } from '../../../assets';

interface RateOptionProps {
  rating: number;
  setRating: (value: number) => void;
}
const RateOption: React.FC<RateOptionProps> = ({ rating, setRating }) => {
  const { theme } = useTheme();
  const [text, setText] = useState('');

  const renderText = (starNumber: number): string => {
    switch (starNumber) {
      case 1:
        return 'Terrible!';
      case 2:
        return 'Not Good!';
      case 3:
        return 'Good';
      case 4:
        return 'Great!';
      case 5:
        return 'Excellent!';
      default:
        return ' ';
    }
  };
  const handlePress = (value: number) => {
    setRating(value);
  };

  useEffect(() => {
    setText(renderText(rating));
  }, [rating]);
  return (
    <Box direction="horizontal" justifyContent="space-between" spacing={{ py: 10 }} w={'100%'}>
      <Box direction="horizontal" justifyContent="space-between" gap={8}>
        <TouchableOpacity onPress={() => handlePress(1)}>
          <RNIcon
            outline={false}
            color={rating >= 1 ? 'primary' : 'card'}
            size={35}
            as={<StarIcon />}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(2)}>
          <RNIcon
            outline={false}
            color={rating >= 2 ? 'primary' : 'card'}
            size={35}
            as={<StarIcon />}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(3)}>
          <RNIcon
            outline={false}
            color={rating >= 3 ? 'primary' : 'card'}
            size={35}
            as={<StarIcon />}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(4)}>
          <RNIcon
            outline={false}
            color={rating >= 4 ? 'primary' : 'card'}
            size={35}
            as={<StarIcon />}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress(5)}>
          <RNIcon
            outline={false}
            color={rating >= 5 ? 'primary' : 'card'}
            size={35}
            as={<StarIcon />}
          />
        </TouchableOpacity>
      </Box>
      <RNText color="card" variant="subtitle">
        {text}
      </RNText>
    </Box>
  );
};

export default RateOption;
