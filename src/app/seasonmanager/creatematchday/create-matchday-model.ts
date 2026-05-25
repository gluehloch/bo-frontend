export type CreateMatchdayGameModel = {
    groupId?: number;
    dateTime: string;
    homeTeamId?: number;
    guestTeamId?: number;
};

export class CreateMatchdayModel {
    seasons: Rest.SeasonJson[] = [];
    selectedSeason?: Rest.SeasonJson;
    groups: Rest.GroupTypeJson[] = [];
    selectedGroup?: Rest.GroupTypeJson;
    seasonGroupTeam?: Rest.SeasonGroupTeamJson;

    roundDateTime = '';
    games: CreateMatchdayGameModel[] = [];

    submitted = false;
    processing = false;
    errorMessage = '';
    successMessage = '';
}
