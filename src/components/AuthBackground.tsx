import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const AuthBackground = ({ children }: { children: any }) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['white', '#b4d0fa']} style={styles.gradient}>
        <View
          style={{
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginTop: 80, 
          }}
        >
          <Image
            source={require('../../assets/logo1.png')}
            style={{ width: 60, height: 60, marginRight: 0 }} 
          />
          <Text
            style={{
              color: 'black',
              fontSize: 60,
              fontWeight: 'bold',
              textAlign: 'center',
              letterSpacing: 2,
            }}
          >
            LIV
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.contentWrapper}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    height: '35%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  contentWrapper: {
    flex: 1,
    marginTop:-100,
  },
});

export default AuthBackground;
