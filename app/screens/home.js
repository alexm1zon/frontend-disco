import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Home extends Component {
  viewAccounts () {
    console.log('My Accounts');
  }
  viewTransfers () {
    console.log('My Transfers');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome
        </Text>
        <Button style={styles.button}
          onPress={this.viewAccounts.bind(this)}
          title="Accounts"
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "rgba(92, 99,216, 1)",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          containerStyle={{ marginTop: 20 }}
        />
        <Button style={styles.button}
          onPress={this.viewTransfers.bind(this)}
          title="Transfers"
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "rgba(92, 99,216, 1)",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          containerStyle={{ marginTop: 20 }}
        />
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
    fontSize: 40,
    textAlign: 'center'
  },
  button: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,

  }
});
