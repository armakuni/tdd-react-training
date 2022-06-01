
function PriceCalculator(props) {
    
    const pizzas = props.pizzas
    const prices = props.prices
    const totals = pizzas.map(calculatePizzaCost(prices));

    return <div>
        Total: £{(totals.reduce((x,y) => x + y, 0)).toFixed(2)}
    </div>
}

export function calculatePizzaCost(prices) {
    return pizza => calc(pizza);

    function calc(pizza) {
        var pizzaPrice;

        if (pizza.size === '') {
            pizzaPrice = 0;
        } else {
            for (let size of prices.sizes) {
                if (size.size === pizza.size) {
                    pizzaPrice = size.price;
                }
            }
        }
       
        var toppingPrice = [];

        for (let choice of pizza.toppings) {
            var tempPrice = 0;
            for (let topping of prices.toppings) {
                if (choice === topping.id) {
                    tempPrice = topping.price;
                }
            }

            if (pizza.size === '') {
                tempPrice = 0;
            } else {
                var multiplier;
                for (let size of prices.sizes) {
                    if (size.size === pizza.size) {
                        multiplier = size. toppingPriceMultiplier;
                    }
                }
                tempPrice = multiplier * tempPrice;
            }

            toppingPrice.push(tempPrice);

        }

        const toppingCount = toppingPrice.length;

        var discountedToppings = [];
        if(toppingCount > 2) {
            const numberToDeduct = Math.floor(toppingCount / 3);
            toppingPrice.sort();

            for (let i = numberToDeduct; i < toppingPrice.length; i++) {
                discountedToppings.push(toppingPrice[i]);
            }

        } else {
            discountedToppings = toppingPrice;
        }

        var discountedToppingPrice = 0;

        for (let discountedTopping of discountedToppings) {
            discountedToppingPrice = discountedToppingPrice + discountedTopping;
        }
        return pizzaPrice + discountedToppingPrice;
    }
}

export default PriceCalculator;