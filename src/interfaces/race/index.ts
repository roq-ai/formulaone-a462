import { TimerInterface } from 'interfaces/timer';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface RaceInterface {
  id?: string;
  name: string;
  date: any;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  timer?: TimerInterface[];
  organization?: OrganizationInterface;
  _count?: {
    timer?: number;
  };
}

export interface RaceGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
