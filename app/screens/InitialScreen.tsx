import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AuthService from '../services/AuthService';
import RoutesEnum from '../shared/RoutesEnum';
import { User } from '../types/User';
import SplashScreen from './SplashScreen';

const InitialScreen = () => {
  const navigation = useNavigation();

  const routeToScreen = async () => {
    const user: User = await AuthService.getActiveUser();
    let route;
    if (!user) {
      route = RoutesEnum.TUTORIAL;
    } else if (!user.firstName) {
      route = RoutesEnum.SIGNUP_COMPLETE_BASIC_INFO;
    } else {
      route = RoutesEnum.MAIN;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: route }],
    });
  };
  routeToScreen();

  return <SplashScreen />;
};
export default InitialScreen;
