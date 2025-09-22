import React from 'react';
import { Text, TouchableOpacity, View, ViewStyle, TextStyle, StyleSheet } from 'react-native';

interface LinkProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Link: React.FC<LinkProps> = ({ text, onPress, style, textStyle }) => {
  return (
    <View style={style}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Text style={[styles.linkText, textStyle]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Link;

const styles = StyleSheet.create({
    linkText: {
        color: '#007bff',
        fontSize: 14,
      },
});
