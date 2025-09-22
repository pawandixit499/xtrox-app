import React from 'react';
import { StyleSheet, TextInput, View, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
interface PasswordInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;       
  inputStyle?: TextStyle;  
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Password',
  style,
  inputStyle,
  ...rest
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Icon name="vpn-key" size={20} color="#555" style={styles.icon} />
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor="#555"
        secureTextEntry={true}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};

export default PasswordInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111',
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});
