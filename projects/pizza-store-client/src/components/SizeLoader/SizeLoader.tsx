import { ReactElement } from 'react';
import useLoader from '../../hooks/useLoader';
import { FetchSizes } from '../../model/SizeRepository';

interface SizeLoaderProps {
  fetchSizes: FetchSizes;
  children: (sizes: string[]) => ReactElement;
}

export default function SizeLoader({ fetchSizes, children }: SizeLoaderProps) {
  const sizes = useLoader(fetchSizes);

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
