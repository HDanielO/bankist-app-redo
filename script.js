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
let currentAccount;
let countdownTime = 600;

//updateUI
const displayBalance = account => {
  labelBalance.innerHTML = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'NGN',
  }).format(account.movements.reduce((acc, cur) => acc + cur, 0));
};

const displaySumIn = account => {
  labelSumIn.innerHTML = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'NGN',
  }).format(
    account.movements.filter(val => val > 0).reduce((acc, cur) => acc + cur, 0)
  );
};

const displaySumOut = account => {
  labelSumOut.innerHTML = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'NGN',
  }).format(
    account.movements.filter(val => val < 0).reduce((acc, cur) => acc + cur, 0)
  );
};

const displaySumInterest = account => {
  labelSumInterest.innerHTML = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'NGN',
  }).format(
    account.movements.reduce((acc, cur) => acc + cur, 0) *
      (account.interestRate / 100)
  );
};

const displayMovement = account => {
  containerMovements.innerHTML = '';
  const accMovements = isSorted
    ? account.movements.toSorted((a, b) => a - b)
    : account.movements;
  accMovements.forEach((mov, i) => {
    const currentDate = new Date().getTime() / (1000 * 3600 * 24);
    const transDate =
      new Date(account.movementsDates[i]).getTime() / (1000 * 3600 * 24);

    let movDate;

    if (currentDate - transDate < 1) {
      movDate = `TODAY`;
    } else if (currentDate - transDate === 1) {
      movDate = `YESTERDAY`;
    } else {
      movDate = `${new Date(account.movementsDates[i]).getDate()}/${
        new Date(account.movementsDates[i]).getMonth() + 1
      }/${new Date(account.movementsDates[i]).getFullYear()} `;
    }

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
           ${movDate} 
           </div>
<div class="movements__value">${new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'NGN',
      }).format(mov)}</div>
        </div>
        `
    );
  });
};

const updateUI = function () {
  displayBalance(currentAccount);
  displaySumIn(currentAccount);
  displaySumOut(currentAccount);
  displaySumInterest(currentAccount);
  displayMovement(currentAccount);
};

const resetInput = function (inputLeft, inputRight) {
  inputLeft.value = '';
  inputRight.value = '';
  inputRight.blur();
};

// CLOCK AND DATE
const dateFunction = function () {
  const currentDate = new Date();
  labelDate.innerHTML = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }).format(currentDate);
};

// TIMER
const timer = function () {
  let countdownMinute = Math.trunc(countdownTime / 60)
    .toString()
    .padStart(2, '0');
  let countdownSecond = (countdownTime % 60).toString().padStart(2, '0');
  labelTimer.innerHTML = `${countdownMinute}:${countdownSecond}`;
  countdownTime--;
};

const countdownTimer = function () {
  timer();
  const countdown = setInterval(() => {
    timer();
    if (countdownTime <= -1) {
      clearInterval(countdown);
      containerApp.style.opacity = 0;
      labelWelcome.innerHTML = 'Log in to get started';
      isSorted = false;
      containerMovements.innerHTML = '';
      labelSumInterest.innerHTML = '';
      labelSumOut.innerHTML = '';
      labelSumIn.innerHTML = '';
      labelBalance.innerHTML = '';
    }
  }, 1000);
};

const greetings = function () {
  const currentDate = new Date();
  if (currentDate.getHours() < 12) {
    return 'Good Morning';
  } else if (currentDate.getHours() >= 12 && currentDate.getHours() < 18) {
    return 'Good Afternoon';
  } else if (currentDate.getHours() >= 18 && currentDate.getHours() < 19) {
    return 'Good Evening';
  } else if (currentDate.getHours() >= 19 && currentDate.getHours() <= 23) {
    return 'Good Night';
  }
};

// LOGIN FUNCTIONALITY
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc =>
      `${acc.owner.split(' ')[0][0]}${
        acc.owner.split(' ')[1][0]
      }`.toLowerCase() === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    resetInput(inputLoginUsername, inputLoginPin);
    labelWelcome.innerHTML = `${greetings()}, ${
      currentAccount.owner.split(' ')[0]
    }!`;
    dateFunction();
    setInterval(dateFunction, 1000);
    updateUI();
    countdownTime = 600;
    containerApp.style.opacity = 1;
    countdownTimer();
  }
});

// TRANSFER MONEY FUNCTIONALITY
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const receiverAccount = accounts.find(
    acc =>
      `${acc.owner.split(' ')[0][0]}${
        acc.owner.split(' ')[1][0]
      }`.toLowerCase() === inputTransferTo.value
  );

  if (
    receiverAccount.owner !== currentAccount.owner &&
    Number(inputTransferAmount.value) > 0 &&
    Number(inputTransferAmount.value) <=
      currentAccount.movements.reduce((acc, cur) => acc + cur, 0)
  ) {
    const timeSent = new Date().toISOString();
    receiverAccount.movements.push(Number(inputTransferAmount.value));
    currentAccount.movements.push(-Number(inputTransferAmount.value));
    receiverAccount.movementsDates.push(timeSent);
    currentAccount.movementsDates.push(timeSent);
    updateUI();
    resetInput(inputTransferTo, inputTransferAmount);
  }
});

// REQUEST LOAN FUNCTIONALITY
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const timeRequest = new Date().toISOString();
  currentAccount.movements.push(Number(inputLoanAmount.value));
  currentAccount.movementsDates.push(timeRequest);
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
  setTimeout(() => {
    updateUI();
  }, 2000);
});

// SORT MOVEMENT FUNCTIONALITY
btnSort.addEventListener('click', function () {
  isSorted = !isSorted;
  displayMovement(account1);
});

// DELETE ACCOUNT FUNCTIONALITY
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value ===
      `${currentAccount.owner.split(' ')[0][0]}${
        currentAccount.owner.split(' ')[1][0]
      }`.toLowerCase() &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const currentAccountIndex = accounts.indexOf(currentAccount);
    accounts.splice(currentAccountIndex, 1);
    // currentAccount;
    resetInput(inputCloseUsername, inputClosePin);
    containerMovements.innerHTML = '';
    labelSumInterest.innerHTML = '';
    labelSumOut.innerHTML = '';
    labelSumIn.innerHTML = '';
    labelBalance.innerHTML = '';
    isSorted = false;
    containerApp.style.opacity = 0;
    labelWelcome.innerHTML = 'Log in to get started';
  }
});
