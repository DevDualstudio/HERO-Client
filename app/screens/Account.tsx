import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { Screens, Texts, S } from '../styles';
import { useNavigation } from '@react-navigation/native';
import RoutesEnum from '../shared/RoutesEnum';
import NavigationHeader from '../components/NavigationHeader';
import ScreenBackground from '../components/ScreenBackground';
import BgDots2Svg from '../components/svgs/BgDots2Svg';
import BgCircleSvg from '../components/svgs/BgCircleSvg';
import LogoSvg from '../components/svgs/LogoSvg';
import TextInput from '../components/TextInput';
import LetterSvg from '../components/svgs/LetterSvg';
import UserSvg from '../components/svgs/UserSvg';
import Button from '../components/Button';
import ImageUpload from '../components/ImageUpload';
import { File } from '../shared/File';
import UserService from '../services/UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/User';
import LoadingIndicator from '../components/LoadingIndicator';
import * as EmailValidator from 'email-validator';
import { showMessage, hideMessage } from 'react-native-flash-message';

const Account = (): JSX.Element => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isReloading, setIsReloading] = useState<boolean>(false);
  const [profilePictureId, setProfilePictureId] = useState<number>();
  const [imageChanged, setImageChanged] = useState<boolean>(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const userString = await AsyncStorage.getItem('user');
    const user: User = JSON.parse(userString!);

    setFirstName(user.firstName!);
    setLastName(user.lastName!);
    setEmail(user.email!);
    if (user.profilePictureId) {
      setProfilePictureId(user.profilePictureId);
    }
    if (user.profilePictureUrl) {
      setProfileImage({ uri: user.profilePictureUrl });
    }
    setIsLoading(false);
  };

  const submitProfile = async () => {
    try {
      setIsReloading(true);
      let profilePictureId = null;
      if (profileImage && imageChanged) {
        profilePictureId = await UserService.uploadFile(profileImage!);
      }

      const fcmToken: string = (await AsyncStorage.getItem('fcmToken')) || '';

      await UserService.updateProfile(
        firstName,
        lastName,
        email,
        fcmToken,
        profilePictureId,
        '',
      );

      loadProfile();

      showMessage({
        message: 'Success',
        description: 'Profile updated',
        type: 'success',
        duration: 2000,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsReloading(false);
    }
  };

  if (isLoading) {
    return <LoadingIndicator></LoadingIndicator>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[S.flex1]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <NavigationHeader noShadowToggle={true} />

          <View style={[styles.bottom]}>
            <View style={[styles.info, S.mt80]}>
              <View style={[S.centerX]}>
                <View style={{ width: 100 }}>
                  <ImageUpload
                    defaultPhoto={profileImage}
                    onSelectedPhoto={(file) => {
                      setImageChanged(true);
                      setProfileImage(file);
                    }}
                  />
                </View>
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
                !EmailValidator.validate(email) ||
                !profileImage
              }
              loading={isLoading}>
              Update
            </Button>
          </View>

          <ScreenBackground>
            <BgDots2Svg style={styles.bgDots2} />
            <BgCircleSvg style={styles.bgCircle} />
          </ScreenBackground>
          {isReloading && <LoadingIndicator></LoadingIndicator>}
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
    top: -130,
    left: 250,
  },
});
export default Account;
