
declare namespace Betoffice {

    const UNDEFINED_NUM= -1;

    export class AbstractOpenligaidModel implements Rest.AbstractOpenligaid {
        id = UNDEFINED_NUM;
        openligaid = UNDEFINED_NUM;
    };


export class GameJsonModel implements Rest.GameJson {
    index = -1;
    roundId = -1;
    dateTime = '';
    homeTeam = TeamJson;
    guestTeam: TeamJson;
    halfTimeResult: GameResultJson;
    result: GameResultJson;
    overtimeResult: GameResultJson;
    penaltyResult: GameResultJson;
    finished: boolean;
    ko: boolean;
    tipps: GameTippJson[];
}


}