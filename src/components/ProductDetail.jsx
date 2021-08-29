import React, { Fragment, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProduct } from "../actions/products";

import { formatPrice } from "../utils/helpers";

const ProductDetail = ({
  route,
  navigation,
  products: { product },
  getProduct,
}) => {
  useEffect(() => {
    const { id } = route.params;
    getProduct(id);

    console.log(product.image);
  }, [route]);

  return (
    <Fragment>
      {product && (
        <View style={styles.container}>
          <Text style={styles.title}>{product.title}</Text>
          <Image source={{ uri: product.image }} style={styles.image} />
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>{formatPrice(product.priceHT)}&euro;</Text>
        </View>
      )}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}
        >
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dddeee",
    padding: 5,
    borderRadius: 15,
    marginTop: 5,
    alignItems: "center",
    width: "100%",
  },
  btnContainer: {
    padding: 15,
    borderRadius: 15,
    marginTop: 5,
    alignItems: "center",
    width: "100%",
  },
  btn: {
    width: "25%",
    backgroundColor: "lightblue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  title: {
    marginBottom: 5,
    fontSize: 36,
    textTransform: "uppercase",
    color: "rgba(150, 100, 250, 0.7)",
    padding: 5,
    borderBottomWidth: 10,
    borderColor: "white",
  },
  description: {
    color: "rgba(50, 100, 250, 0.7)",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    width: "75%",
    textAlign: "center",
  },
  price: {
    marginTop: 5,
    fontSize: 36,
    color: "rgba(50, 200, 150, 0.7)",
  },
  image: {
    width: 300,
    height: 200,
  },
});

ProductDetail.propTypes = {
  getProduct: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { getProduct })(ProductDetail);

// insert into products (category_id, image, title, metaDescription, description, priceHT, createdAt, updatedAt) VALUES (1, 'https://www.fillmurray.com/g/300/200', 'Iphone 1000', 'Un Bon Truc', "Un poisson frais exceptionnel, on a pris ca ce matin par surprise dans l'egout en bas pendant que les pompiers y faisaient des prelevements pour suivre l'epidemie", 2500, now(), now());
