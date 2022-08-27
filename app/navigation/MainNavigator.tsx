import { NavigationContainer } from '@react-navigation/native';
import RoutesEnum, { RootStackParamList } from '../shared/RoutesEnum';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import {
  InitialScreen,
  SignUpLogin,
  SignUpBasicInfo,
  SignUpStep5,
  SignUpStep6,
  Tutorial,
  ValidateLocation,
  ApplyHero,
  ApplyHeroDocuments,
} from '../screens';
import DrawerNavigator from './DrawerNavigator';
import RequestNowOriginDestination from '../screens/RequestNow/RequestNowOriginDestination';
import RequestNowSearchingAgent from '../screens/RequestNow/RequestNowSearchingAgent';
import RequestNowTierSelection from '../screens/RequestNow/RequestNowTierSelection';

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={RoutesEnum.INITIAL}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name={RoutesEnum.INITIAL} component={InitialScreen} />
        <Stack.Screen name={RoutesEnum.TUTORIAL} component={Tutorial} />
        {/* <Stack.Screen
          name={RoutesEnum.VALIDATE_LOCATION}
          component={ValidateLocation}
        /> */}
        <Stack.Screen name={RoutesEnum.SIGNUP_LOGIN} component={SignUpLogin} />
        <Stack.Screen
          name={RoutesEnum.SIGNUP_COMPLETE_BASIC_INFO}
          component={SignUpBasicInfo}
        />

        <Stack.Screen
          name={RoutesEnum.SIGNUP_PAYMENT_OPTION}
          component={SignUpStep5}
        />
        <Stack.Screen
          name={RoutesEnum.SIGNUP_ADD_CREDIT_CARD}
          component={SignUpStep6}
        />
        <Stack.Screen name={RoutesEnum.BECOME_HERO} component={ApplyHero} />
        <Stack.Screen
          name={RoutesEnum.SUBMIT_HERO_DOCUMENTS}
          component={ApplyHeroDocuments}
        />
        <Stack.Screen name={RoutesEnum.MAIN} component={DrawerNavigator} />
        <Stack.Screen
          name={RoutesEnum.REQUEST_NOW_ORIGIN_DESTINATION}
          component={RequestNowOriginDestination}
        />
        <Stack.Screen
          name={RoutesEnum.REQUEST_NOW_SEARCHING_AGENT}
          component={RequestNowSearchingAgent}
        />
        <Stack.Screen
          name={RoutesEnum.REQUEST_NOW_TIER_SELECTION}
          component={RequestNowTierSelection}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;
