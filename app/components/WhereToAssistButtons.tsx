import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import RoutesEnum from '../shared/RoutesEnum';
import { fontFamily, fontSize } from '../styles/typography';
import ClockSvg from './svgs/ClockSvg';
import ShieldPowerBlackSvg from './svgs/ShieldPowerBlackSvg';

interface WhereToAssistButtonsProps {
  onPressSchedule?: () => void;
}

const WhereToAssistButtons: React.FC<WhereToAssistButtonsProps> = ({
  onPressSchedule,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.left}
        onPress={() =>
          navigation.navigate(RoutesEnum.REQUEST_NOW_ORIGIN_DESTINATION)
        }>
        <ShieldPowerBlackSvg />
        <Text style={styles.leftText}>Where to assist?</Text>
      </Pressable>
      <Pressable style={styles.right} onPress={onPressSchedule}>
        <View style={styles.button}>
          <ClockSvg />
          <Text style={styles.rightText}>Now</Text>
          <Text style={styles.downArrowHead}>⌵</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: '#F4F5F8',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftText: {
    ...fontFamily.Demi,
    ...fontSize.x18,
    marginLeft: 10,
    marginBottom: 2,
  },
  right: {
    borderLeftColor: '#ECECEC',
    borderLeftWidth: 2,
    paddingLeft: 15,
  },
  rightText: {
    ...fontFamily.Demi,
    ...fontSize.x12,
    marginLeft: 13,
    marginBottom: 2,
  },
  button: {
    backgroundColor: '#fff',
    width: 116,
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  downArrowHead: {
    ...fontFamily.Bold,
    marginLeft: 5,
    fontSize: 12,
    marginBottom: 3,
  },
});
export default WhereToAssistButtons;
