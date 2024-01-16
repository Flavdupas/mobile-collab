import { Text, StyleSheet, ScrollView } from "react-native";
import React, { Component } from "react";
import connectedStyle from "../../../../src/constants/ConnectedStyle";

export default class service extends Component {
  render() {
    return (
      <ScrollView style={connectedStyle.body}>
        <Text style={[connectedStyle.title,]}>Services</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
