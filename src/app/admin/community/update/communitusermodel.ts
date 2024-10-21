import { CheckableParty } from "./checkable-party";

export class CommunityModel {

    /** all users not associated with the selected season */
    potentialParties: Array<CheckableParty> = [];

    /** all uses associated with the selected season */
    parties: Array<CheckableParty> = [];

    /** Filter to sort out not wanted users */
    potentialUserFilter = '';

}