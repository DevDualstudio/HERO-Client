import { StyleSheet, View } from 'react-native';
import React from 'react';

const Hr = () => {
  return <View style={styles.hr} />;
};
const styles = StyleSheet.create({
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: '#F4F5F8',
  },
});

export default Hr;
