import { fetcher } from '../fetcher';

const getBattleStatus = async (battleId) => await fetcher({
  url: `battle/${battleId}/status`,
});

const getAllBattles = async () => await fetcher({
  url: 'battle',
});

const getBattleById = async (battleId) => await fetcher({
  url: `battle/${battleId}`,
});

const startBattle = async (battleId) => await fetcher({
  url: `battle/${battleId}/start`,
  options: {
    method: 'PATCH'
  }
});

export { getBattleStatus, getAllBattles, getBattleById, startBattle };
