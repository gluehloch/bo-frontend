import { SeasonType, TeamType } from './../../betoffice-json/betofficetype';

export class UpdateSeasonModel {

  readonly seasonTypes: Array<string> = ['CL', 'CUP', 'EC', 'LEAGUE', 'UEFACUP', 'WC'];
  readonly teamTypes: Array<string> = ['DFB', 'FIFA'];

  submitted = false;
  season: Rest.SeasonJson;

  /** all users not associated with the selected season */
  potentialParties: Array<Rest.SeasonMemberJson>;

  /** all uses associated with the selected season */
  parties: Array<Rest.SeasonMemberJson> = [];

  /** Filter to sort out not wanted users */
  potentialUserFilter: string;

}
