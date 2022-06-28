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

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.title__welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value_in');
const labelSumOut = document.querySelector('.summary__value_out');
const labelSumInterest = document.querySelector('.summary__value_interest');
const labelTimer = document.querySelector('.logout__timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.btn__login');
const btnTransfer = document.querySelector('.transfer__btn');
const btnLoan = document.querySelector('.loan__btn');
const btnClose = document.querySelector('.close__btn');
const btnSort = document.querySelector('.btn__sort');

const inputLoginUsername = document.querySelector('.login__user');
const inputLoginPin = document.querySelector('.login__pin');
const inputTransferTo = document.querySelector('.transfer__to');
const inputTransferAmount = document.querySelector('.transfer__amount');
const inputLoanAmount = document.querySelector('.loan__amount');
const inputCloseUsername = document.querySelector('.close__user');
const inputClosePin = document.querySelector('.close__pin');

//////
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ``;

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
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

const calcAndDisplayBalance = function (account) {
  account.balance = account.movements.reduce(
    (accumulator, movement) => accumulator + movement,
    0
  );
  labelBalance.textContent = `${account.balance} €`;
};

const calcAndDisplaySummary = function (account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const outcome = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    // .filter((int, i, arr) => {
    //   console.log(arr);
    //   return int >= 1;
    // })
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumIn.textContent = `${income} €`;
  labelSumOut.textContent = `${outcome} €`;
  labelSumInterest.textContent = `${interest} €`;
};

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

const updateUI = function (account) {
  // Display movements
  displayMovements(account.movements);
  // Display balance
  calcAndDisplayBalance(account);
  // Display summary
  calcAndDisplaySummary(account);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display Ui and welcome
    labelWelcome.textContent = `Welcome back ${currentAccount.owner
      .split(' ')
      .at()}`;
    containerApp.style.opacity = 1;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    account => account.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // doing transfer
    console.log(currentAccount);
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  // clear fields
  inputTransferAmount.value = inputTransferTo.value = '';
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = +inputLoanAmount.value;
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      account => account.username === currentAccount.username
    );
    accounts.splice(index, 1);
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = 0;
  }
});

let sorted = false;

btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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




const deposits = movements.filter((mov, i, arr) => mov > 0);
console.log(deposits);

const withdrawals = movements.filter(el => el < 0);
console.log(withdrawals);



//
// REDUCE METHOD
/////////////////////////////
console.log(movements);
// const balance = movements.reduce((accumulator, el, i, arr) => {
//   return accumulator + el;
// }, 0);
const balance = movements.reduce(
  (accumulator, el, i, arr) => accumulator + el,
  0
);
console.log(balance); // 3840 - number




// Maximum value of movements array
const maximumMovement = movements.reduce((accumulator, movement) => {
  if (accumulator > movement) return accumulator;
  else return movement;
}, movements.at());
console.log(maximumMovement);



// Challenge # 2
const calcAverageHumanAge = function (ages) {
  const humanAges = ages.map((el, i, arr) => (el <= 2 ? 2 * el : 16 + el * 4));
  const adults = humanAges.filter((el, i, arr) => el >= 18);
  const average = adults.reduce((acc, el, i, arr) => acc + el / arr.length, 0);
  return average;
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


// Truboprovod

const eurToUsd = 1.1;
const totalDepositUSD = movements
.filter(mov => mov > 0)
.map((mov, i, arr) => {
  console.log(arr); // for debugging
  return mov * eurToUsd;
})
.reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUSD); // 5522.000000000001


///////////////////////////////
// Challenge # 3
// Use chaing method and arrow function

// const calcAverageHumanAge = function (ages) {
//   const humanAges = ages.map((el, i, arr) => (el <= 2 ? 2 * el : 16 + el * 4));
//   const adults = humanAges.filter((el, i, arr) => el >= 18);
//   const average = adults.reduce((acc, el, i, arr) => acc + el / arr.length, 0);
//   return average;
// };

const calcAverageHumanAge = ages =>
  ages
    .map(el => (el <= 2 ? 2 * el : 16 + el * 4))
    .filter(el => el >= 18)
    .reduce((acc, el, i, arr) => acc + el / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));




