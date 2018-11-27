import React, { Component } from 'react';
import { Alert, AsyncStorage, Text, TextInput, TouchableHighlight, StyleSheet, View, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default class SendMoney extends Component {

constructor(props) {
    super(props);

    this.inputRefs = {};

    this.state = {
      isChequing: false,
      isSavings: false,
      isPayeeSet: false,
      isAmountSet: false,
      isAccountSet: false,
      chequingBalance: null,
      accountType: undefined,
      transferAmount: 0,
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
      payeeItems: [
          {
              label: 'Aeroplan Travel Visa',
              value: '1',
          },
          {
              label: 'MasterCard Cashback',
              value: '2',
          },
          {
              label: 'Bay Credit Card',
              value: '3',
          },
          {
              label: 'Add Payee',
              value: '9999',
          }
      ]
    };
}

async initialize() {
  const payeeArray = await AsyncStorage.getItem('payeeArray');
  if (payeeArray) {
    this.setState({
      payeeItems: JSON.parse(payeeArray),
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

errorAlert(error) {
  Alert.alert(`${error}`, '', [{ text: 'Okay', onPress: null }]);
}

successAlert() {
  Alert.alert('Success!', 'Bill paid', [{ text: 'Okay', onPress: null }]);
}

inputValidation() {
  if (!this.state.isPayeeSet){
    throw Error('Please select payee');
  }
  if (!this.state.isAmountSet){
    throw Error('Please enter an amount');
  }

  if (isNaN(this.state.transferAmount)){
    throw Error('Please enter a valid amount');
  }
  if (!this.state.isAccountSet){
    throw Error('Please select account');
  }

  if (this.state.transferAmount > this.state.chequingBalance) {
    throw Error('Not enough funds in the account');
  }
  if (this.state.transferAmount > this.state.savingBalance) {
    throw Error('Not enough funds in the account');
  }
}

async updateAccountBalance() {
  let balance, newAmount;
  const amount = this.state.transferAmount;
  if (this.state.isChequing){
      balance = this.state.chequingBalance;
      newAmount = Number(balance) - amount;
      newAmount = Math.round(newAmount * 100) / 100
      await AsyncStorage.setItem( 'chequingBalance', String(newAmount));
      this.setState({chequingBalance: newAmount});
  } else if (this.state.isSavings) {
      balance = this.state.savingBalance;
      newAmount = Number(balance) - amount;
      newAmount = Math.round(newAmount * 100) / 100
      await AsyncStorage.setItem('savingBalance', String(newAmount) );
      this.setState({savingBalance: newAmount});
  }
}

async recordTransaction() {
    let transactionArray;

    if(this.state.isChequing){
      transactionArray = await AsyncStorage.getItem('chequingTransaction');
    } else {
      transactionArray = await AsyncStorage.getItem('savingsTransaction');
    }

    if (!transactionArray) {
      throw Error('Cannot record transation');
    }

    transactionArray = JSON.parse(transactionArray);

    transactionArray.unshift({
      date: '30/11/2018',
      transaction: 'E-transfer',
      debit: false,
      amount: this.state.transferAmount
    });

    console.log('Transaction Array is ', transactionArray);
    if(this.state.isChequing){
      await AsyncStorage.setItem('chequingTransaction', JSON.stringify(transactionArray));
    } else {
      await AsyncStorage.setItem('savingsTransaction', JSON.stringify(transactionArray));
    }
}

async handleSubmit() {
  try {
    this.inputValidation();
    this.updateAccountBalance();
    this.recordTransaction();
    this.successAlert();
  } catch (error) {
    this.errorAlert(error);
  }
}

render() {
  this.initialize();
  let balance;
  if(this.state.isChequing) {
    balance =  <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 18 }}>
               <Text>Balance: {this.state.chequingBalance} $</Text> </View>
  } else if (this.state.isSavings){
    balance = <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 18 }}>
              <Text>Balance: {this.state.savingBalance} $</Text> </View>
  }

    return (
          <View style={styles.container}>
            <View style={{ paddingVertical: 5 }} />
            <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
            <Text style={styles.subtitle}>Payee:</Text>
              <RNPickerSelect
                  placeholder={{
                      label: 'Select Payee',
                      value: null,
                  }}
                  items={this.state.payeeItems}
                  onValueChange={(value) => {
                    if (value === '9999') {
                      this.props.navigation.navigate("AddPayee");
                    } else {
                      this.setState({
                        isPayeeSet: true
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
                  ref={(el) => {
                      this.inputRefs.picker = el;
                  }}
              />
            </View>
            <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
              <View style={{ paddingVertical: 5 }} />
              <Text style={styles.subtitle}>Amount: </Text>
              <TextInput
                style={pickerSelectStyles.inputIOS}
                onChangeText={(amount)=> this.setState({isAmountSet: true, transferAmount: amount})}
              />
              />
            </View>
            <View style={{ paddingVertical: 5 }} />

            <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
            <Text style={styles.subtitle}>From Account:</Text>
              <RNPickerSelect
                  placeholder={{
                      label: 'Select from account',
                      value: null,
                  }}
                  items={this.state.accountItems}
                  onValueChange={(value) => {
                      if (value === 'chequing') {
                        this.setState({
                            isAccountSet: true,
                            isChequing: true,
                            isSavings: false
                        });
                      } else if (value === 'savings'){
                        this.setState({
                          isAccountSet: true,
                          isChequing: false,
                          isSavings: true
                        });
                      } else {
                        this.setState({
                          isAccountSet: false,
                          isChequing: false,
                          isSavings: false
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
                  ref={(el) => {
                      this.inputRefs.picker = el;
                  }}
              />
              </View>
              {balance}
              <View style={styles.container}>
                <View style={{ paddingVertical: 10, marginRight: 32, marginLeft: 32 }}>
                  <TouchableHighlight
                    style={styles.button}
                    onPress={() => this.handleSubmit()}
                    underlayColor='#fff'>
                      <Text style={styles.buttonText}>Pay Bill</Text>
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
