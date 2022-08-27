import React, { useState, useEffect } from 'react';
import { Image, Platform, Pressable, StyleSheet, View } from 'react-native';
import { Screens, Texts, Typography } from '../../styles';
import { Text } from '@ui-kitten/components';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import RoutesEnum, { RootStackParamList } from '../../shared/RoutesEnum';
import Button from '../../components/Button';
import CardBase from '../../components/CardBase';
import NavigationHeader from '../../components/NavigationHeader';
import ScreenBackground from '../../components/ScreenBackground';
import BgDots2Svg from '../../components/svgs/BgDots2Svg';
import BgCircleSvg from '../../components/svgs/BgCircleSvg';
import CreditCardSvg from '../../components/svgs/CreditCardSvg';
import UserService from '../../services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stripe from 'tipsi-stripe';

type ScreenRouteProp = RouteProp<
  RootStackParamList,
  RoutesEnum.SIGNUP_PAYMENT_OPTION
>;

const SignUpStep5 = (): JSX.Element => {
  const navigation = useNavigation();
  const route: ScreenRouteProp = useRoute();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showApplePay, setShowApplePay] = useState<boolean>(false);

  useEffect(() => {
    verifyApplePay();
  }, []);

  const verifyApplePay = async () => {
    if (Platform.OS == 'ios' && (await stripe.canMakeNativePayPayments())) {
      //setShowApplePay(true); Future implementation
    }
  };

  const finishRegistration = async () => {
    const { firstName, lastName, email, profilePictureId } = route.params;

    try {
      setIsLoading(true);

      const fcmToken: string = (await AsyncStorage.getItem('fcmToken')) || '';

      const cardTokenId = null;
      await UserService.updateProfile(
        firstName,
        lastName,
        email,
        fcmToken,
        profilePictureId,
        cardTokenId,
      );

      navigation.navigate(RoutesEnum.MAIN);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const addCreditCard = () => {
    navigation.navigate(RoutesEnum.SIGNUP_ADD_CREDIT_CARD, route.params);
  };

  return (
    <View style={styles.screen}>
      <NavigationHeader />

      <View style={styles.content}>
        <Text style={styles.title}>Add a payment method</Text>
        <Pressable onPress={addCreditCard}>
          <CardBase style={styles.creditCardOption}>
            <View style={styles.creditCardIcon}>
              <CreditCardSvg />
            </View>
            <Text style={styles.creditCardText}>Credit Card</Text>
          </CardBase>
        </Pressable>
        {showApplePay && (
          <Pressable onPress={() => {}}>
            <CardBase style={styles.applePayOption}>
              <Image
                source={require('../../assets/image-applepay.png')}
                width={83}
                height={34}
                style={styles.applePayIcon}
                accessibilityLabel="Apple Pay"
              />
            </CardBase>
          </Pressable>
        )}
      </View>

      <Button onPress={finishRegistration} loading={isLoading}>
        Skip
      </Button>

      <ScreenBackground>
        <BgDots2Svg style={styles.bgDots2b} />
        <BgDots2Svg style={styles.bgDots2} />
        <BgCircleSvg style={styles.bgCircle} />
      </ScreenBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    ...Screens.base,
    ...Screens.topAndBottomContent,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    marginTop: 60,
  },
  title: {
    ...Texts.h2,
    marginBottom: 50,
  },
  bgDots2b: {
    position: 'absolute',
    zIndex: -5,
    top: 100,
    left: -30,
    width: 114,
  },
  bgDots2: {
    position: 'absolute',
    zIndex: -5,
    top: 50,
    left: 205,
  },
  bgCircle: {
    position: 'absolute',
    zIndex: -5,
    top: 5,
    left: 280,
  },
  creditCardOption: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 20,
  },
  creditCardIcon: {
    marginRight: 20,
  },
  creditCardText: {
    ...Typography.fontSize.x18,
    ...Typography.fontFamily.Medium,
  },
  applePayOption: {
    alignItems: 'flex-start',
    padding: 20,
  },
  applePayIcon: {
    width: 83,
    height: 34,
  },
});
export default SignUpStep5;
