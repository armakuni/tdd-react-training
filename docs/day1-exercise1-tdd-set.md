# Day 1 Exercise 2: TDD Set

This exercise involves building a Set class using Test-Driven Development to evolve your design iteratively. TDD gives you continuous feedback on the quality of your design whilst building confidence in your code.

## Approach

When doing this exercise, try to implement the function using tests to convince yourself that the code you have written is correct.

Implement 1 test at a time, and then write the code needed to pass the test, as per the red-green-refactor cycle.

## Functional requirements

You need to build Set functionality which meets the follwing requirements:
+ each element can only appear in the set once
+ 'union' operation returns elements that are in both sets
+ 'intersect' operation returns elements that are common to both sets
+ 'difference' operation returns elements that are not common to both sets
+ 'union' and 'difference' operations on Set 'S' with an empty set return Set 'S'
+ 'intersect' operation on Set 'S' with an empty set returns an empty Set

## How to Work

1. Create separate files for your game code and test code (e.g. `src/set.ts` and `src/set.test.ts`.)
2. Follow the red-green-refactor cycle when developing your code.
