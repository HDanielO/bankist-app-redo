# Bankist - REDO

This project is an independent re-implementation of the "Bankist" application, originally featured in Jonas Schmedtmann's JavaScript course. My primary goal in undertaking this project was to solidify my understanding and practical application of core JavaScript concepts, particularly:

- **Arrays:** Advanced array methods (e.g., `map`, `filter`, `reduce`, `find`, `findIndex`, `some`, `every`, `flat`, `flatMap`, `sort`, `forEach`, `from`).
- **Numbers:** Working with numerical data, including `toFixed`, `parseInt`, `parseFloat`, `Math` methods, and handling large numbers.
- **Dates and Times:** Utilizing the `Date` object, formatting dates and times, and implementing timers (`setTimeout`, `setInterval`).

---

## 🌟 Project Overview

Bankist is a simulated online banking application that allows users to:

- Log in securely
- View their transaction history (movements)
- Transfer money to other users
- Request loans
- See account summaries (incomes, outgoings, interest)
- Sort their transaction history
- Close their account
- Experience a real-time logout timer for security

This solo re-creation focuses on implementing the underlying logic and user interface without direct reliance on the original course's code.

---

> **⚠️ Note:** This site is **not responsive** and is designed for **desktop use only**. For the best experience, please use a desktop or laptop device.

---

## 🚀 Features & Functionality

### 1. **User Login & Authentication**

- Users log in with a username and PIN (see below for demo accounts).
- Personalized greeting based on the time of day.
- Secure session with an auto-logout timer (10 minutes of inactivity).

### 2. **Account Movements (Transactions)**

- View all deposits and withdrawals, each with a date ("Today", "Yesterday", or formatted date).
- Movements are displayed in the user's local currency (NGN).
- Sort transactions in ascending order.

### 3. **Account Summary**

- **Balance:** Shows the current account balance.
- **Incomes:** Total of all deposits.
- **Outgoings:** Total of all withdrawals.
- **Interest:** Calculated as a percentage of the current balance (account-specific rate).

### 4. **Money Transfer**

- Transfer funds to another user by entering their username and the amount.
- Transfers are validated (sufficient balance, cannot transfer to self).
- Both sender and receiver see the transaction in their history.

### 5. **Loan Request**

- Users can request a loan (any amount).
- Loan is instantly credited to the account after a short delay.
- Loan transactions are timestamped.

### 6. **Account Closure**

- Users can close their account by confirming their username and PIN.
- All account data is removed from the session.

### 7. **Real-Time Date & Timer**

- Current date and time are displayed and updated every second.
- Logout timer counts down from 10 minutes, logging the user out automatically when it reaches zero.

### 8. **Responsive UI**

- Clean, modern interface with dynamic updates based on user actions.

---

## 👤 Demo Accounts

To explore the app, use the following demo account credentials:

| Owner             | Username | PIN  |
| ----------------- | -------- | ---- |
| Jonas Schmedtmann | js       | 1111 |
| Jessica Davis     | jd       | 2222 |

- **Username**: The username is the lowercase initials of the account owner's first and last name (e.g., Jonas Schmedtmann → `js`).
- **PIN**: 4-digit number as shown above.

---

## 📝 How to Use

1. **Login**: Enter a valid username and PIN, then click "Login".
2. **View Transactions**: See your transaction history, balance, and summary on the dashboard.
3. **Transfer Money**: Enter the recipient's username and amount, then click "Transfer".
4. **Request Loan**: Enter the desired loan amount and click "Request Loan".
5. **Sort Movements**: Click the sort button to toggle transaction sorting.
6. **Close Account**: Enter your username and PIN, then click "Close Account" to delete your account.
7. **Logout**: The app will automatically log you out after 10 minutes of inactivity for security.

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)

---

## 📚 Learning Outcomes

Through this project, I aimed to achieve a deeper understanding of:

- Structuring and organizing JavaScript code.
- Manipulating the DOM efficiently.
- Handling user input and events.
- Applying array methods for data transformation and analysis.
- Working with dates and timers for dynamic UI elements.
- Debugging and problem-solving independently.

---

## ⚡ Independent Project Note

This project was built from scratch as a personal challenge to consolidate my learning from the course. All logic, structure, and UI decisions were made independently, without copying from the original tutorial codebase.

---

## 📸 Preview

![Bankist App Screenshot](Bankist-flowchart.png)

---

Feel free to explore, test, and review the code!
