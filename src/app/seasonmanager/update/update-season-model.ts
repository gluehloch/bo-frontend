import { Betoffice } from 'src/app/betoffice-json/model/betoffoce-data-model';
import { CheckableParty } from '../../admin/community/update/checkable-party';

export class UpdateSeasonModel {

  readonly seasonTypes: Array<string> = ['CL', 'CUP', 'EC', 'LEAGUE', 'UEFACUP', 'WC'];
  readonly teamTypes: Array<string> = ['DFB', 'FIFA'];

  submitted = false;
  season: Rest.SeasonJson;

  constructor() {
    this.season = new Betoffice.SeasonModel();
  }

}
