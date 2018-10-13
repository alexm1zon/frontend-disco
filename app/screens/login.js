import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

export default class Login extends Component {

  onLoginClick = () => {
    this.props.navigation.navigate("AppScreens");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome! /n
        </Text>

        <TouchableOpacity
            onPress={this.onLoginClick}
            title="LOGIN"
        >
          <Text> LOGIN </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
