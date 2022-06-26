
namespace Betoffice {

    const UNDEFINED_NUM= -1;

    export class Identifier implements Rest.AbstractIdentifier {
        id: number;

        constructor() {
            this.id = -1;
        }
    }
    export class AbstractOpenligaidModel implements Rest.AbstractOpenligaid {
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

    export class GroupTypeModel extends AbstractOpenligaidModel implements Rest.GroupTypeJson {
        name: string;

        constructor() {
            super();
            this.name = '';
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

    export class GameTippModel implements Rest.GameTippJson {
        nickname: string;
        tipp: GameResultModel;
        points: number;

        constructor() {
            this.nickname = '';
            this.tipp = new GameResultModel();
            this.points = 0;
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
        tipps: GameTippModel[];

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
            this.tipps = [];
        }
    }

    export class RoundModel extends Identifier implements Rest.RoundJson {
        seasonId: number;
        seasonName: string;
        seasonYear: string;
        dateTime: Date;
        index: number;
        lastRound: boolean;
        tippable: boolean;
        games: GameModel[];

        constructor() {
            super();
            this.seasonId = -1;
            this.seasonName = '';
            this.seasonYear = '';
            this.dateTime = new Date();
            this.index = -1;
            this.lastRound = false;
            this.tippable = false;
            this.games = [];
        }
    }

    export class SubmitTippGameModel implements Rest.SubmitTippGameJson {
        gameId: number;
        tippResult: GameResultModel;

        constructor() {
            this.gameId = -1;
            this.tippResult = new GameResultModel();
        }
    }

    export class TeamResultModel implements Rest.TeamResultJson {
        team: TeamModel;
        posGoals: number;
        negGoals: number;
        win: number;
        lost: number;
        remis: number;
        tablePosition: number;

        constructor() {
            this.team = new TeamModel();
        }
    }

    export class GroupTeamTableModel implements Rest.GroupTeamTableJson {
        groupTypeJson: GroupTypeModel;
        teamResultJsons: Rest.TeamResultJson[];
    }

    export class RoundAndTableModel implements Rest.RoundAndTableJson {
        roundJson: RoundModel;
        groupTeamTableJsons: Rest.GroupTeamTableJson;

    }

}