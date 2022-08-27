import * as React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { fontFamily, fontSize } from '../styles/typography';

interface PressableListItemProps {
  icon: JSX.Element;
  title: string;
  description?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

const PressableListItem: React.FC<PressableListItemProps> = ({
  icon: Icon,
  title,
  description,
  onPress,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Pressable onPress={onPress}>
        <View style={styles.button}>
          <View style={styles.icon}>{Icon}</View>
          <View style={styles.texts}>
            <Text style={styles.title}>{title}</Text>
            {description && (
              <Text style={styles.description}>{description}</Text>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  icon: {
    paddingRight: 10,
    width: 50,
    alignItems: 'center',
  },
  texts: {
    flex: 1,
  },
  title: {
    ...fontSize.x16,
    ...fontFamily.Demi,
  },
  description: {},
});
export default PressableListItem;
