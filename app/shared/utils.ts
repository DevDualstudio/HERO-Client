import { NavigationProp } from '@react-navigation/core';

export const getNumbers = (str: string): number => {
  return parseInt(str.replace(/\D/g, ''));
};

export const formatCurrency = (number: number) => {
  return number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export const navigateAndResetStack = (
  navigation: NavigationProp<any>,
  route: string,
) => {
  navigation.reset({
    index: 0,
    routes: [{ name: route }],
  });
};
