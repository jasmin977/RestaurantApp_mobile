import React, { useCallback, useMemo, useRef } from 'react';

import { Coords, Restaurant } from '../../../entities';
import BottomSheet, {
  BottomSheetDraggableView,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import RestaurantMapCard from './RestaurantMapCard';

interface MapPresentationProps {
  restaurantData: Restaurant[];
  /*  sheetRef: React.RefObject<BottomSheet>;
  snapPoints: string[];
  renderItem: (item: Restaurant) => JSX.Element; */
  goToRestaurantPosition: (coords: Coords) => void;
}

const RestaurantBottomSheet = ({
  restaurantData,
  goToRestaurantPosition,
}: MapPresentationProps) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%', '80%'], []);

  const renderItem = useCallback(
    (item: Restaurant) => (
      <RestaurantMapCard
        key={`mapCard_${item.id}`}
        restaurant={item}
        goToRestaurantPosition={goToRestaurantPosition}
      />
    ),
    []
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheet ref={sheetRef} index={1} snapPoints={snapPoints}>
        <BottomSheetScrollView
          pagingEnabled
          horizontal
          contentContainerStyle={{
            gap: 10,
            paddingHorizontal: 20,
          }}
        >
          {restaurantData.map(renderItem)}
        </BottomSheetScrollView>
      </BottomSheet>
    </BottomSheetModalProvider>
  );
};

export default RestaurantBottomSheet;
