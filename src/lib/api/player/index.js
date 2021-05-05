import { fetcher } from '../fetcher';

const getPlayer = async () => await fetcher({
  url: 'player/info',
});

const createPlayer = async ({ name }) => await fetcher({
  url: 'player',
  options: {
    method: 'POST',
    body: { name }
  }
});

export { createPlayer, getPlayer };