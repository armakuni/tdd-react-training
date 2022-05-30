
function PriceCalculator(props) {

    // const prices = [{size: 'large', cost: 15}, {size: 'medium', cost: 10}];
    // const prices = new Map()
    // prices.set('large', 15)
    // prices.set('medium', 10)
    
    const pizzas = props.pizzas
    const prices = props.prices
    const totals = pizzas.map(calculatePizzaCost());

    return <div>
        Total: £{totals.reduce((x,y) => x + y, 0)}
    </div>

    function calculatePizzaCost() {
        return pizza => prices.sizes.find(x => x.size === pizza.size).price 
        + pizza.toppings?.map(findToppingPrice()).reduce((x,y) => x + y, 0);

        function findToppingPrice() {
            return topping => prices.toppings.find(x => x.topping === topping).price;
        }
    }
}

export default PriceCalculator;