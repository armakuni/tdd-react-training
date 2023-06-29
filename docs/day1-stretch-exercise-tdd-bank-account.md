# Day 1 Stretch Exercise: TDD Bank Account

This exercise incorporates the use of domain language to develop bank account code using Test-Driven Development.

## Approach

When doing this exercise, make use of the domain language (e.g. "deposit" "withdraw") in the code.

Implement 1 test at a time, and then write the code needed to pass the test, as per the red-green-refactor cycle.

## Functional requirements

### Customer can
   - deposit any amount
   - withdraw as much as they have in the account
   - print their statement

The statement contains the: Date, Amount Deposited, Balance after depositing
This is an example of the output of print statement

```
Date       | Amount | Balance
2023-01-14 | -500   | 2500
2023-01-13 | 2000   | 3000
2023-01-10 | 1000   | 1000
```

### Start a test for zero rows
```
Date       | Amount | Balance
```

### Then a test for one row
```
Date       | Amount | Balance
2023-01-10 | 1000   | 1000
```

### A test for two transactions: 2 deposits
```
Date       | Amount | Balance
2023-01-10 | 1000   | 1000
2023-01-10 | 500    | 1500
```
 
### A test for two transactions: deposit and withdraw
```
Date       | Amount | Balance
2023-01-10 | 1000   | 1000
2023-01-10 | -500   | 500
```

### A test for two transactions, on two different dates
```
Date       | Amount | Balance
2023-01-10 | 1000   | 1000
2023-01-11 | 500    | 1500
```

### Advanced: A test for interest being gained at the end of the month
```
Date       | Amount | Balance
2023-01-10 | 1000   | 1000
2023-05-10 | 500    | 1500
2023-30-10 | .10    | 1500.10
```
## How to Work

1. Create separate files for your game code and test code (e.g. `src/bank-account.ts` and `src/bank-account.test.ts`.)
2. Follow the red-green-refactor cycle when developing your code.
