import { ReactElement } from 'react';
import useApiRequest from '../../hooks/useApiRequest';
import { Topping } from '../ToppingsSelector';

interface ToppingsLoaderProps {
  children: (toppings: Topping[]) => ReactElement;
}

export default function ToppingsLoader({ children }: ToppingsLoaderProps) {
  const toppings = useApiRequest<Topping[]>('/toppings');

  switch (toppings.state) {
    case 'loaded':
      return children(toppings.data);
    case 'error':
      return <div>{toppings.error}</div>;
    case 'loading':
    default:
      return <div>Loading</div>;
  }
}
