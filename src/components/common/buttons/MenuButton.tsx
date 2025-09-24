import { MenuIcon } from '../../../assets';
import { useAppState } from '../../../context';
import { RNButton, RNIcon } from '../../themed';

const MenuButton = () => {
  const { isDrawerOpen, setIsDrawerOpen } = useAppState();
  return (
    <RNButton
      size="xs"
      color="card"
      centerIcon={<RNIcon as={<MenuIcon />} outline color="onBackground" size={25} />}
      onPress={() => setIsDrawerOpen(!isDrawerOpen)}
    />
  );
};

export default MenuButton;
