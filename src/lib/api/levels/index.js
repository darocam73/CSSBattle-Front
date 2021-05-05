import { fetcher } from '../fetcher';

const getAllLevels = async (battleId) => await fetcher({
  url: `battle/${battleId}/levels`,
});

const getLevelById = async (id) => await fetcher({
  url: `level/${id}`,
});

export { getAllLevels, getLevelById };