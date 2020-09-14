import { Video } from './video';

export interface RetrieveVideosResponse {
  totalResults: number;
  videos: Array<Video>;
}
