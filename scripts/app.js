'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE METHOD
/////////////////////////////
// return new array without mutating original array
// console.log(arr.slice(2)); // ['c', 'd', 'e']
// console.log(arr.slice(2, 4)); // ['c', 'd']
// console.log(arr.slice(-2)); // ['d', 'e']
// console.log(arr.slice(-1)); // ['e'] - last element in new array from original
// console.log(arr.slice(1, -2)); // ['b', 'c'] begin from position 1 and extract all exept las two
// // we can use SLICE method for create a shallow copy of the array:
// console.log(arr.slice()); // ['a', 'b', 'c', 'd', 'e']
// // Same result with SPREAD operator:
// console.log([...arr]); // ['a', 'b', 'c', 'd', 'e']

//
// SPLICE METHOD
/////////////////////////////
// Important difference - CHANGE the original array!
// console.log(arr.splice(2)); // ['c', 'd', 'e']
// console.log(arr); // ['a', 'b'] - remains only two original elements
// console.log(arr.splice(-1)); // remove last element // ['e']
// arr = ['a', 'b', 'c', 'd']
// console.log(arr.splice(1, 2)); // deleted elements - ['b', 'c']
// console.log(arr); // remaining elements - ['a', 'd', 'e']

/*
//
// REVERSE METHOD
/////////////////////////////
const arr2 = ['j', 'i', 'h', 'g', 'f']; // wrong sequence
console.log(arr2.reverse()); // normal sequence - ['f', 'g', 'h', 'i', 'j']
// this method MUTATE original array
console.log(arr2); // ['f', 'g', 'h', 'i', 'j']

//
// CONCAT METHOD
/////////////////////////////
// This method NOT mutate original array
// create new array from two old arrays
const letters = arr.concat(arr2);
console.log(letters); // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// not mutate orinal arrays usign SPREAD operator ->
console.log([...arr, ...arr2]); // same result - ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

//
// JOIN METHOD
/////////////////////////////
// just for sake of completeon (ради завершения)
console.log(letters.join(' - ')); // a - b - c - d - e - f - g - h - i - j (string)


//
// AT METHOD
/////////////////////////////
const arr = [77, 54, 22];
console.log(arr[0]); // 77
console.log(arr.at(0)); // 77
console.log(arr.at()); // 77

console.log(arr[arr.length - 1]); // 22 - last element
console.log(arr.slice(-1)); // [22] - array with last element
console.log(arr.slice(-1)[0]); // 22 - last element/value

console.log(arr.at(-1)); // 22 - last element/value
console.log(arr.at(-2)); // 54 - value

// This method is also works with STRINGS
console.log('Andriy'.at()); // 'A' - as a string
console.log('Andriy'.at(-1)); // 'y' - as a string

*/

//
// FOREACH METHOD
/////////////////////////////
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Classic method
// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    // Math.abc() -> removing the '-' (minus) sign
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
console.log('------- forEach() -------');
movements.forEach((mov, i, arr) => {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    // Math.abc() -> removing the '-' (minus) sign
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
