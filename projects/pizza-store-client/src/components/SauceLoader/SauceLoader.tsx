import { ReactElement } from 'react';
import useApiRequest from '../../hooks/useApiRequest';

interface SauceLoaderProps {
  children: (sauces: string[]) => ReactElement;
}

export default function SauceLoader({ children }: SauceLoaderProps) {
  const sauces = useApiRequest<string[]>('/sauces');

  switch (sauces.state) {
    case 'loaded':
      return children(sauces.data);
    case 'error':
      return <div>{sauces.error}</div>;
    case 'loading':
    default:
      return <div>Loading</div>;
  }
}
