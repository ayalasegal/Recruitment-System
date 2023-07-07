export interface AggregationData {
    count: number;
    averageCognitiveTestScore: number | null;
    averagePersonalityTestScore: number | null;
    maxCognitiveTestScore: number | null;
    maxPersonalityTestScore: number | null;
    minCognitiveTestScore: number | null;
    minPersonalityTestScore: number | null;
    passedInterview: number;
    failedInterview: number;
    passedReliabilityTest: number;
    failedReliabilityTest: number;
    passedTask: number;
    failedTask: number;
    receivedJobOffer: number;
    rejectedJobOffer: number;
    employed: number;
    unemployed: number;
    averageRating: number;
    minRating: number;
    maxRating: number;
    maxTotalScore: number;
    minTotalScore: number;
    averageTotalScore: number;
  }
  