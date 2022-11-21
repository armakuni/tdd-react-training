Feature: Pizza order builder - allows customers to customize and build their own pizza order

    Background:
        Given the available toppings are:
        | id        | display   | price |
        | pepperoni | Pepperoni | 0.5   |
        | mushrooms | Mushrooms | 2     |
        And the available sauces are:
        | id     | display    |
        | garlic | Garlic |
        | tomato | Tomato |
        And the available sizes are:
        | id    | display | price | toppingPriceMultiplier |
        | large | Large   | 15    | 2                      |
        | small | Small   | 10    | 1                      |

    Scenario: Building an order for plain pizza with no sauce or toppings
        # When I choose the "large" size
        # Then the Pizza order should read: "Large Pizza"
        # And its price should be: £15

    Scenario: Building an order for pizza with sauce but no toppings
        Given I have chosen the "tomato" sauce
        
        When I choose the "large" size
        Then the pizza order should read: "Large tomato pizza"
        # And its price should be: £15

    Scenario: Building an order for pizza with sauce extra toppings
        # Given I have chosen the "pepperoni" topping and the "tomato" sauce 
        # When I choose the "Large" size
        # Then the Pizza order should read: "Large tomato pizza with extra Pepperoni"
        # And its price should be £16
