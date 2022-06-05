import React from 'react';
import useApiRequest from '../../hooks/useApiRequest';

export default function SizeLoader({ children }) {
  const sizes = useApiRequest('/sizes');

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
