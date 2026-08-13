import { portfolioAnalysisData } from '../utils/portfolioAnalysisData';

export async function getPortfolioAnalysis() {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve(portfolioAnalysisData);
    }, 900);
  });
}
