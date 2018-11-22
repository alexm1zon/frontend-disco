import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class Login extends Component {

  onLoginClick = () => {
    this.props.navigation.navigate("AppScreens");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Temporary Welcome Page!
        </Text>
        <TouchableHighlight
          style={styles.button}
          onPress={this.onLoginClick}
          underlayColor='#fff'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>

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
  },
  button:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#2aa202',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    width: 150
  },
  buttonText:{
    color:'#fff',
    fontSize: 15,
    textAlign:'center',
  }
});
