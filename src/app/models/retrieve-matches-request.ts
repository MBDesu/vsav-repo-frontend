import { PaginatedApiRequest } from './paginated-api-request';

export interface RetrieveMatchesRequest extends PaginatedApiRequest {
  playerOneName: string;
  playerTwoName: string;
}
