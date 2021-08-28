import React, { useEffect, useState, Fragment } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { storeData, getData } from "./src/utils/asyncStorage";
const { Navigator, Screen } = createStackNavigator();

import Home from "./src/components/Home";
import RegisterForm from "./src/components/RegisterForm";
import LoginForm from "./src/components/LoginForm";
import Shop from "./src/components/Shop";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View style={styles.container}>
          <NavigationContainer>
            <Navigator>
              <Screen
                options={{
                  headerShown: false,
                }}
                name="home"
                component={Home}
              />
              <Screen
                options={{
                  headerShown: true,
                }}
                name="register"
                component={RegisterForm}
              />
              <Screen
                options={{
                  headerShown: true,
                }}
                name="login"
                component={LoginForm}
              />
              <Screen
                options={{
                  headerShown: true,
                }}
                name="shop"
                component={Shop}
              />
            </Navigator>
          </NavigationContainer>
        </View>
      )}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
