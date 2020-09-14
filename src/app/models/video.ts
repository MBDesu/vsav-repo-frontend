import { Metadata } from './metadata';
import { Match } from './match';

export interface Video {
  videoId: number;
  youtubeId: string;
  metadata: Metadata;
  matches: Array<Match>;
}
