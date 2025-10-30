import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View } from 'react-native'
import Button from '../../../../components/ButtonUi';

const Notification = () => {
    const navigation = useNavigation();

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.goBack()} title="Go back home"/>
      </View>
    );
}

export default Notification