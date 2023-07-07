import axios from 'axios';
import { APPLICATION_API_BASE_URL } from '../external/url';
export const fetchApplications = async () => {
  const response = await axios.get(`${APPLICATION_API_BASE_URL}`);
  return response.data;
};

export const createApplication = async (applicationData: any) => {
  const response = await axios.post(`${APPLICATION_API_BASE_URL}`, applicationData);
  return response.data;
};

export const updateApplication = async (applicationId: string, applicationData: any) => {
  const response = await axios.put(`${APPLICATION_API_BASE_URL}/${applicationId}`, applicationData);
  return response.data;
};

export const deleteApplication = async (applicationId: string) => {
  await axios.delete(`${APPLICATION_API_BASE_URL}/${applicationId}`);
};

export const fetchApplicationById = async (applicationId: string) => {
  const response = await axios.get(`${APPLICATION_API_BASE_URL}/${applicationId}`);
  return response.data;
};
