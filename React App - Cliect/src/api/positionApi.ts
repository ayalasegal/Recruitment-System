import axios from "axios";
import { POSITION_API_BASE_URL } from "../external/url";

export const fetchPositions = async () => {
  const response = await axios.get(`${POSITION_API_BASE_URL}`);
  return response.data;
};

export const createPosition = async (positionData: any) => {
  const response = await axios.post(`${POSITION_API_BASE_URL}`, positionData);
  return response.data;
};

export const updatePosition = async (positionId: string, positionData: any) => {
  const response = await axios.put(
    `${POSITION_API_BASE_URL}/${positionId}`,
    positionData
  );
  return response.data;
};

export const deletePosition = async (positionId: string) => {
  await axios.delete(`${POSITION_API_BASE_URL}/${positionId}`);
};

export const fetchPositionById = async (positionId: string) => {
  const response = await axios.get(`${POSITION_API_BASE_URL}/${positionId}`);
  return response.data;
};

export const getPositionAggregateData = async (positionId: string) => {
  const response = await axios.get(
    `${POSITION_API_BASE_URL}/${positionId}/aggregate`
  );
  return response.data;
};
export const getPositionById = async (positionId: string) => {
  const response = await fetchPositionById(positionId);
  const position = response; // Assuming the response is the candidate object from the API
  return position;
};
