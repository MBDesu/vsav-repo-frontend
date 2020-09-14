import { Injectable, EventEmitter } from '@angular/core';
import { RetrieveUniquePlayersResponse } from './models/retrieve-unique-players-response';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // TODO: move almost all of this to player list service?

  playerList: Array<string>;
  playerListChanged: EventEmitter<Array<string>>;

  constructor(private http: HttpClient) {
    this.playerListChanged = new EventEmitter<Array<string>>();
    this.retrieveUniquePlayers();
  }

  playerListExists(): boolean {
    return this.playerList !== null && this.playerList !== undefined && this.playerList.length > 0;
  }

  playerListContains(player: string): boolean {
    if (!this.playerListExists()) {
      return false;
    }
    return this.playerList.indexOf(player) > -1;
  }

  checkForNewPlayers(playerOne: string, playerTwo: string): void {
    if (!(this.playerListContains(playerOne) && this.playerListContains(playerTwo))) {
      this.playerList = undefined;
      this.playerListChanged.emit(this.playerList);
      this.retrieveUniquePlayers();
    }
  }

  retrieveUniquePlayers(): void {
    this.http.get<RetrieveUniquePlayersResponse>(environment.RetrieveUniquePlayers).subscribe((players) => {
      this.playerList = players.players;
      this.playerListChanged.emit(this.playerList);
    });
  }

}
