import { FunctionComponent } from 'react';
import { BackgoundContainer, CenteredView } from '../components/common';
import { RNText } from '../components/themed';

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  return (
    <BackgoundContainer>
      <CenteredView>
        <RNText color="onBackground" variant="h4">
          PROFILE
        </RNText>
      </CenteredView>
    </BackgoundContainer>
  );
};

export default Profile;
