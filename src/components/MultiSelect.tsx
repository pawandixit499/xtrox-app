import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const MultiSelect = ({ data = [], selectedValues = [], onChange, label }:{data:any,selectedValues:any,onChange:any,label:any}) => {
  const [selected, setSelected] = useState(selectedValues);

  const toggleSelect = (item:any) => {
    let updatedSelection;
    if (selected.includes(item)) {
      updatedSelection = selected.filter((i:any) => i !== item);
    } else {
      updatedSelection = [...selected, item];
    }
    setSelected(updatedSelection);
    onChange(updatedSelection);
  };
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      {data.map((item:any) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => toggleSelect(item)}
          style={[
            styles.item,
            selected.includes(item) && styles.selectedItem,
          ]}
        >
          <Text
            style={[
              styles.itemText,
              selected.includes(item) && styles.selectedText,
            ]}
          >
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  item: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedItem: {
    backgroundColor: "#007AFF",
  },
  itemText: {
    color: "#000",
  },
  selectedText: {
    color: "#fff",
  },
});

export default MultiSelect;
