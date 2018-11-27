 import React, { Component } from 'react';
import { Alert, AsyncStorage, Text, TextInput, TouchableHighlight, StyleSheet, View, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default class SendMoney extends Component {

constructor(props) {
    super(props);
    this.inputRefs = {};

    this.state = {
      isAccountSelected: false,
      isChequing: false,
      isSavings: false,
      chequingBalance: null,
      savingBalance: null,
      accountType: undefined,
      transferAmount: 0,
      isRecipientSet: false,
      isAccountSet: false,
      isAmountSet: false,
      accountItems: [
          {
              label: 'Chequing - 64136167171',
              value: 'chequing',
          },
          {
              label: 'Savings - 95181167171',
              value: 'savings',
          }
      ],
      recipientItems: [
        {
            label: 'Jason Smith',
            value: '1',
        },
        {
            label: 'Amanda Johnson',
            value: '2',
        },
        {
            label: 'Olivia Miller',
            value: '3',
        },
        {
            label: 'My CIBC account',
            value: '4',
        },
        {
            label: 'Add Recipient',
            value: '5',
        }
      ]
    };
}

async updateAccountBalance() {
  let balance, newAmount;
  const amount = this.state.transferAmount;
  if (this.state.isChequing){
      balance = this.state.chequingBalance;
      newAmount = Number(balance) - amount;
      await AsyncStorage.setItem( 'chequingBalance', String(newAmount));
      this.setState({chequingBalance: newAmount});
  } else if (this.state.isSavings) {
      balance = this.state.savingBalance;
      newAmount = Number(balance) - amount;
      await AsyncStorage.setItem('savingBalance', String(newAmount) );
      this.setState({savingBalance: newAmount});
  }
}

errorAlert(error) {
  Alert.alert(`${error}`, '', [{ text: 'Okay', onPress: null }]);
}

successAlert() {
  Alert.alert('Success!', 'Money Sent', [{ text: 'Okay', onPress: null }]);
}

inputValidation() {
  if (!this.state.isRecipientSet){
    throw Error('Please select recipient');
  }
  if (!this.state.isAccountSet){
    throw Error('Please select account');
  }
  if (!this.state.isAmountSet){
    throw Error('Please enter an amount');
  }
  if (this.state.isChequing) {
    if (this.state.transferAmount > this.state.chequingBalance) {
      throw Error('Not enough funds in the account');
    }
  } else {
    if (this.state.transferAmount > this.state.savingBalance) {
      throw Error('Not enough funds in the account');
    }
  }
}

async handleSubmit() {
  try {
    this.inputValidation();
    this.updateAccountBalance();
    this.successAlert();
  } catch (error) {
    this.errorAlert(error);
  }
}

async initialize() {
  const recipientArray = await AsyncStorage.getItem('recipientArray');
  if (recipientArray) {
    this.setState({
      recipientItems: JSON.parse(recipientArray),
    });
  }
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
  this.initialize();
  const isAccountSelected = this.state.isAccountSelected;
  const isChequing = this.state.isChequing;
  let balance;
  if(isAccountSelected) {
    if(isChequing) {
      balance = <Text>Balance: {this.state.chequingBalance} $</Text>
    } else {
      balance = <Text>Balance: {this.state.savingBalance} $</Text>
    }
  }
    return (
        <ScrollView style={{backgroundColor:'white'}}>
        <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
           <Text style={styles.subtitle}>Send To:</Text>
             <RNPickerSelect
                 placeholder={{
                     label: 'Select Recipient...',
                     value: null,
                 }}
                 items={this.state.recipientItems}
                 onValueChange={(value) => {
                   if (value === '9999') {
                     this.props.navigation.navigate("AddRecipient");
                   } else {
                     this.setState({isRecipientSet: true});
                   }
                 }}
                 onUpArrow={() => {
                     this.inputRefs.name.focus();
                 }}
                 onDownArrow={() => {
                     this.inputRefs.picker2.togglePicker();
                 }}
                 style={{ ...pickerSelectStyles }}
                 value={this.state.accountType}
                 ref={(el) => {
                     this.inputRefs.picker = el;
                 }}
             />
         </View>

         <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
            <Text style={styles.subtitle}>From Account:</Text>
              <RNPickerSelect
                  placeholder={{
                      label: 'Select an account...',
                      value: null,
                  }}
                  items={this.state.accountItems}
                  onValueChange={(value) => {
                      if (value === 'chequing') {
                        this.setState({
                            isAccountSelected: true,
                            isChequing: true,
                            isSavings: false,
                            isAccountSet: true
                        });
                      } else if (value === 'savings'){
                        this.setState({
                          isAccountSelected: true,
                          isChequing: false,
                          isSavings: true,
                          isAccountSet: true
                        });
                      } else {
                        this.setState({
                          isAccountSelected: false,
                          isChequing: false,
                          isSavings: false,
                          isAccountSet: true
                        });
                      }
                  }}
                  onUpArrow={() => {
                      this.inputRefs.name.focus();
                  }}
                  onDownArrow={() => {
                      this.inputRefs.picker2.togglePicker();
                  }}
                  style={{ ...pickerSelectStyles }}
                  value={this.state.accountType}
                  ref={(el) => {
                      this.inputRefs.picker = el;
                  }}
              />
          </View>

            <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
              {balance}
              <View style={{ paddingVertical: 5 }} />
              <Text style={styles.subtitle}>Amount: </Text>
              <TextInput
                style={pickerSelectStyles.inputIOS}
                onChangeText={(amount)=> this.setState({isAmountSet: true, transferAmount: amount})}
              />
            </View>

            <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
              <Text style={styles.subtitle}> Message (optional): </Text>
              <TextInput
                multiline = {true}
                numberOfLines = {4}
                style={pickerSelectStyles.inputIOS}
              />
            </View>

            <View style={{ paddingVertical: 5 }} />
            <View style={styles.container}>
              <View style={{ paddingVertical: 10, marginRight: 32, marginLeft: 32 }}>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.handleSubmit()}
                  underlayColor='#fff'>
                    <Text style={styles.buttonText}>Send Money</Text>
                </TouchableHighlight>
              </View>
            </View>

      </ScrollView>
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
    fontSize: 18,
    marginBottom:5
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
    },
});