//
// FIND METHOD
/////////////////////////////
// return only first element which satisfact this condition, NOT new array
const firstWitdrawal = movements.find(mov => mov < 0);
console.log(firstWitdrawal);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);




//
// SOME AND EVERY METHOD
/////////////////////////////
console.log(movements);
console.log(movements.includes(-130)); // testing for equality

// testing for condition:
const anyDeposit = movements.some(mov => mov > 0);
console.log(anyDeposit); // true

// testing for ALL conditions
console.log(account1.movements.every(mov => mov > 0)); // false
console.log(account4.movements.every(mov => mov > 0)); // true

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit)); // true


//
// FLAT AND FLATMAP METHOD
/////////////////////////////

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

console.log(accounts.flatMap(acc => acc.movements)); // (29) [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]
console.log(
  accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0)
); // 17840 - as number



//
// SORT METHOD
/////////////////////////////
// MUTATE ORIGINAL ARRAY
const owners = ['Jonas', 'Zack', 'Adam', 'Martha'];
console.log(owners.sort());
['Adam', 'Jonas', 'Martha', 'Zack'];

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// movements.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   } else {
//     return -1;
//   }
// });
movements.sort((a, b) => a - b);
console.log(movements);



//
// ARRAYS PROGRAMMATICALLY
/////////////////////////////
const arr = [1, 2, 3, 4, 5, 6, 7];

// epmpty array with fill()
const x = new Array(7);
console.log(x); // [empty × 7]
x.fill(5);
console.log(x); // (7) [5, 5, 5, 5, 5, 5, 5]

arr.fill(77, 4, 6);
console.log(arr); // [1, 2, 3, 4, 77, 77, 7]

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y); // [1, 1, 1, 1, 1, 1, 1]

const h = Array.from({ length: 7 }, ( _, i) => ++i);
console.log(h); // [1, 2, 3, 4, 5, 6, 7]

// let random = Math.random() * 6;
const diceRolls = Array.from(
  { length: 100 },
  (_, i) => (i = Math.trunc(Math.random() * 6 + 1))
);
console.log(diceRolls); // (100) [6, 6, 6, 2, 3, 2, 6, 6, 3, 4, 5, 2, 4, 4, 2, 1, 4, 5, 2, 5, 6, 4, 3, 6, 1, 3, 3, 6, 3, 5, 1, 6, 1, 1, 6, 3, 5, 1, 1, 6, 2, 5, 6, 1, 5, 4, 3, 4, 5, 1, 1, 3, 2, 5, 3, 2, 4, 4, 1, 1, 4, 2, 1, 5, 6, 4, 5, 3, 4, 4, 6, 5, 3, 4, 4, 1, 1, 3, 2, 6, 5, 2, 6, 4, 2, 3, 2, 4, 1, 6, 3, 6, 6, 5, 2, 6, 6, 5, 4, 5]

labelBalance.addEventListener('click', e => {
  e.preventDefault();

  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => +el.textContent.replace('€', '')
  );
  console.log(movementsUI); // (8) [1300, 70, -130, -650, 3000, -400, 450, 200]
});


*/

//
// ARRAYS PRACTICE
/////////////////////////////
// 1.
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => mov + acc, 0);

console.log(bankDepositSum); // 25180

// 2.
// const numDeposits1k = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 1000).length;
// console.log(numDeposits1k); // 5
const numDeposits1k = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => (mov >= 1000 ? ++acc : acc), 0);
console.log(numDeposits1k); // 6

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (acc, el) => {
      // el > 0 ? (acc.deposits += el) : (acc.withdrawals += el);
      acc[el > 0 ? 'deposits' : 'withdrawals'] += el;
      return acc;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

// 4.
const convertTitleCase = function (title) {
  const exeptions = ['a', 'an', 'the', 'but', 'for', 'or', 'in'];
  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word =>
      exeptions.includes(word) ? word : word.at().toUpperCase() + word.slice(1)
    )
    .join(' ');
  return titleCase;
};
console.log(convertTitleCase('this is a nice TITLE'));
