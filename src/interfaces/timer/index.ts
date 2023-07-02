import { RaceInterface } from 'interfaces/race';
import { GetQueryInterface } from 'interfaces';

export interface TimerInterface {
  id?: string;
  time: any;
  race_id?: string;
  created_at?: any;
  updated_at?: any;

  race?: RaceInterface;
  _count?: {};
}

export interface TimerGetQueryInterface extends GetQueryInterface {
  id?: string;
  race_id?: string;
}
