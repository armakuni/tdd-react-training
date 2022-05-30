import { render, screen } from "@testing-library/react"
import PriceCalculator from './PriceCalculator'


describe('PriceCalculator', () => {
    const prices = {sizes: [{size: 'large', price: 15}, 
    {size: 'medium', price: 10}], 
toppings: [{topping: "mushroom", price: 1}, 
{topping: "anchovy", price: 2}, 
{topping: "pepperoni", price: 2.5}]}
const pizzas = [{size: 'large', toppings: ['mushroom']}]

    it('renders total price for single pizza', async () => {
        const pizzas = [{size: 'large', toppings: []}]
        render(<PriceCalculator pizzas={pizzas} prices={prices}/>);

        const totalElement = await screen.findByText('Total: £15');

        expect(totalElement).toBeInTheDocument();
    })

    it('renders total price for multiple pizzas', async() => {
        const pizzas = [{size: 'large', toppings: []}, {size: 'medium', toppings: []}]
        render(<PriceCalculator pizzas={pizzas} prices={prices}/>);

        const totalElement = await screen.findByText('Total: £25');

        expect(totalElement).toBeInTheDocument();
    })

    it('renders total price for pizza with mushroom topping', async() => {
        const pizzas = [{size: 'large', toppings: ['mushroom']}]
        render(<PriceCalculator pizzas={pizzas} prices={prices}/>);

        const totalElement = await screen.findByText('Total: £16');

        expect(totalElement).toBeInTheDocument();
    })
})