import { Betoffice } from 'src/app/betoffice-json/model/betoffoce-data-model';

export class UpdateSeasonModel {

    readonly seasonTypes: Array<string> = ['CL', 'CUP', 'EC', 'LEAGUE', 'UEFACUP', 'WC'];
    readonly teamTypes: Array<string> = ['DFB', 'FIFA'];

    submitted = false;
    season: Rest.SeasonJson = {
        id: 0,
        name: '',
        year: '',
        openligaLeagueSeason: '',
        openligaLeagueShortcut: '',
        currentRoundId: 0,
        teamType: 'DFB',
        seasonType: 'LEAGUE',
        rounds: [],
    };

    teamsByGroup: Map<Rest.GroupTypeJson, Array<Rest.TeamJson>> = new Map();

    constructor() {
        this.season = new Betoffice.SeasonModel();
    }

}
