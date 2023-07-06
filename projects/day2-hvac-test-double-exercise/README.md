# Day 2 Exercise 2: Environment Controller Kata

Implement an environment controller which controls a real HVAC (heating, ventilation, and air conditioning) device. 
The controller has to regulate room temperature using heater, cooler and fan. 

## Approach

When doing this exercise, try to implement the function using tests to convince yourself that the code you have written 
is correct.

Implement 1 test at a time, and then write the code needed to pass the test, as per the red-green-refactor cycle.

For this kata you will need to a test double. Think carefully which type (stub, dummy, spy, mock or fake) you use. 

## Functional requirements

The Environment Controller should have a single public tick() function that will be called every minute in production.
It should check the current temperature and modify the state of the HVAC.

When temperature is 21ºC, everything is off.
When temperature is over 23ºC, cooler and fan on should be on.
When temperature is below 19ºC, heater and fan should be on.
Leave fan on for 5 minutes after turning heat off.
Don’t start cooler within 3 minutes after turning it off.

## How to Work

1. Create separate files for your game code and test code (e.g. `src/environment-controller.ts` and `src/environment-controller.test.ts`.)
2. Create separate files for any interfaces you create
3. Follow the red-green-refactor cycle when developing your code.

