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
    seasonGroupTeam: Rest.SeasonGroupTeamJson | undefined;

    teamCandidates: Array<Rest.TeamJson> = [];
    selectedTeam: Rest.TeamJson | undefined;

    getTeamsOfGroup(groupType: Rest.GroupTypeJson): Rest.TeamJson[] {
        if (this.seasonGroupTeam) {
            const groupTeam = this.seasonGroupTeam.groupTeams.find(gt => gt.groupType.id === groupType.id);
            if (groupTeam) return groupTeam.teams;
        }

        return [];
    }
}