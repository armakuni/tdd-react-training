# Day 1 Exercise 2: TDD - Lift Button

This exercise allows you to practice Test-Driven Development tests that involve `state` e.g. building a state machine;
It involves building the "brains" of a lift button using Test-Driven Development to evolve your design iteratively. 

Kata taken from Saman Coaching [https://sammancoaching.org/kata_descriptions/lift_button.html]

## Approach

Implement 1 test at a time, and then write the code needed to pass the test, as per the red-green-refactor cycle.

### Functional requirements

 - When you press the button, the light comes on
 - When the lift arrives and the doors open, the light goes out
 - Pressing the button again while the light is on but the lift doors are closed has no effect.
 - While the doors are open, pressing the button does not switch the light on.

## How to Work

1. Create separate files for your game code and test code (e.g. `src/liftbutton.ts` and `src/liftbutton.test.ts`.)
2. Follow the red-green-refactor cycle when developing your code.