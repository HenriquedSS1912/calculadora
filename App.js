import React, { useState, Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Button from "./src/components/Button";
import Display from "./src/components/Display";

const initialState = {
  displayValue: "0",
  limparDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class App extends Component {
  state = { ...initialState };

  adicionarDigito = (n) => {
    const limparDisplay =
      this.state.displayValue === "0" || this.state.limparDisplay;

    if (n === "." && !limparDisplay && !this.state.displayValue.includes(".")) {
      return;
    }
    const currentValue = limparDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, limparDisplay: false });

    if (n !== ".") {
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[this.state.current] = newValue;
      this.setState({ values });
    }
  };

  limparMemoria = () => {
    this.setState({ ...initialState });
  };

  setOperacao = (operation) => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, limparDisplay: true });
    } else {
      const equals = operation === "=";
      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }
      values[1] = 0;
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        limparDisplay: !equals,
        values,
      });
    }
  };

  render() {
    return (
      <>
        <StatusBar
          style="dark"
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={styles.container}>
          <Display value={this.state.displayValue} />
          <View style={styles.containerButtons}>
            <Button label="AC" triple onClick={this.limparMemoria} />
            <Button label="/" operation onClick={this.setOperacao} />
            <Button label="7" onClick={this.adicionarDigito} />
            <Button label="8" onClick={this.adicionarDigito} />
            <Button label="9" onClick={this.adicionarDigito} />
            <Button label="*" operation onClick={this.setOperacao} />
            <Button label="4" onClick={this.adicionarDigito} />
            <Button label="5" onClick={this.adicionarDigito} />
            <Button label="6" onClick={this.adicionarDigito} />
            <Button label="-" operation onClick={this.setOperacao} />
            <Button label="1" onClick={this.adicionarDigito} />
            <Button label="2" onClick={this.adicionarDigito} />
            <Button label="3" onClick={this.adicionarDigito} />
            <Button label="+" operation onClick={this.setOperacao} />
            <Button label="0" double onClick={this.adicionarDigito} />
            <Button label="." onClick={this.adicionarDigito} />
            <Button label="=" operation onClick={this.setOperacao} />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
