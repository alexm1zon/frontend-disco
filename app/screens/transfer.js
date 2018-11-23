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
      isPayeeSelected: false,
      isVisa: false,
      isMasterCard: false,
      isBayCard: false,
      chequingBalance: null,
      savingBalance: null,
      visaBalance: null,
      masterCardBalance: null,
      bayBalance: null,
      accountType: undefined,
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
              value: 'visa',
          },
          {
              label: 'MasterCard Cashback',
              value: 'mastercard',
          },
          {
              label: 'Bay Credit Card',
              value: 'baycard',
          },
          {
              label: 'Add Payee',
              value: 'newPayee',
          }
      ]
    };
}

async componentWillMount() {
  const visaBalance = await AsyncStorage.getItem('visaBalance');
  const chequingBalance = await AsyncStorage.getItem('chequingBalance');
  const savingBalance = await AsyncStorage.getItem('savingBalance');
  const masterCardBalance = await AsyncStorage.getItem('masterCardBalance');
  const bayBalance = await AsyncStorage.getItem('bayBalance');

  if (chequingBalance) {
    this.setState({
      chequingBalance: chequingBalance,
    });
  } else if (savingBalance) {
    this.setState({
      savingBalance: savingBalance,
    });
  } else if (visaBalance) {
    this.setState({
      visaBalance: visaBalance,
    });
  } else if (masterCardBalance) {
    this.setState({
      masterCardBalance: masterCardBalance,
    });
  } else if (bayBalance) {
    this.setState({
      bayBalance: bayBalance,
    });
  } else {}
}

render() {
  const isAccountSelected = this.state.isAccountSelected;
  const isPayeeSelected = this.state.isPayeeSelected;
  const isChequing = this.state.isChequing;
  const isVisa = this.state.isVisa;
  const isMasterCard = this.state.isMasterCard;

  let balance, payeeBalance;

  if(isPayeeSelected) {
    if(isVisa) {
      payeeBalance = <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 18 }}>
                     <Text>Balance: {this.state.visaBalance} $</Text> </View>
    } else if (isMasterCard){
      payeeBalance = <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 18 }}>
                     <Text>Balance: {this.state.masterCardBalance} $</Text> </View>
    } else {
      payeeBalance = <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 18 }}>
                     <Text>Balance: {this.state.bayBalance} $</Text> </View>
    }
  }
  if(isAccountSelected) {
    if(isChequing) {
      balance =  <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 18 }}>
                 <Text>Balance: {this.state.chequingBalance} $</Text> </View>
    } else {
      balance = <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 18 }}>
                <Text>Balance: {this.state.savingBalance} $</Text> </View>
    }
  }
    return (
          <View style={styles.container}>
            <View style={{ paddingVertical: 5 }} />
            <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
            <Text>Payee:</Text>
              <RNPickerSelect
                  placeholder={{
                      label: 'Select Payee',
                      value: null,
                  }}
                  items={this.state.payeeItems}
                  onValueChange={(value) => {
                      if (value === 'visa') {
                        this.setState({
                            isPayeeSelected: true,
                            isVisa: true,
                            isMasterCard: false,
                            isBayCard: false
                        });
                      } else if (value === 'mastercard'){
                        this.setState({
                          isPayeeSelected: true,
                          isVisa: false,
                          isMasterCard: true,
                          isBayCard: false
                        });
                      } else if (value === 'baycard'){
                        this.setState({
                          isPayeeSelected: true,
                          isVisa: false,
                          isMasterCard: false,
                          isBayCard: true
                        });
                      } else {
                        this.setState({
                          isAccountSelected: false,
                          isChequing: false,
                          isSavings: false,
                          isBayCard: false
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
            {payeeBalance}
            <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
              <View style={{ paddingVertical: 5 }} />
              <Text>Amount: </Text>
              <TextInput
                  ref={(el) => {
                      this.inputRefs.name = el;
                  }}
                  returnKeyType="next"
                  enablesReturnKeyAutomatically
                  onSubmitEditing={() => {
                      this.inputRefs.picker.togglePicker();
                  }}
                  style={pickerSelectStyles.inputIOS}
                  blurOnSubmit={false}
              />
            </View>
            <View style={{ paddingVertical: 5 }} />

            <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
            <Text>From Account:</Text>
              <RNPickerSelect
                  placeholder={{
                      label: 'Select from account',
                      value: null,
                  }}
                  items={this.state.accountItems}
                  onValueChange={(value) => {
                      if (value === 'chequing') {
                        this.setState({
                            isAccountSelected: true,
                            isChequing: true,
                            isSavings: false
                        });
                      } else if (value === 'savings'){
                        this.setState({
                          isAccountSelected: true,
                          isChequing: false,
                          isSavings: true
                        });
                      } else {
                        this.setState({
                          isAccountSelected: false,
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
                  value={this.state.accountType}
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
                    onPress={() => Alert.alert('Success!', 'Transfer completed', [{ text: 'Okay', onPress: null }])}
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
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
    color: 'black',
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
