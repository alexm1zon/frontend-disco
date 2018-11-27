import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  DrawerItems
} from "react-navigation";

import Ionicons from "react-native-vector-icons/Ionicons";

// import LoginContainer, { isAuthorized } from "../containers/LoginContainer.js";
// import DrawerContainer from "../containers/DrawerContainer";

import Home from './screens/home';
import Accounts from './screens/accounts';
import Deposit from './screens/deposit';
import Transfer from './screens/transfer';
import SendMoney from './screens/sendMoney';
import Login from './screens/login';
import AddPayee from './screens/addPayee';
import AddRecipient from './screens/addRecipient';

const LoginStackNav = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        title: "Login"
      }
    }
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
      headerLeft: null
    }
  }
);

const HomeStackNav = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: "Home",
        headerLeft: (
          <Ionicons
            style={styles.icon}
            type="ionicon"
            name="ios-menu"
            size={25}
            onPress={() => navigation.openDrawer()}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Home"
  }
);

const AccountsStackNav = createStackNavigator(
  {
    Home: {
      screen: Accounts,
      navigationOptions: ({ navigation }) => ({
        title: "Accounts",
        headerLeft: (
          <Ionicons
            style={styles.icon}
            type="ionicon"
            name="ios-menu"
            size={25}
            onPress={() => navigation.openDrawer()}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Home"
  }
);

const SendMoneyStackNav = createStackNavigator(
  {
    SendMoney: {
      screen: SendMoney,
      navigationOptions: ({ navigation }) => ({
        title: "Send Money",
        headerLeft: (
          <Ionicons
            style={styles.icon}
            type="ionicon"
            name="ios-menu"
            size={25}
            onPress={() => navigation.openDrawer()}
          />
        )
      })
    },
    AddRecipient: {
      screen: AddRecipient,
      navigationOptions: ({ navigation }) => ({
        title: "Add Recipient",
      })
    }
  },
  {
    initialRouteName: "SendMoney"
  }
);

const TransferStackNav = createStackNavigator(
  {
    PayBill: {
      screen: Transfer,
      navigationOptions: ({ navigation }) => ({
        title: "Pay Bill",
        headerLeft: (
          <Ionicons
            style={styles.icon}
            type="ionicon"
            name="ios-menu"
            size={25}
            onPress={() => navigation.openDrawer()}
          />
        )
      })
    },
    AddPayee: {
      screen: AddPayee,
      navigationOptions: ({ navigation }) => ({
        title: "Add Payee",
      })
    }
  },
  {
    initialRouteName: "PayBill"
  }
);

const DepositStackNav = createStackNavigator(
  {
    Deposit: {
      screen: Deposit,
      navigationOptions: ({ navigation }) => ({
        title: "Deposit Cheque",
        headerLeft: (
          <Ionicons
            style={styles.icon}
            type="ionicon"
            name="ios-menu"
            size={25}
            onPress={() => navigation.openDrawer()}
          />
        )
      })
    }
  },
  {
    initialRouteName: "Deposit"
  }
);

const DrawerLayout = createDrawerNavigator(
  {
    "Home": {
      screen: HomeStackNav
    },
    "Accounts": {
      screen: AccountsStackNav
    },
    "Pay Bill": {
      screen: TransferStackNav
    },
    "Send Money": {
      screen: SendMoneyStackNav
    },
    "Deposit Cheque": {
      screen: DepositStackNav
    },
    "Logout": {
      screen: LoginStackNav
    }
  },
  {
    // contentComponent: DrawerContainer,
    initialRouteName: "Home",
    gesturesEnabled: false,
    backBehavior: "none",
    contentOptions: {
      activeTintColor: "#8f001a"
    }
  }
);

const RootNavigator = createSwitchNavigator(
  {
    AuthScreens: LoginStackNav,
    AppScreens: DrawerLayout
  },
  {
    initialRouteName: "AuthScreens"
  }
);

export default RootNavigator;

const styles = StyleSheet.create({
  icon: {
    padding: 15
  }
});
