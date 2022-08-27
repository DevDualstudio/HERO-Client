import React, { Component } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  RequestService,
  CreditCardList,
  AddCreditCard,
  Account,
} from '../screens';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { S, Colors } from '../styles';
import ScreenBackground from '../components/ScreenBackground';
import BgDots2Svg from '../components/svgs/BgDots2Svg';
import BgCircleSvg from '../components/svgs/BgCircleSvg';
import CardBase from '../components/CardBase';
import BackSvg from '../components/svgs/BackSvg';

import { TouchableOpacity } from 'react-native-gesture-handler';
import RoutesEnum from '../shared/RoutesEnum';
import Button from '../components/Button';
import AuthService from '../services/AuthService';
import { fontFamily, fontSize } from '../styles/typography';
import InsuredSvg from '../components/svgs/InsuredSvg';
import {
  AccountSvg,
  FaqSvg,
  FavoritesSvg,
  HistorySvg,
  HomeSvg,
  PaymentSvg,
  SettingsSvg,
  TermsSvg,
} from '../components/svgs/menu';

const PaymentsStackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="PaymentMethods"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PaymentMethods" component={CreditCardList} />
      <Stack.Screen
        name={RoutesEnum.ADD_PAYMENT_METHOD}
        component={AddCreditCard}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[S.mt20, S.mb15, S.ml15]}
        onPress={() => {
          navigation.closeDrawer();
        }}>
        <CardBase style={styles.iconCard}>
          <BackSvg />
        </CardBase>
      </TouchableOpacity>
      <DrawerItemList {...props} />
      <View style={[S.pl15, S.pr15, S.mt20]}>
        <Pressable
          onPress={async () => {
            navigation.navigate(RoutesEnum.BECOME_HERO);
          }}>
          <View
            style={[
              S.row,
              S.center,
              S.pt5,
              S.pb5,
              {
                borderWidth: 1,
                backgroundColor: Colors.primary,
                borderColor: '#F3F3FA',
                borderRadius: 10,
              },
            ]}>
            <View style={[S.mr20]}>
              <InsuredSvg />
            </View>
            <Text style={[S.ml50, fontSize.x20, fontFamily.ExtraBoldO]}>
              I Want to be a Hero
            </Text>
          </View>
        </Pressable>
        <Button
          style={S.mt20}
          onPress={async () => {
            await AuthService.logout();
            navigation.navigate(RoutesEnum.INITIAL);
          }}>
          Log out
        </Button>
      </View>
      <ScreenBackground>
        <BgDots2Svg style={styles.bgDots2} />
        <BgCircleSvg style={styles.bgCircle} />
      </ScreenBackground>
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerType="front"
      drawerContentOptions={{
        activeTintColor: Colors.secondary,
        activeBackgroundColor: 'transparent',
        inactiveTintColor: Colors.secondary,
        inactiveBackgroundColor: 'transparent',
        labelStyle: styles.text,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{ width: '100%' }}>
      <Drawer.Screen
        name="Request Service"
        component={RequestService}
        options={{
          title: 'Home',
          drawerIcon: ({ focused, size }) => (
            <View style={[S.ml10]}>
              <HomeSvg />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="History"
        component={RequestService}
        options={{
          title: 'History',
          drawerIcon: ({ focused, size }) => (
            <View style={[S.ml10]}>
              <HistorySvg />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="Favorites"
        component={RequestService}
        options={{
          title: 'Favorites',
          drawerIcon: ({ focused, size }) => (
            <View style={[S.ml10]}>
              <FavoritesSvg />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="Payment Methods"
        component={PaymentsStackNavigator}
        options={{
          title: 'Payment Methods',
          drawerIcon: ({ focused, size }) => (
            <View style={[S.ml10]}>
              <PaymentSvg />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="Account"
        component={Account}
        options={{
          title: 'Account',
          drawerIcon: ({ focused, size }) => (
            <View style={[S.ml10]}>
              <AccountSvg />
            </View>
          ),
        }}
      />

      {/* <Drawer.Screen
        name="Settings"
        component={RequestService}
        options={{
          title: 'Settings',
          drawerIcon: ({ focused, size }) => (
            <View style={[S.ml10]}>
              <SettingsSvg />
            </View>
          ),
        }}
      /> */}

      <Drawer.Screen
        name="FAQ & Help"
        component={RequestService}
        options={{
          title: 'FAQ & Help',
          drawerIcon: ({ focused, size }) => (
            <View style={[S.ml10]}>
              <FaqSvg />
            </View>
          ),
        }}
      />

      <Drawer.Screen
        name="Terms & Conditions"
        component={RequestService}
        options={{
          title: 'Terms & Conditions',
          drawerIcon: ({ focused, size }) => (
            <View style={[S.ml10]}>
              <TermsSvg />
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
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
  iconCard: {
    width: 48,
    height: 48,
  },
  bottom: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
  text: {
    ...fontSize.x20,
    ...fontFamily.ExtraBoldO,
    marginLeft: -15,
  },
});

export default DrawerNavigator;
