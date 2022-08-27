import { useNavigation } from '@react-navigation/core';
import { Spinner } from '@ui-kitten/components';
import { find } from 'lodash';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import usePaymentMethods from '../hooks/usePaymentMethods';
import RoutesEnum from '../shared/RoutesEnum';
import { PaymentMethod } from '../types/PaymentMethod';
import Button from './Button';
import PaymentMethodOption from './PaymentMethodOption';

interface PaymentSelectorProps {
  selectedPayment?: PaymentMethod;
  onSelectPayment: (paymentMethod: PaymentMethod) => void;
}

const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  selectedPayment,
  onSelectPayment,
}) => {
  const navigation = useNavigation();
  const selectDefaultPaymentMethod = (paymentMethods: PaymentMethod[]) => {
    if (!selectedPayment && paymentMethods.length) {
      const defaultPaymentMethod =
        find(paymentMethods, { isPreferred: true }) || paymentMethods[0];
      onSelectPayment(defaultPaymentMethod);
    }
  };

  const { isLoadingPaymentMethods, paymentMethods } = usePaymentMethods({
    onPaymentMethodLoad: selectDefaultPaymentMethod,
  });

  return (
    <View style={styles.container}>
      {isLoadingPaymentMethods && <Spinner />}
      {!isLoadingPaymentMethods && selectedPayment && (
        <Pressable>
          <View style={styles.paymentOption}>
            <PaymentMethodOption showDelete={false} p={selectedPayment} />
          </View>
        </Pressable>
      )}
      {!isLoadingPaymentMethods && !paymentMethods.length && (
        <Pressable>
          <View>
            <Button
              onPress={() => {
                navigation.navigate(RoutesEnum.ADD_PAYMENT_METHOD);
              }}>
              Add a payment method
            </Button>
          </View>
        </Pressable>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  paymentOption: {
    backgroundColor: '#ccc',
  },
});
export default PaymentSelector;
