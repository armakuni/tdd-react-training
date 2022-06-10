import axios from 'axios';
import { Size } from '../model/Size';
import { FetchSizes } from '../model/SizeRepository';

// eslint-disable-next-line import/prefer-default-export
export const fetchSizes: FetchSizes = async () => {
  const response = await axios.get<Size[]>('http://localhost:5001/sizes');
  return response.data;
};
