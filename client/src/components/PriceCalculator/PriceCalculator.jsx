
function PriceCalculator(props) {

    // const prices = [{size: 'large', cost: 15}, {size: 'medium', cost: 10}];
    // const prices = new Map()
    // prices.set('large', 15)
    // prices.set('medium', 10)
    
    const sizes = props.pizzas
    const prices = props.prices
    const totals = sizes.map(size => prices.find(x => x.size === size.size)).map(x => x.price);

    return <div>
        Total: £{totals.reduce((x,y) => x + y, 0)}
    </div>
}

export default PriceCalculator;