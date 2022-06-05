import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ConfigContext from '../ConfigContext';

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

async function fetchData<ResponseType>(url: string): Promise<ResponseType> {
  try {
    const response = await axios.get<ResponseType>(url);
    return response.data;
  } catch (err) {
    throw !axios.isAxiosError(err)
      ? 'An unknown error occurred'
      : ((err as { response: { data: string } }).response.data);
  }
}

export default function useApiRequest<ResponseType>(path: string): Response<ResponseType> {
  const { apiUrl } = useContext(ConfigContext);

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

    fetchData<ResponseType>(`${apiUrl}${path}`).then(setLoaded).catch(setError);
  }, [apiUrl, path]);

  return state;
}
