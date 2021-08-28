import React, { Fragment, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProduct } from "../actions/products";
import Item from "./subcomponents/Item";
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
    </Fragment>
  );
};

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
    width: "75%",
    textAlign: "center",
  },
  price: {
    marginTop: 5,
    fontSize: 36,
    color: "green",
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
