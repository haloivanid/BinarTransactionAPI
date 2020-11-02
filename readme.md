# Welcome to Transaction API!
## How to run the project
You need to install required dependencies (libraries) by typing in the terminal
```bash
npm install
```
Then you can run this project by:
- Using node
  ```bash
  npm start
  ```
- Using nodemon
  ```bash
  npm run dev
  ```
----------
## How to Use Feature?
# As Admin
- Login with default account
```
username = "admin"
password = "admin"
```
- inserting item
- inserting discount (optional)
# As Customer
- Registering First
- go to /items route to view if there is item to buy
- use /transaction/item to add transaction item
- after do job in /transaction/item go to /transaction/collect route to collect all transaction item to transaction route
- then update the transaction using patch method.
- the payment must equal to amountTransaction to set paymentStatus to True