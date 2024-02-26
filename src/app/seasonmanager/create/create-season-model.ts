import { Betoffice } from 'src/app/betoffice-json/model/betoffice-data-model';

export class CreateSeasonModel {

    readonly seasonTypes: Array<string> = ['CL', 'CUP', 'EC', 'LEAGUE', 'UEFACUP', 'WC'];
    readonly teamTypes: Array<string> = ['DFB', 'FIFA'];

    submitted = false;
    season: Rest.SeasonJson = {
        id: 0,
        name: '',
        openligaLeagueSeason: '',
        openligaLeagueShortcut: '',
        currentRoundId: 0,
        teamType: 'DFB',
        seasonType: 'LEAGUE',
        rounds: [],
        year: ''
    };

}
