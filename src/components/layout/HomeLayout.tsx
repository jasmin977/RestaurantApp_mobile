import { FunctionComponent, ReactNode, useRef } from 'react';
import { Review } from '../../entities';
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { BackgoundContainer } from '../common';

import { useTheme } from '../../context';
import { StatusBar as STATUSBAR } from 'expo-status-bar';

interface HomeLayoutProps {
  headerHeight: number;
  data: Review[];
  renderItem: (item: Review) => JSX.Element;
  HeaderComponent: ReactNode;
  ListHeaderComponent: ReactNode;
}
const { diffClamp } = Animated;

const HomeLayout: React.FC<HomeLayoutProps> = ({
  HeaderComponent,
  headerHeight,
  data,
  renderItem,
  ListHeaderComponent,
}) => {
  const HEADERHEIGHT = headerHeight * 2;
  const { isDarkTheme } = useTheme();
  const refList = useRef<FlatList<any> | null>(null);
  const scrollY = useRef(new Animated.Value(0));
  const scrollYClamped = diffClamp(scrollY.current, 0, headerHeight);
  const translateYNumber = useRef<number>(0);

  const translateOpacity = scrollYClamped.interpolate({
    inputRange: [0, headerHeight / 2, headerHeight],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const translateY = scrollYClamped.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight * 4],
  });

  translateY.addListener(({ value }) => {
    translateYNumber.current = value;
  });

  const handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: scrollY.current },
        },
      },
    ],
    {
      useNativeDriver: true,
    }
  );
  const getCloser = (value: number, checkOne: number, checkTwo: number): number =>
    Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

  const handleSnap = ({ nativeEvent }: { nativeEvent: NativeScrollEvent }): void => {
    const offsetY = nativeEvent.contentOffset.y;
    if (!(translateYNumber.current === 0 || translateYNumber.current === -headerHeight / 2)) {
      if (refList.current) {
        refList.current.scrollToOffset({
          offset:
            getCloser(translateYNumber.current, -headerHeight / 2, 0) === -headerHeight / 2
              ? offsetY + headerHeight / 2
              : offsetY - headerHeight / 2,
        });
      }
    }
  };
  return (
    <BackgoundContainer>
      <STATUSBAR style={isDarkTheme ? 'light' : 'dark'} />
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
          <View
            style={[
              {
                height: HEADERHEIGHT,
              },
            ]}
          >
            {HeaderComponent}
          </View>
        </Animated.View>

        <Animated.FlatList
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingTop: HEADERHEIGHT, gap: 20 }}
          ListHeaderComponent={<View>{ListHeaderComponent}</View>}
          maxToRenderPerBatch={5}
          onScroll={handleScroll}
          ref={refList}
          onMomentumScrollEnd={handleSnap}
          data={data}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(_, index) => `list-item-${index}`}
        />
      </SafeAreaView>
    </BackgoundContainer>
  );
};
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
    paddingTop: StatusBar.currentHeight,
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'green',
  },

  container: {
    flex: 1,
  },
});

export default HomeLayout;
