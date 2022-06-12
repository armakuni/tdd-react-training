import { fetchSauces } from './infrastructure/HTTPSauceRepository';
import { fetchSizes } from './infrastructure/HTTPSizeRespository';
import { fetchToppings } from './infrastructure/HTTPToppingRepository';
import calculatePrice from './model/entities/calculatePrice';
import PriceListLoader from './model/entities/PriceListLoader';
import GetSauces from './model/usecases/GetSauces';
import GetSizes from './model/usecases/GetSizes';
import GetToppings from './model/usecases/GetToppings';
import SummarisePizza from './model/usecases/SummarisePizza';
import { UseCases } from './ui/App';

export default function setupUseCases(): UseCases {
  const priceLoader = new PriceListLoader(fetchSizes, fetchToppings);

  const getSizesUseCase = new GetSizes(fetchSizes);
  const getSaucesUseCase = new GetSauces(fetchSauces);
  const getToppingsUseCase = new GetToppings();
  const summarisePizzaUseCase = new SummarisePizza(() => priceLoader.load(), calculatePrice);

  return {
    getSizes: () => getSizesUseCase.execute(),
    getSauces: () => getSaucesUseCase.execute(),
    getToppings: () => getToppingsUseCase.execute(),
    summarisePizza: (pizza) => summarisePizzaUseCase.execute(pizza),
  };
}
