import { CheckableParty } from './checkable-party';

export class UpdateSeasonModel {

  readonly seasonTypes: Array<string> = ['CL', 'CUP', 'EC', 'LEAGUE', 'UEFACUP', 'WC'];
  readonly teamTypes: Array<string> = ['DFB', 'FIFA'];

  submitted = false;
  season: Rest.SeasonJson;

  /** all users not associated with the selected season */
  potentialParties: Array<CheckableParty> = [];

  /** all uses associated with the selected season */
  parties: Array<CheckableParty> = [];

  /** Filter to sort out not wanted users */
  potentialUserFilter: string;

}
