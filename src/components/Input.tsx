import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, StyleProp, TextStyle } from 'react-native';
interface InputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  containerStyle?: StyleProp<TextStyle>;
}

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error = '',
  containerStyle,
  ...rest
}) => {
  return (
    <View style={[ containerStyle]}>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={secureTextEntry}
        {...rest} 
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({

 
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    marginBottom: 18,
    borderRadius: 30,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 3,
  },
  inputError: {
    borderColor: '#ff4d4f',
  },
  errorText: {
    color: '#ff4d4f',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Input;
