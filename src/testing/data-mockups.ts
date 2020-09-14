import { RetrieveMatchesResponse } from '../app/models/retrieve-matches-response';
import { Match } from '../app/models/match';
import { characters } from '../app/models/constants';

export class DataMockupUtil {

  static generateMockRetrieveMatchesResponse(n: number, p1?: string, p2?: string): RetrieveMatchesResponse {
    const responseMatches = new Array<Match>();
    for (let i = 0; i < n; i++) {
      responseMatches.push({
        playerOneName: p1 || this.generateRandomAsciiString(10),
        playerOneChar: this.getRandomVsavCharacter(),
        playerTwoName: p2 || this.generateRandomAsciiString(10),
        playerTwoChar: this.getRandomVsavCharacter(),
        matchId: this.generateRandomNumber(0, 9999),
        video: this.generateRandomNumber(0, 9999),
        youtubeTimestamp: '00h00m00s'
      });
    }
    return { matches: responseMatches, totalResults: n };
  }

  private static generateRandomNumber(low: number, high: number): number {
    return Math.floor(Math.random() * (high - low + 1) + low);
  }

  private static generateRandomAsciiString(length: number) {
    let randomString = '';
    for (let i = 0; i < length; i++) {
      randomString += String.fromCharCode(this.generateRandomNumber(48, 123));
    }
    return randomString;
  }

  private static getRandomVsavCharacter(): string {
    return characters[this.generateRandomNumber(0, characters.length - 1)];
  }

}