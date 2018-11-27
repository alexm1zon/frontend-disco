import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import RootNavigator from './routes';
export default class App extends React.Component {
  async initializeApp () {
    const chequingTransactionArray = [
      {
        date: '19/11/2018',
        transaction: ' Withdrawal',
        debit: true,
        amount: '40'
      },
      {
        date: '19/11/2018',
        transaction: '  Iron ring',
        debit: true,
        amount: '20'
      },
      {
        date: '02/10/2018',
        transaction: 'Three Brewers',
        debit: true,
        amount: '41.12'
      },
      {
        date: '30/09/2018',
        transaction: 'Coorporate Pay',
        debit: false,
        amount: '1000.44'
      },
      {
        date: '22/09/2018',
        transaction: 'Site Tim Horton',
        debit: true,
        amount: '5.31'
      },
      {
        date: '19/09/2018',
        transaction: ' Second Cup',
        debit: true,
        amount: '2.44'
      }
    ];

    const savingsTransactionArray = [
      {
        date: '22/11/2018',
        transaction: 'Deposit',
        debit: true,
        amount: '400'
      },
      {
        date: '15/11/2018',
        transaction: 'Deposit',
        debit: true,
        amount: '1310'
      },
      {
        date: '30/10/2018',
        transaction: 'Deposit',
        debit: true,
        amount: '500'
      },
      {
        date: '30/09/2018',
        transaction: 'Deposit',
        debit: true,
        amount: '10000.79'
      },
    ];

    const recipientArray = [
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
          value: '9999',
      }
    ];

    const payeeArray = [
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
    ];

    try {
      await AsyncStorage.setItem('payeeArray', JSON.stringify(payeeArray));
      await AsyncStorage.setItem('recipientArray', JSON.stringify(recipientArray));
      await AsyncStorage.setItem('chequingTransaction',JSON.stringify(chequingTransactionArray));
      await AsyncStorage.setItem('savingsTransaction',JSON.stringify(savingsTransactionArray));
      await AsyncStorage.setItem('visaBalance', '3583.13');
      await AsyncStorage.setItem('savingBalance', '12210.79');
      await AsyncStorage.setItem('chequingBalance', '1583.13');
      await AsyncStorage.setItem('masterCardBalance', '341.87');
      await AsyncStorage.setItem('bayBalance', '0');
      console.log('Successfully initialized mock data');
    } catch (error) {
      console.log('Could not initialize mock data', error);
    }
  }

  render() {
    this.initializeApp();
    return (
      <RootNavigator/>
    );
  }
}
