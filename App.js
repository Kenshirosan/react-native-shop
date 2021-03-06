import "react-native-gesture-handler";
import React, { useEffect, useState, Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import Home from "./src/components/Home";
import RegisterForm from "./src/components/RegisterForm";
import LoginForm from "./src/components/LoginForm";
import Shop from "./src/components/Shop";
import store from "./src/store";
import { loadUser } from "./src/actions/auth";
import { Provider } from "react-redux";
import ProductDetail from "./src/components/ProductDetail";

const Drawer = createDrawerNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    store.dispatch(loadUser());

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Provider store={store}>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View style={styles.container}>
          <NavigationContainer>
            <Drawer.Navigator initialRouteName="home">
              <Drawer.Screen
                name="home"
                component={Home}
                options={{
                  title: "Welcome !",
                }}
              />
              <Drawer.Screen name="Shop" component={Shop} />
              <Drawer.Screen name="Register" component={RegisterForm} />
              <Drawer.Screen name="Login" component={LoginForm} />
              <Drawer.Screen name="productDetail" component={ProductDetail} />
            </Drawer.Navigator>
          </NavigationContainer>
        </View>
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
