import { render, screen } from "@testing-library/react"
import PriceCalculator, { calculatePizzaCost } from './PriceCalculator'

const prices = {sizes: [{size: 'large', price: 15, toppingPriceMultiplier: 2}, 
{size: 'medium', price: 10, toppingPriceMultiplier: 1.5},
{size: 'small', price: 5, toppingPriceMultiplier: 1},
{size: '', price: 0}], 
toppings: [{id: 1, name: 'mushroom', price: 0.5}, 
{id: 2, name: 'anchovy', price: 1}, 
{id: 3, name: 'pepperoni', price: 1.5},
{id: 4, name: 'ham', price: 1.5},
{id: 5, name: 'olives', price: 0.5},
{id: 6, name: 'chillis', price: 1},
{id: 7, name: 'artichoke', price: 2},
{id: 8, name: 'chicken', price: 2},
{id: 9, name: 'egg', price: 1.5}]}

describe('PriceCalculator', () => {

const pizzas = [{size: 'large', toppings: ['mushroom']}]

function renderPriceCalculator(pizzas) {
    render(<PriceCalculator pizzas={pizzas} prices={prices} />);
}

    it('renders total price for single pizza', async () => {
        const pizzas = [{size: 'large', toppings: []}]
        renderPriceCalculator(pizzas);

        const totalElement = await screen.findByText('Total: £15.00');

        expect(totalElement).toBeInTheDocument();
    })

    it('renders total price for multiple pizzas', async() => {
        const pizzas = [{size: 'large', toppings: []}, {size: 'medium', toppings: []}]
        renderPriceCalculator(pizzas);

        const totalElement = await screen.findByText('Total: £25.00');

        expect(totalElement).toBeInTheDocument();
    })

    it('renders total price for pizza with mushroom topping', async() => {
        const pizzas = [{size: 'large', toppings: [2]}]
        renderPriceCalculator(pizzas);

        const totalElement = await screen.findByText('Total: £17.00');

        expect(totalElement).toBeInTheDocument();
    })

    it('renders total price for single pizza with multiple toppings', async() => {
        const pizzas = [{size: 'large', toppings: [1, 3]}]
        renderPriceCalculator(pizzas);

        const totalElement = await screen.findByText('Total: £19.00');

        expect(totalElement).toBeInTheDocument();
    })

    it('renders total price for multiple pizzas with multiple toppings', async() => {
        const pizzas = [{size: 'large', toppings: [3]},
        {size: 'medium', toppings: [1, 3, 2]},
        {size: 'small', toppings: [1, 3]}]
        renderPriceCalculator(pizzas);

        const totalElement = await screen.findByText('Total: £38.75');

        expect(totalElement).toBeInTheDocument();
    })
})

describe('calculatePizzaCost', () => {

    const size = 'large';
  
    it('calculates price for single pizza with no toppings', () => {
        const pizza = {size: size, toppings: []}
        expect(calculatePizzaCost(prices)(pizza)).toEqual(15)
    })

    it('calculates price for single pizza', () => {
        const pizza = {size: size, toppings: [1,2]}
        expect(calculatePizzaCost(prices)(pizza)).toEqual(18)
    })

    it('calculates price for no pizza', () => {
        const pizza = {size: '', toppings: []}
        expect(calculatePizzaCost(prices)(pizza)).toEqual(0)
    })

    it('calculates price for no pizza but with toppings', () => {
        const pizza = {size: '', toppings: [1,2,3]}
        expect(calculatePizzaCost(prices)(pizza)).toEqual(0)
    })

    it('calculates price for pizza with 3 for 2 toppings on 3 toppings', () => {
        const pizza = {size: 'medium', toppings: [1,2,3]};
        expect(calculatePizzaCost(prices)(pizza)).toEqual(13.75)
    })

    it('calculates price for pizza with 3 for 2 toppings on 5 toppings', () => {
        const pizza = {size: 'medium', toppings: [1,2,3,5,6]};
        expect(calculatePizzaCost(prices)(pizza)).toEqual(16)
    })

    it('calculates price for pizza with multiple 3 for 2 toppings', () => {
        const pizza = {size: 'large', toppings: [1,2,3,4,5,6]};
        expect(calculatePizzaCost(prices)(pizza)).toEqual(25)
    })
}) 

