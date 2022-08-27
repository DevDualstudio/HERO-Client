import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import RoutesEnum from '../shared/RoutesEnum';
import { Colors, S } from '../styles';
import { fontFamily, fontSize } from '../styles/typography';
import ShieldPartySvg from './svgs/ShieldPartySvg';
import ShieldPowerSvg from './svgs/ShieldPowerSvg';
import ShieldTimeSvg from './svgs/ShiledTimeSvg';

interface ServiceTypeMenuProps {
  style?: ViewStyle;
}

const ServiceTypeMenu: React.FC<ServiceTypeMenuProps> = ({ style }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, style, S.center]}>
      <Pressable
        onPress={() =>
          navigation.navigate(RoutesEnum.REQUEST_NOW_ORIGIN_DESTINATION)
        }>
        <View style={[styles.service]}>
          <View style={[styles.icon, styles.heroIcon]}>
            <ShieldPowerSvg />
          </View>
          <Text style={[styles.text, S.mt5]}>Hero</Text>
        </View>
      </Pressable>
      {/* <Pressable>
        <View style={styles.service}>
          <View style={styles.icon}>
            <ShieldTimeSvg />
          </View>
          <Text style={styles.text}>Reserve</Text>
        </View>
      </Pressable>
      <Pressable>
        <View style={styles.service}>
          <View style={styles.icon}>
            <ShieldPartySvg />
          </View>
          <Text style={styles.text}>Event</Text>
        </View>
      </Pressable> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  service: {},
  icon: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'rgba(46,91,255,0.08)',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIcon: {
    backgroundColor: Colors.secondary,
  },
  text: {
    ...fontFamily.Medium,
    ...fontSize.x18,
    textAlign: 'center',
  },
});
export default ServiceTypeMenu;
