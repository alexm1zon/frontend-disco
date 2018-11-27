import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput
} from 'react-native';

export default class AddPayee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payeeName: '',
      isFirstNameSet: false,
      isLastNameSet: false,
      isEmailSet: false,
      isSecuritySet:false,
      isAnswerSet:false,
      isConfirmAnswerSet:false,
    }
  }

  async addPayee() {
    let payeeArray;
    payeeArray = await AsyncStorage.getItem('payeeArray');

    if (!payeeArray) {
      throw Error('Cannot add payee');
    }

    payeeArray = JSON.parse(payeeArray);

    payeeArray.push({
      label: `${this.state.payeeName}`,
      value: `${payeeArray.length+1}`
    });
    payeeArray.sort((a, b) => {
        return a.value > b.value;
    });
    await AsyncStorage.setItem('payeeArray', JSON.stringify(payeeArray));
  }

  successAlert() {
    Alert.alert('Success!', 'Payee Added', [{ text: 'Okay', onPress: null }]);
  }

  errorAlert(error) {
    Alert.alert(`${error}`, '', [{ text: 'Okay', onPress: null }]);
  }

  inputValidation() {
    if (!this.state.isPayeeSet){
      throw Error('Please enter payee name');
    }
    if (!this.state.isAccountSet){
      throw Error('Please enter payee account number');
    }
  }


  handleAddPayee(){
    try {
      this.inputValidation();
      this.addPayee();
      this.successAlert();
    } catch (error){
      this.errorAlert(error);
      console.log(error);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
          <Text style={styles.subtitle}>Payee Name: </Text>
          <TextInput style={pickerSelectStyles.inputIOS} onChangeText={(text) => this.setState({payeeName: text, isPayeeSet: true})}/>
        </View>
        <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
          <Text style={styles.subtitle}>Payee Account: </Text>
          <TextInput style={pickerSelectStyles.inputIOS} onChangeText={(text) => this.setState({isAccountSet: true})}/>
        </View>
        <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
          <Text style={styles.subtitle}>Description (optional): </Text>
          <TextInput style={pickerSelectStyles.inputIOS}/>
        </View>

        <View style={styles.container}>
          <View style={{ paddingVertical: 10, marginRight: 32, marginLeft: 32 }}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.handleAddPayee()}
              underlayColor='#fff'>
                <Text style={styles.buttonText}>Add Payee</Text>
            </TouchableHighlight>
          </View>
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
    backgroundColor: 'white'
  },
  subtitle: {
    fontSize: 18,
    marginBottom:5
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    }
});
