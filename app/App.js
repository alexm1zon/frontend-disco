import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import RootNavigator from './routes';
export default class App extends React.Component {
  async initializeApp () {
    const chequingHistoryArray = [
      {
        date: '19/11/2018',
        transaction: ' Withdrawal',
        debit: true,
        amount: '40$'
      },
      {
        date: '19/11/2018',
        transaction: '  Iron ring',
        debit: true,
        amount: '20$'
      },
      {
        date: '02/10/2018',
        transaction: 'Three Brewers',
        debit: true,
        amount: '41.12$'
      },
      {
        date: '30/09/2018',
        transaction: 'Coorporate Pay',
        debit: false,
        amount: '1000.44$'
      },
      {
        date: '22/09/2018',
        transaction: 'Site Tim Horton',
        debit: true,
        amount: '5.31$'
      },
      {
        date: '19/09/2018',
        transaction: ' Second Cup',
        debit: true,
        amount: '2.44$'
      }
    ];

    try {
      await AsyncStorage.setItem('chequingHistory',JSON.stringify(chequingHistoryArray));
      console.log('Successfully initialized chequingHistory');

      await AsyncStorage.setItem('visaBalance', '3583.13');

      console.log('Successfully initialized visa data');
      await AsyncStorage.setItem('savingBalance', '9862.79');
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
