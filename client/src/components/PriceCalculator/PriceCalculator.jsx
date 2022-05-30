
function PriceCalculator(props) {
    
    const pizzas = props.pizzas
    const prices = props.prices
    const totals = pizzas.map(calculatePizzaCost(prices));

    return <div>
        Total: £{(totals.reduce((x,y) => x + y, 0)).toFixed(2)}
    </div>

    
}

export function calculatePizzaCost(prices) {
    return pizza => findPizzaSize(pizza).price 
    + pizza.toppings.map(findToppingPrice()).map(x => x * findPizzaSize(pizza).toppingPriceMultiplier).reduce((x,y) => x + y, 0);

    function findPizzaSize(pizza) {
        return prices.sizes.find(x => x.size === pizza.size);
    }

    function findToppingPrice() {
        return topping => prices.toppings.find(x => x.topping === topping).price;
    }
}

export default PriceCalculator;