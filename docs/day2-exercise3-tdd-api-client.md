# Day 2 Exercise 3: TDD API Client

This exercise involves building an API Client for an open API mocking requests with Axios

## Approach

When doing this exercise, try to implement the client using only Axios mocks first.

Once you are confident that your client works using mocks add some tests the use the real API (These tests should pass
first time if your mocking is correct)

### Functional requirements

You can use any public API you wish, but it must have an endpoint that returns a paginated collection of resources and 
an endpoint that returns a single resource by its ID. You could you one of these:

  - [Pokemon API](https://pokeapi.co/)
  - [Star Wars API](https://swapi.dev/)

Once you have picked your API your client must:

1. Get the first page of a collection of resources
2. Get a single resource by its ID
3. Handle a 500 (Internal Server Error) response to both requests
4. Handle a 404 (Not Found) response for the single resource request

## Stretch Exercises

Enable the collection of resources function to take arguments to request resource beyond page one of the list.
