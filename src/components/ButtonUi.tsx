import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  ActivityIndicator,
} from 'react-native';

interface ButtonProps {
  title: string|any;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled ? styles.disabledButton : null,
        buttonStyle,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '50%',
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#4A90E2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  disabledButton: {
    backgroundColor: '#a0c4ff',
  },
});

export default Button;
