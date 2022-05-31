import { render, screen } from "@testing-library/react"
import PriceCalculator, { calculatePizzaCost } from './PriceCalculator'

const prices = {sizes: [{size: 'large', price: 15, toppingPriceMultiplier: 2}, 
{size: 'medium', price: 10, toppingPriceMultiplier: 1.5},
{size: 'small', price: 5, toppingPriceMultiplier: 1},
{size: '', price: 0}], 
toppings: [{topping: "mushroom", price: 0.5}, 
{topping: "anchovy", price: 1}, 
{topping: "pepperoni", price: 1.5}]}

describe('PriceCalculator', () => {

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

describe('calculatePizzaCost', () => {

    const size = 'large';
  const topping = [{id: 1, name: 'pepperoni', price: 2}, {id: 2, name: 'mushroom', price: 0.5}];
  
    it('calculates price for single pizza with no toppings', () => {
        const pizza = {size: size, toppings: []}
        expect(calculatePizzaCost(prices)(pizza)).toEqual(15)
    })

    it('calculates price for single pizza', () => {
        const pizza = {size: size, toppings: topping.map(x => x.name)}
        expect(calculatePizzaCost(prices)(pizza)).toEqual(19)
    })

    it('calculates price for no pizza', () => {
        const pizza = {size: '', toppings: []}
        expect(calculatePizzaCost(prices)(pizza)).toEqual(0)
    })

    it('calculates price for no pizza but with toppings', () => {
        const pizza = {size: '', toppings: ['mushroom']}
        expect(calculatePizzaCost(prices)(pizza)).toEqual(0)
    })
}) 