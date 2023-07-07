export interface Application {
    position: string;
    candidate:string
    cognitiveTestScore: number|null;
    personalityTestScore: number|null;
    hasInterview: boolean|null;
    hasReliabilityTest: boolean|null;
    hasTaskPassed: boolean|null;
    hasJobOffer: boolean|null;
    isEmployed: boolean|null;
    totalScore: number|null;
    rating:number;
    _id: string;
}