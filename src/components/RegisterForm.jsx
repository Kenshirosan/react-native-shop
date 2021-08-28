import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getData, storeData } from "../utils/asyncStorage";
import { register } from "../actions/auth";
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

const RegisterForm = ({ navigation, register }) => {
  const initialState = {
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [token, setToken] = useState(
    "Le token s'affichera ici en cas de success"
  );

  function goLogin() {
    navigation.navigate("Login");
  }

  function handleRegister(e) {
    e.preventDefault();

    formData.url = "/api/users/register";

    register(formData);
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
            <Button title="Submit" onPress={(e) => handleRegister(e)} />
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

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
};

export default connect(null, { register })(RegisterForm);
