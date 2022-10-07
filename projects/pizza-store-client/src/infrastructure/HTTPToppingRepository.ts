/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { Topping } from '../model/entities/Topping';
import { FetchToppings } from '../model/entities/ToppingRepository';
// eslint-disable-next-line arrow-body-style
export const fetchToppings: FetchToppings = async () => {
  // TODO Fetch from the toppings API
  const response = await axios.get<Topping[]>('http://localhost:5001/toppings');
  return response.data;
};
