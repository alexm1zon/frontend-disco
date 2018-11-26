import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
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
          My CBA Mobile Application
        </Text>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Accounts")}
          underlayColor='#fff'>
            <Text style={styles.buttonText}>View My Accounts</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.props.navigation.navigate("PayBill")}
          underlayColor='#fff'>
            <Text style={styles.buttonText}>Pay Bill</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.props.navigation.navigate("SendMoney")}
          underlayColor='#fff'>
            <Text style={styles.buttonText}>Send Money</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Deposit")}
          underlayColor='#fff'>
            <Text style={styles.buttonText}>Deposit</Text>
        </TouchableHighlight>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  title: {
    marginTop: 40,
    fontSize: 25,
    textAlign: 'center'
  },
  button:{
    marginRight:40,
    marginLeft:40,
    marginTop:40,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#2aa202',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonText:{
    color:'#fff',
    fontSize: 15,
    textAlign:'center',
  }
});
