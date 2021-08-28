import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { formatPrice } from "../../utils/helpers";

const Item = ({ product }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.title}</Text>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>{formatPrice(product.priceHT)}&euro;</Text>
    </View>
  );
};

const screen = Dimensions.get("window");
const width = screen.width / 2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccc",
    padding: 5,
    borderRadius: 15,
    marginTop: 5,
    alignItems: "center",
    width: "100%",
  },
  title: {
    color: "#fff",
    marginBottom: 5,
    fontSize: 36,
  },
  description: {
    color: "blue",
    fontSize: 16,
    marginBottom: 5,
  },
  price: {
    marginTop: 5,
    fontSize: 36,
    color: "green",
  },
  image: {
    flex: 1,
    width: width,
    height: 200,
    resizeMode: "contain",
  },
});

export default Item;
