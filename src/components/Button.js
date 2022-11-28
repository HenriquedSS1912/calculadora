import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const styles = StyleSheet.create({
  button: {
    fontSize: 40,
    height: Dimensions.get("window").width / 4,
    width: Dimensions.get("window").width / 4,
    padding: 20,
    backgroundColor: "#f0f0f0",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#888",
  },
  operationButton: {
    color: "#fff",
    backgroundColor: "#fa8231",
  },
  buttonDouble: {
    width: (Dimensions.get("window").width / 4) * 2,
  },
  buttonTriple: {
    width: (Dimensions.get("window").width / 4) * 3,
  },
});

export default (props) => {
  const stylesButton = [styles.button];
  {
    props.double && stylesButton.push(styles.buttonDouble);
  }
  {
    props.triple && stylesButton.push(styles.buttonTriple);
  }
  {
    props.operation && stylesButton.push(styles.operationButton);
  }

  return (
    <TouchableOpacity onPress={() => props.onClick(props.label)}>
      <Text style={stylesButton}>{props.label}</Text>
    </TouchableOpacity>
  );
};
