import { fetcher } from '../fetcher';

const getMatchingImageValue = async ({ challengeId, html, css }) => await fetcher({
  url: 'solution/compare',
  options: {
    method: 'POST',
    body: { challengeId, html, css },
  }
});

const submitSolution = async ({ challengeId, battleId, html, css }) => await fetcher({
  url: 'solution',
  options: {
    method: 'POST',
    body: { challengeId, battleId, html, css },
  }
});

const downloadImage = async ({ html, css }) => await fetcher({
  url: 'solution/download',
  options: {
    method: 'POST',
    body: { html, css },
  }
});

export { getMatchingImageValue, submitSolution, downloadImage };