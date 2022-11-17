Feature: Pizza order builder - allows customers to customize and build their own pizza order

Background:
    # Given the available toppings are:
    # | Topping   | Price |
    # | Pepperoni | 0.5   |
    # | Mushrooms | 2     |
    # And the available sauces are:
    # | garlic |
    # | tomato |
    # And the available sizes are:
    # | Size  | Price | Topping multiplier |
    # | Large | 15    | 2                  |
    # | Small | 10    | 1                  |

Scenario: Building an order for plain pizza with no sauce or toppings
    # When I choose the "large" size
    # Then the Pizza order should read: "Large Pizza"
    # And its price should be: £15

Scenario: Building an order for pizza with sauce but no toppings
    Given I have chosen the "tomato" sauce
    
    When I choose the "large" size
    # Then the pizza order should read: "Large tomato pizza"
    # And its price should be: £15

Scenario: Building an order for pizza with sauce extra toppings
    # Given I have chosen the "pepperoni" topping and the "tomato" sauce 
    # When I choose the "Large" size
    # Then the Pizza order should read: "Large tomato pizza with extra Pepperoni"
    # And its price should be £16
