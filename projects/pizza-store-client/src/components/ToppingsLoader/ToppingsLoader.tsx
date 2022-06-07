import { ReactElement } from 'react';
import useApiRequest from '../../hooks/useApiRequest';
import { Topping } from '../ToppingsSelector/ToppingsSelector';

interface ToppingsLoaderProps {
  children: (toppings: Topping[]) => ReactElement;
}

export default function ToppingsLoader({ children }: ToppingsLoaderProps) {
  const sizes = useApiRequest<Topping[]>('/toppings');

  switch (sizes.state) {
    case 'loaded':
      return children(sizes.data);
    case 'error':
      return <div>{sizes.error}</div>;
    case 'loading':
    default:
      return <div>Loading</div>;
  }
}
