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

export default class AddRecipient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      answer:'',
      securityAnswer:'',
      isFirstNameSet: false,
      isLastNameSet: false,
      isEmailSet: false,
      isSecuritySet:false,
      isAnswerSet:false,
      isConfirmAnswerSet:false,
    }
  }

  async addRecipient() {
    let recipientArray;
    recipientArray = await AsyncStorage.getItem('recipientArray');

    if (!recipientArray) {
      throw Error('Cannot add recipient');
    }

    recipientArray = JSON.parse(recipientArray);

    recipientArray.push({
      label: `${this.state.firstName} ${this.state.lastName}`,
      value: `${recipientArray.length+1}`
    });
    recipientArray.sort(function(a, b) {
        return a.value > b.value;
    });
    console.log('Recipient Array is ', recipientArray);
    await AsyncStorage.setItem('recipientArray', JSON.stringify(recipientArray));
  }

  successAlert() {
    Alert.alert('Success!', 'Recipient Added', [{ text: 'Okay', onPress: null }]);
  }

  errorAlert(error) {
    Alert.alert(`${error}`, '', [{ text: 'Okay', onPress: null }]);
  }

  inputValidation() {
    if (!this.state.isFirstNameSet){
      throw Error('Please enter First Name');
    }
    if (!this.state.isLastNameSet){
      throw Error('Please enter Last Name');
    }
    if (!this.state.isEmailSet){
      throw Error('Please enter an email');
    }
    if (!this.state.isSecuritySet){
      throw Error('Please enter a security question');
    }
    if (!this.state.isAnswerSet){
      throw Error('Please enter security question answer');
    }
    if (!this.state.isConfirmAnswerSet){
      throw Error('Please confirm the security answer');
    }

    if (this.state.answer !== this.state.securityAnswer){
      throw Error('Security answers do not match');
    }
  }


  handleAddRecipient(){
    try {
      this.inputValidation();
      this.addRecipient();
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
          <Text style={styles.subtitle}>First Name: </Text>
          <TextInput style={pickerSelectStyles.inputIOS} onChangeText={(text) => this.setState({firstName: text, isFirstNameSet: true})}/>
        </View>
        <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
          <Text style={styles.subtitle}>Last Name: </Text>
          <TextInput style={pickerSelectStyles.inputIOS} onChangeText={(text) => this.setState({lastName: text, isLastNameSet: true })}/>
        </View>
        <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
          <Text style={styles.subtitle}>Email: </Text>
          <TextInput style={pickerSelectStyles.inputIOS} onChangeText={(text) => this.setState({isEmailSet: true, isEmailSet: true})}/>
        </View>
        <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
          <Text style={styles.subtitle}>Security Question: </Text>
          <TextInput style={pickerSelectStyles.inputIOS} onChangeText={(text) => this.setState({isSecuritySet: true})} />
        </View>
        <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
          <Text style={styles.subtitle}>Answer: </Text>
          <TextInput style={pickerSelectStyles.inputIOS} onChangeText={(text) => this.setState({answer: text, isAnswerSet: true})}/>
        </View>
        <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
          <Text style={styles.subtitle}>Confirm Answer: </Text>
          <TextInput style={pickerSelectStyles.inputIOS} onChangeText={(text) => this.setState({securityAnswer:text, isConfirmAnswerSet: true})}/>
        </View>

        <View style={styles.container}>
          <View style={{ paddingVertical: 10, marginRight: 32, marginLeft: 32 }}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => this.handleAddRecipient()}
              underlayColor='#fff'>
                <Text style={styles.buttonText}>Add Recipient</Text>
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
