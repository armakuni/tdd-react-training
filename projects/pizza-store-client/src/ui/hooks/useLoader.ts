import { useEffect, useState } from 'react';

interface BaseResponse {
  state: 'loading' | 'loaded' | 'error',
}

interface LoadingResponse extends BaseResponse {
  state: 'loading'
}

interface LoadedResponse<Response> extends BaseResponse {
  state: 'loaded'
  data: Response
}

interface ErrorResponse extends BaseResponse {
  state: 'error'
  error: string
}

type Response<ResponseType> = LoadingResponse | LoadedResponse<ResponseType> | ErrorResponse;

export default function useLoader<ResponseType>(load: () => Promise<ResponseType>): Response<ResponseType> {
  const [state, setState] = useState<Response<ResponseType>>({
    state: 'loading',
  });

  useEffect(() => {
    function setLoaded(data: ResponseType) {
      setState({ state: 'loaded', data });
    }

    function setError(message: string) {
      setState({ state: 'error', error: message });
    }

    load()
      .then(setLoaded)
      .catch((error: Error) => {
        setError(error.message);
      });
  }, [load]);

  return state;
}
