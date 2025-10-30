import React from 'react'
import { StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

type DropdownItem = {
  label: string
  value: string | number | boolean | null | undefined
}

type CustomDropDownProps = {
  data: DropdownItem[]
  value: string | number | null | boolean | undefined
  onChange: (item: DropdownItem) => void
  placeholder?: string
  style?: ViewStyle
  labelField?: string
  valueField?: string,
  placeholderColor?: string
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  data = [],
  value,
  onChange,
  placeholder = "Select option",
  style,
  labelField = "label",
  valueField = "value",
  placeholderColor = 'gray'
}) => {
  return (
    <Dropdown
      style={[styles.dropdown, style]}
      data={data}
      labelField={labelField}
      valueField={valueField}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      placeholderStyle={[styles.placeholderStyle, { color: placeholderColor }]}
    />
  )
}

export default CustomDropDown

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0,
    borderRadius: 30,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 3,
    paddingLeft: 16,
    marginBottom: 20,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'gray',
  } as TextStyle,
})
