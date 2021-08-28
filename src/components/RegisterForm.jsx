import React, { useEffect, useState } from "react";
import axios from "axios";
import { getData, storeData } from "../utils/asyncStorage";
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from "react-native";

const RegisterForm = ({ navigation }) => {
  const initialState = {
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [token, setToken] = useState(
    "Le token s'affichera ici en cas de success"
  );

  useEffect(() => {
    getData("token").then((res) => setToken(res));
  }, []);

  function goLogin() {
    navigation.navigate("login");
  }

  function register(e) {
    e.preventDefault();

    axios
      .post("https://api.evilweb.fr/api/users/register", formData)
      .then((res) => {
        const { token } = res.data;
        storeData("token", token).then(() => console.log("token synced"));
        setToken(token);
      })
      .catch((e) => console.log(e));
  }

  function handleForm(e, name) {
    setFormData({ ...formData, [name]: e });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Button title="Login instead" onPress={goLogin} />
          <Text style={styles.header}>Register</Text>
          <Text style={styles.text}>{token}</Text>
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            onChangeText={(e) => handleForm(e, "email")}
          />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            onChangeText={(e) => handleForm(e, "password")}
          />
          <TextInput
            placeholder="Confirm Password"
            style={styles.textInput}
            onChangeText={(e) => handleForm(e, "passwordConfirm")}
          />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={(e) => register(e)} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 12,
    textAlign: "center",
  },
  text: {
    fontSize: 12,
    marginBottom: 6,
    textAlign: "center",
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 6,
    borderRadius: 5,
  },
  btnContainer: {
    backgroundColor: "white",
  },
});

export default RegisterForm;
