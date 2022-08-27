import * as React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { ServiceAddress } from '../types/ServiceAddress';
import PressableListItem from './PressableListItem';
import HistoryIconSvg from './svgs/HistoryIconSvg';

interface PlacesHistoryProps {
  limit?: number;
  style?: ViewStyle;
  onPressItem?: (serviceAddress: ServiceAddress) => void;
}

const PlacesHistory: React.FC<PlacesHistoryProps> = ({
  limit,
  style = {},
  onPressItem,
}) => {
  const historyAddresses: ServiceAddress[] = [
    {
      address: '610 W Peachtree St NW, Atlanta, GA 30308',
      latitude: -15.15415,
      longitude: -54.16516,
    },
    {
      address: '620 W Peachtree St NW, Atlanta, GA 30308',
      latitude: -15.15415,
      longitude: -54.16516,
    },
    {
      address: '630 W Peachtree St NW, Atlanta, GA 30308',
      latitude: -15.15415,
      longitude: -54.16516,
    },
    {
      address: '640 W Peachtree St NW, Atlanta, GA 30308',
      latitude: -15.15415,
      longitude: -54.16516,
    },
  ];

  return (
    <View style={[styles.container, style]}>
      {historyAddresses
        .slice(0, limit || historyAddresses.length)
        .map((historyAddress) => (
          <PressableListItem
            key={historyAddress.address}
            icon={<HistoryIconSvg />}
            title={historyAddress.address}
            onPress={() => onPressItem && onPressItem(historyAddress)}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
export default PlacesHistory;
