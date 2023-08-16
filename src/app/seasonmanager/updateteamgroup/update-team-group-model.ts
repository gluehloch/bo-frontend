export class UpdateTeamGroupModel {
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

    selectableGroupTypes: Array<Rest.GroupTypeJson> = [];
    selectedGroupType: Rest.GroupTypeJson | undefined;

    groupTypes: Array<Rest.GroupTypeJson> = [];
    teamsByGroup: Map<Rest.GroupTypeJson, Array<Rest.TeamJson>> = new Map();

    seasonGroupTeam: Rest.SeasonGroupTeamJson | undefined;
}