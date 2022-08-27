import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
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
import NavigationHeader from '../components/NavigationHeader';
import Delete from '../components/svgs/Delete';

const AddCreditCard = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingAddCard, setIsLoadingAddCard] = useState<boolean>(false);
  const [params, setParams] = useState<CreditCardParams>();
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleFieldParamsChange = (
    valid: boolean,
    params: CreditCardParams,
  ) => {
    setIsValid(valid);
    setParams(params);
  };

  const onAddCard = async () => {
    if (isValid) {
      setIsLoadingAddCard(true);
      const tokenResponse: StripePaymentMethod = await stripe.createTokenWithCard(
        params,
      );
      setIsLoadingAddCard(false);
      try {
        setIsLoading(true);
        await PaymentMethodService.save(tokenResponse.tokenId);
        await navigation.goBack();
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.screen}>
      <NavigationHeader noShadowToggle={true} />
      <View style={[S.w100, S.p10, S.pl20, S.pr20, S.mt30]}>
        <PaymentCardTextField
          accessible={false}
          style={styles.field}
          onParamsChange={handleFieldParamsChange}
          numberPlaceholder="XXXX XXXX XXXX XXXX"
          expirationPlaceholder="MM/YY"
          cvcPlaceholder="CVC"
          {...testID('cardTextField')}
        />
        <View style={[S.mb15, S.mt15]}>
          <Button loading={isLoadingAddCard} onPress={onAddCard}>
            Add card
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    width: '100%',
    color: '#449aeb',
    backgroundColor: '#FFFFFF',
  },
  screen: {
    ...Screens.base,
    height: '100%',
  },
});

export default AddCreditCard;
