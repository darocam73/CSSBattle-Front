import { fetcher } from '../fetcher';

const getScores = async (battleId) => await fetcher({ url: `score/${battleId}` });

export { getScores };