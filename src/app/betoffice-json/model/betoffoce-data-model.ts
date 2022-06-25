
namespace Betoffice {

    const UNDEFINED_NUM= -1;

    export class AbstractOpenligaidModel implements AbstractOpenligaidModel {
        id: number;
        openligaid: number;

        constructor() {
            this.id = 0;
            this.openligaid = 0;
        }
    }

    export class TeamModel extends AbstractOpenligaidModel implements Rest.TeamJson {
        name: string;
        shortName: string;
        xshortName: string;
        longName: string;
        logo: string;
        type: string;

        constructor() {
            super();
            this.name = '';
            this.shortName = '';
            this.xshortName = '';
            this.longName = '';
            this.logo = '';
            this.type = '';
        }
    }

    export class GameResultModel implements Rest.GameResultJson {
        homeGoals: number;
        guestGoals: number;

        constructor() {
            this.homeGoals = 0;
            this.guestGoals = 0;
        }
    }

    export class GameModel extends AbstractOpenligaidModel implements Rest.GameJson {
        index: number;
        roundId: number;
        dateTime: string;
        homeTeam: TeamModel;
        guestTeam: TeamModel;
        halfTimeResult: GameResultModel;
        result: GameResultModel;
        overtimeResult: GameResultModel;
        penaltyResult: GameResultModel;
        finished: boolean;
        ko: boolean;
        tipps: GameTippJson[];

        constructor() {
            super();
            this.index = UNDEFINED_NUM;
            this.roundId = UNDEFINED_NUM;
            this.dateTime = '';
            this.homeTeam = new TeamModel();
            this.guestTeam = new TeamModel();
            this.halfTimeResult = new GameResultModel();
            this.result = new GameResultModel();
            this.overtimeResult = new GameResultModel();
            this.penaltyResult = new GameResultModel();
            this.finished = false;
            this.ko = false;
        }
    }


}