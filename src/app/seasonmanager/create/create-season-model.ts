import { SeasonType, TeamType } from './../../betoffice-json/betofficetype';

export class CreateSeasonModel {

  readonly seasonTypes: [SeasonType.CL, SeasonType.CUP, SeasonType.EC, SeasonType.LEAGUE, SeasonType.UEFACUP, SeasonType.WC];
  readonly teamTypes: ['DFB', 'FIFA'];

  submitted: boolean;
  season: Rest.SeasonJson;

}
