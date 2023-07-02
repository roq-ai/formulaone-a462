import axios from 'axios';
import queryString from 'query-string';
import { TimerInterface, TimerGetQueryInterface } from 'interfaces/timer';
import { GetQueryInterface } from '../../interfaces';

export const getTimers = async (query?: TimerGetQueryInterface) => {
  const response = await axios.get(`/api/timers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTimer = async (timer: TimerInterface) => {
  const response = await axios.post('/api/timers', timer);
  return response.data;
};

export const updateTimerById = async (id: string, timer: TimerInterface) => {
  const response = await axios.put(`/api/timers/${id}`, timer);
  return response.data;
};

export const getTimerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/timers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTimerById = async (id: string) => {
  const response = await axios.delete(`/api/timers/${id}`);
  return response.data;
};
