import axios from 'axios';
import { Topping } from '../model/entities/Topping';
import { FetchToppings } from '../model/entities/ToppingRepository';

// eslint-disable-next-line import/prefer-default-export
export const fetchToppings: FetchToppings = async () => {
  const response = await axios.get<Topping[]>('http://localhost:5001/toppings');
  return response.data;
};
