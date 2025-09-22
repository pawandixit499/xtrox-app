import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome';
interface CheckboxProps {
  value: boolean; 
  onChange: (checked: boolean) => void; 
  label?: string; 
  style?: ViewStyle; 
  checkboxStyle?: ViewStyle; 
  labelStyle?: TextStyle; 
}

const Checkbox: React.FC<CheckboxProps> = ({
  value,
  onChange,
  label,
  style,
  checkboxStyle,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.checkboxContainer, style]}
      onPress={() => onChange(!value)}
      activeOpacity={0.8}
    >
      <View style={[styles.checkbox, value && styles.checkboxChecked, checkboxStyle]}>
        {value && <Icon name="check" size={14} color="#fff" />}
      </View>
      {label && <Text style={[styles.checkboxText, labelStyle]}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#4A90E2',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4A90E2',
  },
  checkboxText: {
    marginLeft: 8,
    color: '#555',
    fontSize: 14,
  },
});
