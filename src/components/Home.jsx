import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const Home = ({ navigation }) => {
  function goShopping() {
    navigation.navigate("shop");
  }
  function goRegister() {
    navigation.navigate("register");
  }
  function goLogin() {
    navigation.navigate("login");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Bienvenue sur la version react native de reactshop
      </Text>
      <TouchableOpacity style={styles.touchable} onPress={goShopping}>
        <Text style={styles.btn}>Voir le shop</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable} onPress={goRegister}>
        <Text style={styles.btn}>register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable} onPress={goLogin}>
        <Text style={styles.btn}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const screen = Dimensions.get("window");
const btnWidth = screen.width / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    marginTop: 300,
    alignItems: "center",
    height: "100%",
  },
  text: {
    fontSize: 24,
    color: "orangered",
    fontWeight: "bold",
    marginBottom: 20,
  },
  btn: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
  },
  touchable: {
    height: Math.floor(btnWidth / 2 - 15),
    width: Math.floor(btnWidth - 15),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Math.floor(btnWidth),
    margin: 7,
    backgroundColor: "#000",
    padding: 12,
  },
});

export default Home;
