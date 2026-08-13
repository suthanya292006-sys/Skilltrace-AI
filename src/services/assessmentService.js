import { assessmentCatalog, getAssessmentById } from '../utils/assessmentDummyData';

export async function getAssessmentCatalog() {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(assessmentCatalog), 600);
  });
}

export async function getAssessment(id) {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(getAssessmentById(id)), 500);
  });
}
