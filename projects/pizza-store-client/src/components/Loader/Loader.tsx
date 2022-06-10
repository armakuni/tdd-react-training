import { ReactElement } from 'react';
import useLoader from '../../hooks/useLoader';
import './Loader.css';

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
      return (
        <div className="loader-error">
          <div className="loader-error__title">An Error Occurred:</div>
          <div className="loader-error__message">{result.error}</div>
        </div>
      );
    case 'loading':
    default:
      return <div className="loader" data-testid="loader" />;
  }
}
