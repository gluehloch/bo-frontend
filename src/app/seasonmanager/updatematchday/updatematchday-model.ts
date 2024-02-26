import { Betoffice } from 'src/app/betoffice-json/model/betoffice-data-model';

export class UpdateMatchDayModel {

  readonly seasonTypes: Array<string> = ['CL', 'CUP', 'EC', 'LEAGUE', 'UEFACUP', 'WC'];
  readonly teamTypes: Array<string> = ['DFB', 'FIFA'];

  submitted = false;
  season: Rest.SeasonJson;

  /** all users not associated with the selected season */
  potentialParties: Array<Rest.SeasonMemberJson>;

  /** all uses associated with the selected season */
  parties: Array<Rest.SeasonMemberJson>;

  constructor() {
    this.season = new Betoffice.SeasonModel();
    this.potentialParties = [];
    this.parties = [];
  }

}
