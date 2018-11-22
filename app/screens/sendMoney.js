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
      items: [
          {
              label: 'Chequing - 64136167171',
              value: 'chequing',
          },
          {
              label: 'Savings - 95181167171',
              value: 'savings',
          }
      ]
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
          <View style={styles.container}>
            <View style={{height: 50, backgroundColor: '#2aa202'}}>
              <Text style={styles.title}>
                Select Account
              </Text>
            </View>
            <View style={{backgroundColor: 'white'}}>
           </View>

            <View style={{ paddingVertical: 5 }} />
            <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
            <Text>Account:</Text>
              <RNPickerSelect
                  placeholder={{
                      label: 'Select an account...',
                      value: null,
                  }}
                  items={this.state.items}
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

            <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
              {balance}
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

            <View style={{height: 50, backgroundColor: '#2aa202'}}>
              <Text style={styles.title}>
                Enter Recipient Information
              </Text>
            </View>

            <ScrollView>
              <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
                <Text>Email: </Text>
                <TextInput style={pickerSelectStyles.inputIOS} />
              </View>
              <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
                <Text>Security Question: </Text>
                <TextInput style={pickerSelectStyles.inputIOS} />
              </View>
              <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
                <Text>Answer: </Text>
                <TextInput style={pickerSelectStyles.inputIOS} />
              </View>
              <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
                <Text>Confirm Answer: </Text>
                <TextInput style={pickerSelectStyles.inputIOS} />
              </View>
              <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
                <Text> Message: </Text>
                <TextInput
                  multiline = {true}
                  numberOfLines = {4}
                  style={pickerSelectStyles.inputIOS}
                />
              </View>
              <View style={styles.container}>
                <View style={{ paddingVertical: 10, marginRight: 32, marginLeft: 32 }}>
                  <TouchableHighlight
                    style={styles.button}
                    onPress={() => Alert.alert('Success!', 'Money Sent', [{ text: 'Okay', onPress: null }])}
                    underlayColor='#fff'>
                      <Text style={styles.buttonText}>Send Money</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </ScrollView>
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
