 import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Vibration,
  TouchableOpacity,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { Camera, Permissions } from 'expo';
import RNPickerSelect from 'react-native-picker-select';

export default class Deposit extends Component {
  constructor(props) {
    super(props);
    this.inputRefs = {};
    this.state = {
      isAccountSet: false,
      isAmountSet: false,
      isChequing: false,
      isSavings: false,
      displayCamera: false,
      isPictureSet: false,
      depositAmount: 0,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      accountItems: [
          {
              label: 'Chequing - 64136167171',
              value: '1',
          },
          {
              label: 'Savings - 95181167171',
              value: '2',
          }
      ],
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture () {
    Vibration.vibrate();
    Alert.alert('Captured!', '', [{ text: 'Okay', onPress: () => {this.setState({ displayCamera:false, isPictureSet:true })} }]);
  }

  errorAlert(error) {
    Alert.alert(`${error}`, '', [{ text: 'Okay', onPress: null }]);
  }

  successAlert() {
    Alert.alert('Success!', 'Cheque Deposited', [{ text: 'Okay', onPress: null }]);
  }

  inputValidation() {
    if (!this.state.isAccountSet){
      throw Error('Please select account');
    }
    if (!this.state.isPictureSet){
      throw Error('Please take a picture of your cheque');
    }
    if (!this.state.isAmountSet){
      throw Error('Please enter an amount');
    }
    if (isNaN(this.state.depositAmount)){
      throw Error('Please enter a valid amount');
    }
  }

  async updateAccountBalance() {
    let balance, newAmount;
    const amount = this.state.depositAmount;
    if (this.state.isChequing){
        balance = await AsyncStorage.getItem('chequingBalance');
        newAmount = Number(balance) + Number(amount);
        newAmount = Math.round(newAmount * 100) / 100
        await AsyncStorage.setItem( 'chequingBalance', String(newAmount));
    } else if (this.state.isSavings) {
        balance = await AsyncStorage.getItem('savingBalance');
        newAmount = Number(balance) + Number(amount);
        newAmount = Math.round(newAmount * 100) / 100
        await AsyncStorage.setItem('savingBalance', String(newAmount) );
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
        transaction: 'Deposit',
        debit: true,
        amount: `${this.state.depositAmount}`
      });

      console.log('Transaction Array is ', transactionArray);
      if(this.state.isChequing){
        await AsyncStorage.setItem('chequingTransaction', JSON.stringify(transactionArray));
      } else {
        await AsyncStorage.setItem('savingsTransaction', JSON.stringify(transactionArray));
      }
  }

  async handleDeposit() {
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
    if (this.state.displayCamera && this.state.hasCameraPermission)  {
        return (
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.type}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
              </View>
            </Camera>
            <View style={styles.container}>
              <View style={{ paddingVertical: 10, marginRight: 32, marginLeft: 32 }}>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.takePicture()}
                  underlayColor='#fff'>
                    <Text style={styles.buttonText}>Capture</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        );
    } else {
      let pictureMock;
      if (this.state.isPictureSet) {
        pictureMock = <Text style={{marginTop:15, marginLeft:10, marginBottom:10}}> Attached: 8813631.jpeg </Text>
      }
      return (
        <View style={{ flex: 1 , backgroundColor:'white'}}>
          <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
            <Text style={styles.subtitle}>Deposit into account:</Text>
              <RNPickerSelect
                  placeholder={{
                      label: 'Select Account',
                      value: null,
                  }}
                  items={this.state.accountItems}
                  onValueChange={(value) => {
                      if (value === '1') {
                        this.setState({
                            isChequing: true,
                            isSavings: false,
                            isAccountSet: true
                        });
                      } else if (value === '2'){
                        this.setState({
                          isChequing: false,
                          isSavings: true,
                          isAccountSet: true
                        });
                      } else {
                        this.setState({
                          isChequing: false,
                          isSavings: false,
                          isAccountSet: false
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
            <View style={styles.container}>
              <View style={{ paddingVertical: 10}}>
                <TouchableHighlight
                  style={styles.button1}
                  onPress={() => {this.setState({isAccountSet: false, displayCamera:true})}}
                  underlayColor='#fff'>
                    <Text style={styles.buttonText}>Take picture of cheque</Text>
                </TouchableHighlight>
              </View>
            </View>

          {pictureMock}
          <View style={{ paddingVertical: 10, marginRight: 16, marginLeft: 16 }}>
            <Text style={styles.subtitle}>Enter amount: </Text>
            <TextInput
                style={pickerSelectStyles.inputIOS}
                onChangeText={(amount)=> this.setState({depositAmount: amount, isAmountSet: true})}
            />
              <View style={{ alignItems:'center',paddingVertical: 10 }}>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.handleDeposit()}
                  underlayColor='#fff'>
                    <Text style={styles.buttonText}>Deposit cheque</Text>
                </TouchableHighlight>
              </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    flexDirection: 'column',
    alignItems: 'center',
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
    width: 200
  },
  button1:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#2aa202',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',
    width: 200,
    height:60
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
