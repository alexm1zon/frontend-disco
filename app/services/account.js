async function updateAccountBalance() {
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

module.exports = {
  updateAccountBalance
};
