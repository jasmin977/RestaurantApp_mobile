import { FunctionComponent } from 'react';
import { styled } from 'styled-components/native';
import { ButtnProps } from '../../../components/common';
import { LikeIcon } from '../../../assets';
import { useTheme } from '../../../hooks';

const ButtonView = styled.TouchableOpacity`
  align-items: center;

  border-radius: 10px;
  padding: 13px;
  align-items: center;
  justify-content: center;
`;

const LikeButton: FunctionComponent<ButtnProps> = ({ onPress, btnStyle }) => {
  const { theme } = useTheme();
  return (
    <ButtonView onPress={onPress} style={btnStyle}>
      <LikeIcon color={theme.colors.primary} />
    </ButtonView>
  );
};

export default LikeButton;
