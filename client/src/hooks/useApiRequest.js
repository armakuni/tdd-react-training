import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ConfigContext from '../ConfigContext';

async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw !axios.isAxiosError(err)
      ? 'An unknown error occurred'
      : (err.response.data);
  }
}

export default function useApiRequest(path) {
  const { apiUrl } = useContext(ConfigContext);

  const [state, setState] = useState({
    state: 'loading',
  });

  useEffect(() => {
    function setLoaded(data) {
      setState({ state: 'loaded', data });
    }

    function setError(message) {
      setState({ state: 'error', error: message });
    }

    fetchData(`${apiUrl}${path}`).then(setLoaded).catch(setError);
  }, [apiUrl, path]);

  return state;
}
