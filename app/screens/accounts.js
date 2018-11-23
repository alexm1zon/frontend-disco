import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import Collapsible from 'react-native-collapsible';

export default class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
       chequingAccountNumber: "64136167171",
       chequingBalance: null,
       savingAccountNumber: "95181167171",
       savingBalance: null,
       collapsed: true,
       chequingHistory: [],
       //   {
       //     date: '19/11/2018',
       //     transaction: 'Withdrawal',
       //     debit: true,
       //     amount: '40$'
       //   },
       //   {
       //     date: '19/11/2018',
       //     transaction: 'Iron ring',
       //     debit: true,
       //     amount: '20$'
       //   },
       //   {
       //     date: '02/10/2018',
       //     transaction: 'Three Brewers',
       //     debit: true,
       //     amount: '41.12$'
       //   },
       //   {
       //     date: '30/09/2018',
       //     transaction: 'Coorporate Pay',
       //     debit: false,
       //     amount: '1000.44$'
       //   },
       //   {
       //     date: '22/09/2018',
       //     transaction: 'Site Tim Horton',
       //     debit: true,
       //     amount: '5.31$'
       //   },
       //   {
       //     date: '19/09/2018',
       //     transaction: 'Second Cup',
       //     debit: true,
       //     amount: '2.44$'
       //   }
       // ],
    }
  }

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  async componentWillMount() {
    const chequingBalance = await AsyncStorage.getItem('chequingBalance');
    const savingBalance = await AsyncStorage.getItem('savingBalance');
    const chequingHistory = await AsyncStorage.getItem('chequingHistory');

    if (chequingBalance) {
      this.setState({
        chequingBalance: chequingBalance,
      });
    }
    if (savingBalance ) {
      this.setState({
        savingBalance: savingBalance,
      });
    }
    if (chequingHistory ) {
      this.setState({
        chequingHistory: JSON.parse(chequingHistory),
      });
    }
  }
  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <View style={{height: 50, backgroundColor: '#2aa202'}}>
          <Text style={styles.title}>
            Chequing
          </Text>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <Text style={styles.subtitle}>
            Account Number: {this.state.chequingAccountNumber}
          </Text>
          <Text style={styles.subtitle}>
            Balance: {this.state.chequingBalance}$
          </Text>

        </View>
        <View style={{height: 50, backgroundColor: '#2aa202'}}>
          <Text style={styles.title}>
            Savings
          </Text>
        </View>
        <View style={{backgroundColor: 'white'}}>
          <Text style={styles.subtitle}>
            Account Number: {this.state.savingAccountNumber}
          </Text>
          <Text style={styles.subtitle}>
            Balance: {this.state.savingBalance}$
          </Text>
          <TouchableHighlight onPress={this.toggleExpanded}>
            <View style={styles.header}>
              <Text style={styles.headerText}>View History</Text>
            </View>
          </TouchableHighlight>
          <Collapsible collapsed={this.state.collapsed} align="center">
          <View style={styles.container}>
            <View style={{alignItems: 'center', backgroundColor: 'white'}}>
              <Text>
                   { (this.state.chequingHistory).map((item, key)=>(<Text key={key}> { item.date } { item.transaction } { item.amount } {'\n'}</Text>))}
              </Text>
            </View>
            </View>
          </Collapsible>
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
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
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
