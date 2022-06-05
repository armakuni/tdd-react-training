import React, { ReactElement } from 'react';
import useApiRequest from '../../hooks/useApiRequest';

interface SizeLoaderProps {
  children: (sizes: string[]) => ReactElement;
}

export default function SizeLoader({ children }: SizeLoaderProps) {
  const sizes = useApiRequest<string[]>('/sizes');

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
