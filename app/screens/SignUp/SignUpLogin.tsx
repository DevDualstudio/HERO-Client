import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
} from 'react-native';
import RoutesEnum from '../../shared/RoutesEnum';
import { Colors, Screens, Texts, S } from '../../styles';
import AuthService from '../../services/AuthService';
import NavigationHeader from '../../components/NavigationHeader';
import { fontFamily, fontSize } from '../../styles/typography';
import PhoneVerificationSvg from '../../components/svgs/PhoneVerificationSvg';
import ScreenBackground from '../../components/ScreenBackground';
import BgDots1Svg from '../../components/svgs/BgDots1Svg';
import BgDots2Svg from '../../components/svgs/BgDots2Svg';
import BgCircleSvg from '../../components/svgs/BgCircleSvg';
import CardBase from '../../components/CardBase';
import CodeInput from '../../components/CodeInput';
import { User } from '../../types/User';
import Button from '../../components/Button';
import TextInputMask from 'react-native-text-input-mask';
import { showMessage, hideMessage } from 'react-native-flash-message';
import Geolocation from 'react-native-geolocation-service';

const SignUpLogin = (): JSX.Element => {
  const navigation = useNavigation();
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const sendVerificationCode = async () => {
    try {
      setIsLoading(true);
      await AuthService.sendVerificationCode(phoneNumber);
      setIsVerifyingCode(true);
    } catch (e) {
      console.log(e);
      showMessage({
        message: 'Error',
        description: 'An error has ocurred with the mobile phone number',
        type: 'danger',
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    console.log(1);
    try {
      const result = await Geolocation.requestAuthorization('always');
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithPhone = async (verificationCode: string) => {
    try {
      setIsLoading(true);
      await AuthService.login(phoneNumber, verificationCode);
      const user: User = await AuthService.getActiveUser();
      let route;
      if (!user.firstName) {
        route = RoutesEnum.SIGNUP_COMPLETE_BASIC_INFO;
      } else {
        route = RoutesEnum.MAIN;
      }
      navigation.navigate(route);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[S.flex1]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <NavigationHeader />
          <View style={styles.info}>
            <View style={styles.icon}>
              <PhoneVerificationSvg />
            </View>
            {!isVerifyingCode && (
              <View style={styles.numberInputInfo}>
                <Text style={styles.title}>Verify phone number</Text>
                <Text style={styles.description}>
                  You will receive an SMS with a 4-digit code to verify later.
                </Text>

                <View style={[S.center, S.row]}>
                  <CardBase style={[S.p15]}>
                    <TextInputMask
                      placeholder="(000) 000-0020"
                      style={{ width: 140 }}
                      onChangeText={(formatted, extracted) => {
                        setPhoneNumber('+1' + extracted!);
                      }}
                      mask={'+1 ([000]) [000]-[0000]'}
                    />
                  </CardBase>
                  <View style={[S.ml30]}>
                    <Button
                      style={styles.button}
                      textStyles={styles.buttonText}
                      loading={isLoading}
                      onPress={sendVerificationCode}
                      disabled={phoneNumber.length != 12}>
                      Send SMS
                    </Button>
                  </View>
                </View>
              </View>
            )}
            {isVerifyingCode && (
              <View style={styles.codeInputInfo}>
                <Text style={styles.title}>Verify code</Text>
                <View style={styles.codeDescription}>
                  <Text style={styles.description}>Didn't get the SMS?</Text>
                  <Pressable onPress={() => setIsVerifyingCode(false)}>
                    <Text style={styles.link}>Send it again</Text>
                  </Pressable>
                </View>

                <CardBase>
                  <CodeInput
                    isLoading={isLoading}
                    onSend={(c: string) => loginWithPhone(c)}
                  />
                </CardBase>
              </View>
            )}
          </View>
          <ScreenBackground>
            <BgDots1Svg style={styles.bgDots1} />
            <BgDots2Svg style={styles.bgDots2} />
            <BgCircleSvg style={styles.bgCircle} />
          </ScreenBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    ...Screens.base,
    paddingTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  info: {
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    marginBottom: 30,
  },
  title: {
    ...Texts.h2,
    textAlign: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  description: {
    ...Texts.p,
    maxWidth: 240,
    marginBottom: 30,
    lineHeight: 24,
  },
  link: {
    ...Texts.p,
    marginBottom: 30,
    lineHeight: 24,
    color: Colors.heroic,
    marginLeft: 5,
    ...fontFamily.Medium,
  },
  codeDescription: {
    flexDirection: 'row',
  },
  phoneCard: {
    paddingVertical: 12,
    paddingLeft: 10,
    paddingRight: 14,
    flexDirection: 'row',
    // width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numberInputInfo: {
    alignItems: 'center',
  },
  codeInputInfo: {
    alignItems: 'center',
  },
  button: {},
  buttonText: {
    ...fontSize.x14,
  },
  input: {
    marginRight: 20,
  },
  bgDots1: {
    position: 'absolute',
    zIndex: -1,
    top: 50,
    left: 205,
  },
  bgDots2: {
    position: 'absolute',
    zIndex: -1,
    top: 150,
    left: 0,
  },
  bgCircle: {
    position: 'absolute',
    zIndex: -1,
    top: 78,
    left: 320,
  },
});
export default SignUpLogin;
