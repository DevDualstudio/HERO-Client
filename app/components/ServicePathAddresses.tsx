import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ServiceAddress } from '../types/ServiceAddress';

interface ServicePathAddressesProps {
  from: ServiceAddress;
  to: ServiceAddress[];
}

const ServicePathAddresses: React.FC<ServicePathAddressesProps> = ({
  from,
  to,
}) => {
  return (
    <View>
      <View style={styles.fromItem}>
        <Text>From: {from.address}</Text>
      </View>
      {to.map((toItem) => (
        <View style={styles.toItem} key={toItem.address}>
          <Text>To: {toItem.address}</Text>
        </View>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  fromItem: {},
  toItem: {},
});
export default ServicePathAddresses;
