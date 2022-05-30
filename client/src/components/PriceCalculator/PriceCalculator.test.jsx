import { render, screen } from "@testing-library/react"
import PriceCalculator from './PriceCalculator'


describe('PriceCalculator', () => {
    const prices = {sizes: [{size: 'large', price: 15, toppingPriceMultiplier: 2}, 
    {size: 'medium', price: 10, toppingPriceMultiplier: 1.5},
    {size: 'small', price: 5, toppingPriceMultiplier: 1}], 
toppings: [{topping: "mushroom", price: 0.5}, 
{topping: "anchovy", price: 1}, 
{topping: "pepperoni", price: 1.5}]}
const pizzas = [{size: 'large', toppings: ['mushroom']}]

    it('renders total price for single pizza', async () => {
        const pizzas = [{size: 'large', toppings: []}]
        render(<PriceCalculator pizzas={pizzas} prices={prices}/>);

        const totalElement = await screen.findByText('Total: £15.00');

        expect(totalElement).toBeInTheDocument();
    })

    it('renders total price for multiple pizzas', async() => {
        const pizzas = [{size: 'large', toppings: []}, {size: 'medium', toppings: []}]
        render(<PriceCalculator pizzas={pizzas} prices={prices}/>);

        const totalElement = await screen.findByText('Total: £25.00');

        expect(totalElement).toBeInTheDocument();
    })

    it('renders total price for pizza with mushroom topping', async() => {
        const pizzas = [{size: 'large', toppings: ['mushroom']}]
        render(<PriceCalculator pizzas={pizzas} prices={prices}/>);

        const totalElement = await screen.findByText('Total: £16.00');

        expect(totalElement).toBeInTheDocument();
    })

    it('renders total price for single pizza with multiple toppings', async() => {
        const pizzas = [{size: 'large', toppings: ['mushroom', 'pepperoni']}]
        render(<PriceCalculator pizzas={pizzas} prices={prices}/>);

        const totalElement = await screen.findByText('Total: £19.00');

        expect(totalElement).toBeInTheDocument();
    })

    it('renders total price for multiple pizzas with multiple toppings', async() => {
        const pizzas = [{size: 'large', toppings: ['pepperoni']},
        {size: 'medium', toppings: ['mushroom', 'pepperoni', 'anchovy']},
        {size: 'small', toppings: ['mushroom', 'pepperoni']}]
        render(<PriceCalculator pizzas={pizzas} prices={prices}/>);

        const totalElement = await screen.findByText('Total: £39.50');

        expect(totalElement).toBeInTheDocument();
    })
})