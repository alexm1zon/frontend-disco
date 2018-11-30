import { AsyncStorage } from 'react-native';

getDate() {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return dd + '/' + mm + '/' + yyyy;

}

async function recordTransaction(transaction) {
    let transactionArray;
    transactionArray = await AsyncStorage.getItem('chequingHistoryArray');

    if (!transactionArray) {
      throw Error('Cannot record transation');
    }

    transactionArray = JSON.parse(transactionArray);

    transactionArray.push({
      label: `${this.state.firstName} ${this.state.lastName}`,
      value: `${recipientArray.length+1}`
    });
    transactionArray.sort(function(a, b) {
        return a.value > b.value;
    });
    console.log('Recipient Array is ', transactionArray);
    await AsyncStorage.setItem('chequingHistoryArray', JSON.stringify(transactionArray));
}

module.exports = {
  getDate,
  recordTransaction
};
