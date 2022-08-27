import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { Screens, Texts, S } from '../../styles';
import { useNavigation } from '@react-navigation/native';
import RoutesEnum from '../../shared/RoutesEnum';
import NavigationHeader from '../../components/NavigationHeader';
import ScreenBackground from '../../components/ScreenBackground';
import BgDots2Svg from '../../components/svgs/BgDots2Svg';
import BgCircleSvg from '../../components/svgs/BgCircleSvg';
import LogoSvg from '../../components/svgs/LogoSvg';
import TextInput from '../../components/TextInput';
import LetterSvg from '../../components/svgs/LetterSvg';
import UserSvg from '../../components/svgs/UserSvg';
import Button from '../../components/Button';
import ImageUpload from '../../components/ImageUpload';
import { File } from '../../shared/File';
import UserService from '../../services/UserService';
import * as EmailValidator from 'email-validator';

const SignUpBasicInfo = (): JSX.Element => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitProfile = async () => {
    try {
      setIsLoading(true);
      let profilePictureId = null;
      if (profileImage) {
        profilePictureId = await UserService.uploadFile(profileImage!);
      }

      navigation.navigate(RoutesEnum.SIGNUP_ADD_CREDIT_CARD, {
        firstName,
        lastName,
        email,
        profilePictureId,
      });
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
          <NavigationHeader noShadowToggle={true} />

          <View style={styles.bottom}>
            <View style={styles.info}>
              <Text style={styles.title}>Create profile</Text>
              <View style={{ width: 100 }}>
                <ImageUpload
                  onSelectedPhoto={(file) => {
                    setProfileImage(file);
                  }}
                />
              </View>
              <TextInput
                value={email}
                label="Email"
                onChangeText={(newValue: string) => setEmail(newValue)}
                keyboardType="email-address"
                icon={LetterSvg}
                style={styles.input}
              />

              <TextInput
                label="First name"
                value={firstName}
                onChangeText={(newValue: string) => setFirstName(newValue)}
                icon={UserSvg}
                style={styles.input}
              />

              <TextInput
                value={lastName}
                label="Last name"
                onChangeText={(newValue: string) => setLastName(newValue)}
                icon={UserSvg}
                style={[styles.input, styles.inputLast]}
              />
            </View>

            <Button
              onPress={submitProfile}
              disabled={
                !firstName ||
                !lastName ||
                !email ||
                !EmailValidator.validate(email)
              }
              loading={isLoading}>
              Continue
            </Button>
          </View>

          <ScreenBackground>
            <BgDots2Svg style={styles.bgDots2} />
            <BgCircleSvg style={styles.bgCircle} />
            <View style={styles.logo}>
              <LogoSvg dark />
            </View>
          </ScreenBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    ...Screens.base,
    height: '100%',
    justifyContent: 'flex-end',
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
  },
  bottom: {
    paddingTop: 25,
    paddingRight: 16,
    paddingBottom: 30,
    paddingLeft: 16,
  },
  info: {
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  inputLast: {
    marginBottom: 0,
  },
  title: {
    ...Texts.h2,
    marginBottom: 10,
  },
  logo: {
    position: 'absolute',
    zIndex: -5,
    top: 120,
    left: 30,
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
    top: 30,
    left: 250,
  },
});
export default SignUpBasicInfo;
