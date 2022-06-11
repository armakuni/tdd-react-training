import axios from 'axios';
import { Sauce } from '../model/entities/Sauce';
import { FetchSauces } from '../model/entities/SauceRepository';

// eslint-disable-next-line import/prefer-default-export
export const fetchSauces: FetchSauces = async () => {
  const response = await axios.get<Sauce[]>('http://localhost:5001/sauces');
  return response.data;
};
