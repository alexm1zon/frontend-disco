import React, { Component } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Switch
} from "react-native";

export default class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
        rememberMe: true,
        cardNumber: "863175093186913",
        password: "123456"
      };
    }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../images/uottawa_Logo.png")}
          />
          <Text style={styles.subtitle}>CBA Mobile Application</Text>
        </View>

        <KeyboardAvoidingView style={styles.loginContainer} behavior="padding">
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            underlineColorAndroid="transparent"
            value={this.state.cardNumber}
            onChangeText={cardNumber => this.setState({ cardNumber })}
          />

          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Password"
            underlineColorAndroid="transparent"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <View style={styles.rememberMeContainer}>
            <Switch
              style={styles.rememberMeSwitch}
              title="Remember Me"
              value={this.state.rememberMe}
              onValueChange={() =>
                this.setState({ rememberMe: !this.state.rememberMe })
              }
            />
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={()=>this.props.navigation.navigate("AppScreens")}
            title="LOGIN"
          >
            <Text style={styles.loginButton}>LOGIN </Text>
            {this.props.attemptingLogin && (
              <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator size="small" color="gray" />
              </View>
            )}
          </TouchableOpacity>
          </KeyboardAvoidingView>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    marginLeft: 4
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  logo: {
    width: 250,
    height: 260,
    marginBottom: 20
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "500"
  },
  loginContainer: {
    padding: 20
  },
  input: {
    height: 50,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10
  },
  buttonContainer: {
    backgroundColor: "#2aa202",
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  loginButton: {
    textAlign: "center",
    fontWeight: "600",
    color: "white"
  },
  errorMessage: {
    textAlign: "center",
    color: "red"
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "2%"
  },
  rememberMeSwitch: {
    marginRight: "3%"
  },
  rememberMeText: {
    fontSize: 16
  }
});
