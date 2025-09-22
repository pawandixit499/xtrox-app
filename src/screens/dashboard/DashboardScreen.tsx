import React, { useEffect } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setToken, setUserInfo } from "../../Stores/Slice/UserSlice";
import ButtonUi from "../../components/ButtonUi";

const DashboardScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("savedEmail");
    await AsyncStorage.removeItem("savedPassword");
    dispatch(setToken(null));
    dispatch(setUserInfo(null));
    navigation.replace("Login");
  };

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Dashboard</Text>
      <Text>It's available you soon</Text>
      <View style={{ marginTop: 20, width: "60%" }}>
        <ButtonUi title="Logout" onPress={logout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
});

export default DashboardScreen;
