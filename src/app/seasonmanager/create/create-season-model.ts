import { SeasonType, TeamType } from './../../betoffice-json/betofficetype';

export class CreateSeasonModel {

  readonly seasonTypes: Array<string> = ['CL', 'CUP', 'EC', 'LEAGUE', 'UEFACUP', 'WC'];
  readonly teamTypes: Array<string> = ['DFB', 'FIFA'];

  submitted: boolean = false;
  season: Rest.SeasonJson;

}
