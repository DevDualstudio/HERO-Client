import moment from 'moment';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { TiersLabelsEnum } from '../shared/TiersEnum';
import { formatCurrency } from '../shared/utils';
import { fontFamily, fontSize } from '../styles/typography';

interface TierSelectorProps {
  tierOptions: {
    tierCode: string;
    timeOfArrival: Date;
    price: number;
  }[];
  selectedTier: string;
  onSelectTier: (selectedTier: string) => void;
}

const TierSelector: React.FC<TierSelectorProps> = ({
  tierOptions,
  selectedTier,
  onSelectTier,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select the agent tier</Text>
      {tierOptions.map((tierOption) => {
        const isActiveOption = tierOption.tierCode === selectedTier;
        return (
          <Pressable
            onPress={() => onSelectTier(tierOption.tierCode)}
            key={tierOption.tierCode}>
            <View
              style={[
                styles.tierOption,
                isActiveOption ? styles.activeTierOption : {},
              ]}>
              <Text>{TiersLabelsEnum[tierOption.tierCode]}</Text>
              <Text>U$D {formatCurrency(tierOption.price)}</Text>
              <Text>
                Arrival: {moment(tierOption.timeOfArrival).format('HH:MM')}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    ...fontFamily.Demi,
    ...fontSize.x16,
    textAlign: 'center',
    marginBottom: 20,
  },
  tierOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  activeTierOption: {
    backgroundColor: '#ccc',
  },
});
export default TierSelector;
