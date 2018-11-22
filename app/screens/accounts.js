import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
       chequingAccountNumber: "64136167171",
       chequingBalance: '1581.13',
       savingAccountNumber: "95181167171",
       savingBalance: '9861.79',
    };
  }

  async componentWillMount() {
    const chequingBalance = await AsyncStorage.getItem('chequingBalance');
    const savingBalance = await AsyncStorage.getItem('savingBalance');
    if (chequingBalance) {
      this.setState({
        chequingBalance: chequingBalance,
      });
    }
    if (savingBalance) {
      this.setState({
        savingBalance: savingBalance,
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 50, backgroundColor: '#2aa202'}}>
          <Text style={styles.title}>
            Chequing
          </Text>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <Text style={styles.subtitle}>
            Account Number: {this.state.chequingAccountNumber}
          </Text>
          <Text style={styles.subtitle}>
            Balance: {this.state.chequingBalance}$
          </Text>
        </View>
        <View style={{height: 50, backgroundColor: '#2aa202'}}>
          <Text style={styles.title}>
            Savings
          </Text>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <Text style={styles.subtitle}>
            Account Number: {this.state.savingAccountNumber}
          </Text>
          <Text style={styles.subtitle}>
            Balance: {this.state.savingBalance}$
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
    color: 'black',
  },
});
