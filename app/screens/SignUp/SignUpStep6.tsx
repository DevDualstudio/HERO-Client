import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Screens, Texts, S } from '../../styles';
import { Text } from '@ui-kitten/components';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import RoutesEnum, { RootStackParamList } from '../../shared/RoutesEnum';
import UserService from '../../services/UserService';
import Button from '../../components/Button';
import AddCreditCard from '../../components/AddCreditCard';
import NavigationHeader from '../../components/NavigationHeader';
import { CreditCardParams } from '../../types/CreditCardParams';
import { StripePaymentMethod } from '../../types/StripePaymentMethod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stripe from 'tipsi-stripe';

type ScreenRouteProp = RouteProp<
  RootStackParamList,
  RoutesEnum.SIGNUP_ADD_CREDIT_CARD
>;

const SignUpStep6 = (): JSX.Element => {
  const navigation = useNavigation();
  const route: ScreenRouteProp = useRoute();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [creditCardParams, setCreditCardParams] = useState<CreditCardParams>();
  const [isValidCreditCard, setIsValidCreditCard] = useState<boolean>();

  const handleFieldParamsChange = (
    valid: boolean,
    params: CreditCardParams,
  ) => {
    setIsValidCreditCard(valid);
    setCreditCardParams(params);
  };

  const finishRegistration = async (skip: boolean) => {
    const { firstName, lastName, email, profilePictureId } = route.params;

    try {
      setIsLoading(true);

      let cardTokenId = '';
      if (!skip) {
        const tokenResponse: StripePaymentMethod = await stripe.createTokenWithCard(
          creditCardParams,
        );
        cardTokenId = tokenResponse.tokenId;
      }

      const fcmToken: string = (await AsyncStorage.getItem('fcmToken')) || '';

      await UserService.updateProfile(
        firstName,
        lastName,
        email,
        fcmToken,
        profilePictureId,
        cardTokenId,
      );

      navigation.reset({
        routes: [{ name: RoutesEnum.MAIN }],
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.screen, S.spaceBetween]}>
      <NavigationHeader />

      <View style={[S.mt60]}>
        <Text style={styles.title}>Add a credit card</Text>
        <AddCreditCard
          onParamsChange={handleFieldParamsChange}
          params={creditCardParams}
        />
        <Button
          onPress={() => finishRegistration(false)}
          loading={isLoading}
          disabled={!isValidCreditCard}>
          Add card
        </Button>
      </View>
      <View>
        <View style={[S.mt15]}>
          <Button onPress={() => finishRegistration(true)} loading={isLoading}>
            Skip
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    ...Screens.base,
    ...Screens.topAndBottomContent,
  },
  content: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    ...Texts.h2,
    marginBottom: 30,
  },
  photoButton: {
    width: '50%',
  },
  buttonGroup: {
    marginTop: 20,
  },
});
export default SignUpStep6;
