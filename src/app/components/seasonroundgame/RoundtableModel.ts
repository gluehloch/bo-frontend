import { Betoffice } from "../../betoffice-json/model/betoffice-data-model";

type State = 'prepare' | 'ready';

export class RoundtableModel {
    state: State = 'prepare';
    seasons: Rest.SeasonJson[];
    selectedSeason: Rest.SeasonJson | undefined;
    groups: Rest.GroupTypeJson[];
    selectedGroup: Rest.GroupTypeJson | undefined;
    rounds: Rest.RoundJson[];
    selectedRound: Rest.RoundJson | undefined;
    table: Rest.RoundAndTableJson | undefined;

    constructor() {
        this.seasons = [];
        this.selectedSeason = undefined;
        this.groups = [];
        this.selectedGroup = undefined;
        this.rounds = [];
        this.selectedRound = undefined;
        this.table = new Betoffice.RoundAndTableModel();
    }
};
