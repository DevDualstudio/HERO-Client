import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PaymentMethodService from '../services/PaymentMethodService';
import { Colors, S } from '../styles';
import { fontFamily, fontSize } from '../styles/typography';
import { PaymentMethod } from '../types/PaymentMethod';
import Delete from './svgs/Delete';

interface PaymentMethodOptionProps {
  p: PaymentMethod;
  showDelete?: boolean;
  onDelete?: (p: PaymentMethod) => void;
}

const PaymentMethodOption: React.FC<PaymentMethodOptionProps> = ({
  p,
  showDelete = true,
  onDelete,
}) => {
  return (
    <View
      style={[
        S.p10,
        styles.innerCardContainer,
        p.isPreferred ? styles.innerCardContainerDefault : null,
      ]}>
      <View style={[S.row]}>
        <View style={[S.col, S.flex1, S.center, S.pr10]}>
          {PaymentMethodService.getCardLogo(p.card.brand)}
        </View>
        <View style={[S.col, S.flex4]}>
          <View style={[S.row, S.spaceBetween]}>
            <Text style={styles.text}>{p.card.brand.toUpperCase()}</Text>
            <Text style={styles.text}>
              {p.card.expMonth.toString().padStart(2, '0')}/
              {p.card.expYear.toString().substr(2, 2)}
            </Text>
          </View>
          <View style={[S.row, S.mt5, S.spaceBetween]}>
            <View style={[S.row]}>
              <Text style={[styles.text, fontSize.x12]}>●●●●</Text>
              <Text style={[S.ml15, styles.text, fontSize.x12]}>●●●●</Text>
              <Text style={[S.ml15, styles.text, fontSize.x12]}>●●●●</Text>
              <Text style={[S.ml15, styles.text]}>{p.card.last4}</Text>
            </View>

            {showDelete && (
              <View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => onDelete(p)}>
                  <Delete />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    ...fontSize.x18,
    ...fontFamily.Medium,
  },
  innerCardContainer: {
    backgroundColor: Colors.primary,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  innerCardContainerDefault: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderColor: Colors.heroic,
    borderWidth: 1,
  },
});
export default PaymentMethodOption;
