import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import PropTypes from "prop-types";

import { getProducts } from "../actions/products";
import Item from "./subcomponents/Item";

const Shop = ({ navigation, products: { products }, getProducts }) => {
  useEffect(() => {
    getProducts();
  }, []);

  function productDetails(id) {
    navigation.navigate("productDetail", { id: id });
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => productDetails(item.id)}>
      <Item product={item} />
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      {products && (
        <FlatList
          data={products}
          contentContainerStyle={{ alignSelf: "flex-start" }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.title + index}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

Shop.propTypes = {
  products: PropTypes.object.isRequired,
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { getProducts })(Shop);
