import axios from 'axios';
import queryString from 'query-string';
import { RaceInterface, RaceGetQueryInterface } from 'interfaces/race';
import { GetQueryInterface } from '../../interfaces';

export const getRaces = async (query?: RaceGetQueryInterface) => {
  const response = await axios.get(`/api/races${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRace = async (race: RaceInterface) => {
  const response = await axios.post('/api/races', race);
  return response.data;
};

export const updateRaceById = async (id: string, race: RaceInterface) => {
  const response = await axios.put(`/api/races/${id}`, race);
  return response.data;
};

export const getRaceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/races/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRaceById = async (id: string) => {
  const response = await axios.delete(`/api/races/${id}`);
  return response.data;
};
