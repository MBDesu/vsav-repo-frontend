import { Match } from './match';

export interface RetrieveMatchesResponse {
  totalResults: number;
  matches: Array<Match>;
}
