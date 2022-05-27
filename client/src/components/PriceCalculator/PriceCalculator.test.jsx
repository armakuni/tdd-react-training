import { render, screen } from "@testing-library/react"
import PriceCalculator from './PriceCalculator'


describe('PriceCalculator', () => {
    it('renders total price for single pizza', async () => {
        const prices = [{size: 'large', price: 15}]
        const pizzas = [{size: 'large'}]
        render(<PriceCalculator pizzas={pizzas} prices={prices}/>);

        const totalElement = await screen.findByText('Total: £15');

        expect(totalElement).toBeInTheDocument();
    })

    it('renders total price for multiple pizzas', async() => {
        const prices = [{size: 'large', price: 15}, {size: 'medium', price: 10}]
        const pizzas = [{size: 'large'}, {size: 'medium'}]
        render(<PriceCalculator pizzas={pizzas} prices={prices}/>);

        const totalElement = await screen.findByText('Total: £25');

        expect(totalElement).toBeInTheDocument();
    })
})