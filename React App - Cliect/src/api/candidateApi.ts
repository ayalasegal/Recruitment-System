import axios from 'axios';
import { CANDIDATE_API_BASE_URL } from '../external/url';
export const fetchCandidates = async () => {
  const response = await axios.get(`${CANDIDATE_API_BASE_URL}`);
  return response.data;
};

export const createCandidate = async (candidateData: any) => {
  const response = await axios.post(`${CANDIDATE_API_BASE_URL}`, candidateData);
  return response.data;
};

export const updateCandidate = async (candidateId: string, candidateData: any) => {
  const response = await axios.put(`${CANDIDATE_API_BASE_URL}/${candidateId}`, candidateData);
  return response.data;
};

export const deleteCandidate = async (candidateId: string) => {
  await axios.delete(`${CANDIDATE_API_BASE_URL}/${candidateId}`);
};

export const fetchCandidateById = async (candidateId: string) => {
  const response = await axios.get(`${CANDIDATE_API_BASE_URL}/${candidateId}`);
  return response.data;
};
export const getCandidateById = async (candidateId:string) => {
  const response = await fetchCandidateById(candidateId);
  const candidate = response; // Assuming the response is the candidate object from the API
  return candidate;
};