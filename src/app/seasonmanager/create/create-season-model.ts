import { SeasonType, TeamType } from './../../betoffice-json/betofficetype';

export class CreateSeasonModel {

  seasonTypes: [SeasonType.CL, SeasonType.CUP, SeasonType.EC, SeasonType.LEAGUE, SeasonType.UEFACUP, SeasonType.WC];
  teamTypes: [TeamType.DFB, TeamType.FIFA];

  submitted: boolean;
  season: Rest.SeasonJson;

}
