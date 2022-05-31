
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
    + applyMultiBuyDiscount(calculateToppingPrices(pizza)).reduce((x,y) => x + y, 0);

    function calculateToppingPrices(pizza) {
        return pizza.toppings.map(findToppingPrice()).map(x => x * findPizzaSize(pizza).toppingPriceMultiplier);
    }

    function findPizzaSize(pizza) {
        return pizza.size == '' ? {size: '', price: 0, toppingPriceMultiplier: 0} : prices.sizes.find(x => x.size === pizza.size);
    }

    function findToppingPrice() {
        return topping => prices.toppings.find(x => x.id === topping).price;
    }

    function applyMultiBuyDiscount(toppings) {
        const toppingCount = toppings.length;

        if(toppingCount > 2) {
            const numberToDeduct = Math.floor(toppingCount / 3);
            return toppings.sort().reverse().slice(0, toppingCount - numberToDeduct);
        }
        return toppings;
    }
}

export default PriceCalculator;