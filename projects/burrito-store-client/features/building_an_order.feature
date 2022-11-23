Feature: Burrito order builder - allows customers to customize and build their own burrito order

    Background:
        Given the available fillings are:
        | id        | display   | price |
        | chicken   | Chicken   | 0.5   |
        | beef      | Beef      | 2     |
        And the available extras are:
        | id     | display    |
        | cheese | Cheese     |
        And the available sizes are:
        | id    | display | price | fillingPriceMultiplier |
        | large | Large   | 15    | 2                      |
        | small | Small   | 10    | 1                      |

    Scenario: Building an order for plain burrito with no extras or fillings
        When I choose the "large" size
        Then the burrito order should read: "Large burrito"
        And its price should be: £15

    Scenario: Building an order for burrito with a filling but no extras
        Given I have chosen the "chicken" filling
        When I choose the "large" size
        Then the burrito order should read: "Large chicken burrito"
        And its price should be: £15

    # Scenario: Building an order for burrito with sauce extra toppings
        # Given I have chosen the "cheese" extra and the "chicken" filling 
        # When I choose the "Large" size
        # Then the burrito order should read: "Large chicken burrito with extra cheese"
        # And its price should be £16
