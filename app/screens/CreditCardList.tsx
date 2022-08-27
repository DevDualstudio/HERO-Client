import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import LoadingIndicator from '../components/LoadingIndicator';
import NavMenu from '../components/NavMenu';
import { Screens, Texts, S, Colors } from '../styles';
import { PaymentMethod } from '../types/PaymentMethod';
import PaymentMethodService from '../services/PaymentMethodService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../components/Button';
import stripe, { PaymentCardTextField } from 'tipsi-stripe';
import testID from '../shared/testID';
import { StripePaymentMethod } from '../types/StripePaymentMethod';
import { CreditCardParams } from '../types/CreditCardParams';
import { fontFamily, fontSize } from '../styles/typography';
import Delete from '../components/svgs/Delete';
import PaymentMethodOption from '../components/PaymentMethodOption';
import RoutesEnum from '../shared/RoutesEnum';

const CreditCardList = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>();
  const paymentComponent = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCards();
    });
    return unsubscribe;
  }, [navigation]);

  const getCards = async () => {
    try {
      setIsLoading(true);
      const cards = await PaymentMethodService.get();
      setPaymentMethods(cards);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const setDefaultCard = async (paymentMethod: PaymentMethod) => {
    if (paymentMethod.isPreferred) return;

    try {
      setIsLoading(true);
      await PaymentMethodService.savePreferred(paymentMethod.id);
      await getCards();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeleteMessage = (paymentMethod: PaymentMethod) => {
    Alert.alert(
      'Delete card',
      `Are you sure you want to delete card ending in ${paymentMethod.card.last4} ?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => deleteCard(paymentMethod),
        },
      ],
      { cancelable: false },
    );
  };

  const deleteCard = async (paymentMethod: PaymentMethod) => {
    try {
      setIsLoading(true);
      await PaymentMethodService.delete(paymentMethod.id);
      await getCards();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[Screens.centered]}>
      <NavMenu navigation={navigation} />
      <View style={[S.mt30]}>
        <Text style={styles.title}>Payment Methods</Text>
      </View>
      <ScrollView
        style={[S.w100, S.pl10, S.pr10]}
        contentContainerStyle={[S.pt10]}>
        {paymentMethods != undefined &&
          paymentMethods.map((p) => (
            <TouchableOpacity
              key={p.id}
              activeOpacity={0.8}
              style={[S.w100, S.mb20]}
              onPress={() => setDefaultCard(p)}>
              {p.isPreferred && (
                <View style={[S.w100, styles.defaultCard]}>
                  <Text style={[styles.defaultCardText, S.ml15]}>Default</Text>
                </View>
              )}
              <PaymentMethodOption p={p} onDelete={confirmDeleteMessage} />
            </TouchableOpacity>
          ))}
      </ScrollView>
      <View style={[S.w100, S.p10, S.pl20, S.pr20, S.mt30]}>
        <View style={[S.mb15, S.mt15]}>
          <Button
            onPress={() => navigation.navigate(RoutesEnum.ADD_PAYMENT_METHOD)}>
            Add payment method
          </Button>
        </View>
      </View>
      {isLoading && <LoadingIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...Texts.h2,
    marginBottom: 50,
  },
  defaultCard: {
    borderColor: Colors.heroic,
    backgroundColor: Colors.heroic,
    borderWidth: 1,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
  defaultCardText: {
    color: Colors.primary,
    ...fontFamily.Medium,
    marginTop: 2,
  },
  field: {
    width: '100%',
    color: '#449aeb',
    backgroundColor: '#FFFFFF',
  },
});

export default CreditCardList;
