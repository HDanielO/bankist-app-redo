'use strict';

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2025-05-08T14:11:59.604Z',
    '2025-05-20T17:01:17.194Z',
    '2025-05-22T23:36:17.929Z',
    '2025-05-23T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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

// STATES
let isSorted = false;

//updateUI
containerApp.style.opacity = 1;

const displayBalance = account => {
  labelBalance.innerHTML = account.movements.reduce((acc, cur) => acc + cur, 0);
};

displayBalance(account1);

const displaySumIn = account => {
  labelSumIn.innerHTML = account.movements
    .filter(val => val > 0)
    .reduce((acc, cur) => acc + cur, 0);
};

displaySumIn(account1);

const displaySumOut = account => {
  labelSumOut.innerHTML = account.movements
    .filter(val => val < 0)
    .reduce((acc, cur) => acc + cur, 0);
};

displaySumOut(account1);

const displaySumInterest = account => {
  labelSumInterest.innerHTML =
    account.movements.reduce((acc, cur) => acc + cur, 0) *
    (account.interestRate / 100);
};

displaySumInterest(account1);

const displayMovement = account => {
  containerMovements.innerHTML = '';
  const accMovements = isSorted
    ? account.movements.toSorted((a, b) => a - b)
    : account.movements;
  accMovements.forEach((mov, i) => {
    const movDate = new Date(account.movementsDates[i]);
    containerMovements.insertAdjacentHTML(
      'afterbegin',
      `<div class="movements__row">
          <div class="movements__type 
          ${
            mov > 0 ? 'movements__type--deposit' : 'movements__type--withdrawal'
          }
          movements__type--deposit">${i + 1} ${
        mov > 0 ? 'deposit' : 'withdrawal'
      }</div>

          <div class="movements__date">
           ${movDate.getDate()}/${
        movDate.getMonth() + 1
      }/${movDate.getFullYear()} 
           </div>
<div class="movements__value">${mov}</div>
        </div>
        `
    );
  });
};

displayMovement(account1);

// BUTTON FUNCTIONALITIES
btnSort.addEventListener('click', function () {
  isSorted = !isSorted;
  displayMovement(account1);
});
