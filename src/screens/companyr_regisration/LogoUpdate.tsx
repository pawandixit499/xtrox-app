import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import ButtonUi from '../../components/ButtonUi';
import Card from '../../components/Card';

const LogoUpdate = () => {
  const [logo, setLogo] = useState<any>(null);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, response => {
      if (response && response.assets && response.assets.length > 0) {
        setLogo(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = () => {
    if (!logo) {
      console.log('Please select a logo first');
      return;
    }
    console.log('Submitting logo:', logo);
  };

  return (
    <Card
      style={{
        maxHeight: '90%',
        justifyContent: 'center',
        height:600,
        padding: 20,
        margin: 20,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Update Logo</Text>

        <View style={styles.previewBox}>
          {logo ? (
            <Image source={{ uri: logo }} style={styles.logo} />
          ) : (
            <Text style={styles.placeholder}>No logo selected</Text>
          )}
        </View>

        <ButtonUi
          title="Choose Logo"
          onPress={pickImage}
          buttonStyle={{ marginBottom: 15, width: '100%' }}
        />

        <ButtonUi
          title="Submit"
          onPress={handleSubmit}
          buttonStyle={{ width: '100%' }}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  previewBox: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  placeholder: {
    color: '#777',
  },
});

export default LogoUpdate;
