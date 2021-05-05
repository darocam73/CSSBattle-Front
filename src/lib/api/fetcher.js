import { TOKEN_KEY } from '../constants';

const getError = async (response) => {
  if (response.headers.get('Content-Type')?.includes('application/json')) {
    const data = await response.json();
    return new Error(`Error: ${data}`);
  }
  return new Error(response.text() || response.statusText);
};

const fetcher = async ({ url, options = {} }) => {
  const { method = 'GET', body: rawBody } = options;
  const hasBody = Boolean(rawBody);
  const token = localStorage.getItem(TOKEN_KEY);
  const body = hasBody ? JSON.stringify(rawBody) : undefined;
  const headers = {
    ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { 'Authorization': `Bearer ${token}`} : {}),
  };
  const response = await fetch(`${process.env.REACT_APP_HOST_URL}/${url}`, {
    method,
    body,
    headers,
  });
  if (response.ok) {
    const { data } = await response.json();
    return data;
  }
  throw await getError(response);
};

export { fetcher };