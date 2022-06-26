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

//////
const displayMovements = function (movements) {
  containerMovements.innerHTML = ``;
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <li class="movements__row">
      <div class="movements__type movements__type_${type}">
        ${i + 1} ${type}
      </div>
      <div class="movements__value">${mov} €</div>
    </li>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const user = 'Steven Tomas Williams'; // stw
// Метод split() разбивает объект String на массив строк путём разделения строки указанной подстрокой.
// Метод join() объединяет все элементы массива (или массивоподобного объекта) в строку.
const createUsermanes = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(el => el.at())
      .join('');
  });
};

createUsermanes(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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


//
// FOREACH METHOD with MAPS and SETS
/////////////////////////////
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
  console.log(`${key}: ${value}`);
});
// Optput:
// USD: United States dollar
// app.js:188 EUR: Euro
// app.js:188 GBP: Pound sterling

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique); // Set(3) {'USD', 'GBP', 'EUR'}
// currenciesUnique.forEach((value, key, map) => {
currenciesUnique.forEach((value, _, map) => {
  console.log(`${value}: ${value}`);
  // key is exactly the same as the value
});
// Output:
// USD: USD
// app.js:199 GBP: GBP
// app.js:199 EUR: EUR



// Challenge 1
function checkDogs(arr1, arr2) {
  const dogs = arr1.slice(1, -2).concat(arr2);
  dogs.forEach((dog, i, arr) => {
    const isAdult =
      dog >= 3
        ? `is an adult 🐕 and have ${dog} years old`
        : `is still a puppy 🐶`;
    console.log(`Dog number ${i + 1} ${isAdult}`);
  });
}
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log(`------- next call ------`);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);




//
// MAP METHOD
/////////////////////////////

const usdToEuro = 1.1;

const movementsEuro = movements.map(mov => mov * usdToEuro);
console.log(movements);
console.log(movementsEuro);

// classic
const movementsEuro2 = [];
for (const mov of movements) {
  movementsEuro2.push(mov * usdToEuro);
}
console.log(movementsEuro2);

const movementsDescription = movements.map(
  (mov, i, _) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescription); // return array with strings


*/

const deposits = movements.filter((mov, i, arr) => mov > 0);
console.log(deposits);

const withdrawals = movements.filter(el => el < 0);
console.log(withdrawals);
