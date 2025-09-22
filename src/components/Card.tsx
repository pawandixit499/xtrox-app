import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, ScrollView } from 'react-native';

interface CardProps {
  children: React.ReactNode;       
  style?: ViewStyle;               
  contentStyle?: ViewStyle;        
  shadow?: boolean;               
  borderRadius?: number;           
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  contentStyle,
  shadow = true,
  borderRadius = 12,
}) => {
  return (
    <View
      style={[
        styles.card,
        shadow && styles.shadow,
        { borderRadius },
        style,
      ]}
    >
      <View style={[styles.content, contentStyle]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </View>
    </View>
   
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
  },
  content: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
