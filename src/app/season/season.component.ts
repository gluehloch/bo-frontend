import { Component, OnInit } from '@angular/core';

import { USERROLE } from '../user-role.enum';

import { SeasonService} from './season.service';
import { NavigationRouterService } from '../navigationrouter.service';

export class Roundtable {
  seasons: Rest.SeasonJson[];
  selectedSeason: Rest.SeasonJson;
  groups: Rest.GroupTypeJson[];
  selectedGroup: Rest.GroupTypeJson;
  rounds: Rest.RoundJson[];
  selectedRound: Rest.RoundJson;
  table: Rest.RoundAndTableJson;
};

@Component({
  selector: 'seasons',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

  roundtable: Roundtable;

  constructor(private seasonService: SeasonService, private navigationRouterService: NavigationRouterService) {
    this.roundtable = new Roundtable();
  }

  ngOnInit() {
    this.findSeasons();
  }

  private sortGames(games: Rest.GameJson[]): Rest.GameJson[] {
    return games.sort((g1, g2) => {
      const date1 = new Date(g1.dateTime);
      const date2 = new Date(g2.dateTime);
      return date1.getTime() - date2.getTime();
    });
  }

  findSeasons() {
    this.seasonService.findSeasons()
                      .subscribe((seasons: Rest.SeasonJson[]) => {
      this.navigationRouterService.activate(NavigationRouterService.ROUTE_MEISTERSCHAFTEN);
      this.roundtable.seasons = seasons.sort((s1, s2) => s2.id - s1.id);
      this.roundtable.selectedSeason = seasons[0];

      this.findGroups(this.roundtable.selectedSeason.id);
    });
  }

  findGroups(seasonId: number) {
    this.seasonService.findGroups(seasonId)
                      .subscribe((groups: Rest.GroupTypeJson[]) => {
      this.roundtable.groups = groups;
      this.roundtable.selectedGroup = groups[0];

      this.findRounds(this.roundtable.selectedSeason.id, this.roundtable.selectedGroup.id);
    });
  }

  findRounds(seasonId: number, groupId: number) {
    this.seasonService.findRounds(seasonId, groupId)
                      .subscribe((season: Rest.SeasonJson) => {
      this.roundtable.rounds = season.rounds;

      if (season.rounds != null && season.rounds.length > 0) {
        const now = new Date();
        let possibleSelectedRound = null;
        season.rounds.forEach(round => {
          const roundDate = new Date(round.dateTime);
          if (roundDate < now) {
            possibleSelectedRound = round;
          }
        });

        if (possibleSelectedRound != null) {
          this.roundtable.selectedRound = possibleSelectedRound;
        } else {
          this.roundtable.selectedRound = season.rounds[0];
        }
      }

      this.findRoundAndTable(this.roundtable.selectedRound.id, this.roundtable.selectedGroup.id);
    });
  }

  findRoundAndTable(roundId: number, groupId: number) {
    this.seasonService.findRound(roundId, groupId)
                      .subscribe((round: Rest.RoundAndTableJson) => {
      this.roundtable.table = round;
      this.roundtable.table.roundJson.games = this.sortGames(this.roundtable.table.roundJson.games);
    });
  }

  // ------------------------------------------------------------------------------

  seasonSelected(event) {
    console.info('Selected season id: ' + event.target.value);

    let selectedSeasonId = event.target.value;
    let selectedSeason = this.roundtable
                             .seasons
                             .find(season => season.id == selectedSeasonId);
    this.roundtable.selectedSeason = selectedSeason;
    this.findGroups(selectedSeasonId);
  }

  groupSelected(event) {
    console.info('Selected group id: ' + event.target.value);

    let selectedGroupId = event.target.value;
    let selectedGroup = this.roundtable
                            .groups
                            .find(group => group.id == selectedGroupId);
    this.roundtable.selectedGroup = selectedGroup;
    this.findRounds(this.roundtable.selectedSeason.id, selectedGroupId);
  }

  roundSelected(event) {
    console.info('Selected round id: ' + event.target.value);

    let selectedRound = this.roundtable
                            .rounds
                            .find(round => round.id == event.target.value);

    this.roundtable.selectedRound = selectedRound;
    this.findRoundAndTable(this.roundtable.selectedRound.id, this.roundtable.selectedGroup.id);
  }

  getColor(i: number) {
    if (i == 0) {
      return 'table-success';
    } else if (i >= 1 && i <= 3) {
      return 'table-info';
    } else if (i >= 4 && i <= 5) {
      return 'table-warning';
    } else if (i >= 15 && i <= 17) {
      return 'table-danger';
    }
  }
}
