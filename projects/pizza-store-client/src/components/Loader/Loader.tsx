import { ReactElement } from 'react';
import useLoader from '../../hooks/useLoader';

export type LoadFunction<ReturnType> = () => Promise<ReturnType>

interface LoaderProps<ReturnType> {
  loader: LoadFunction<ReturnType>;
  children: (data: ReturnType) => ReactElement;
}

export default function Loader<ReturnType>({ loader, children }: LoaderProps<ReturnType>): ReactElement {
  const result = useLoader(loader);

  switch (result.state) {
    case 'loaded':
      return children(result.data);
    case 'error':
      return <div>{result.error}</div>;
    case 'loading':
    default:
      return <div>Loading</div>;
  }
}
