// Generated using typescript-generator version 1.14.251 on 2017-03-15 08:40:59.

declare namespace Rest {

    interface AbstractRoundJson extends AbstractIdentifier {
        seasonId: number;
        seasonName: string;
        seasonYear: string;
        dateTime: Date;
        index: number;
        lastRound: boolean;
        tippable: boolean;
        games: GameJson[];
    }

    interface GameJson extends AbstractOpenligaid {
        index: number;
        dateTime: Date;
        homeTeam: TeamJson;
        guestTeam: TeamJson;
        halfTimeResult: GameResultJson;
        result: GameResultJson;
        overtimeResult: GameResultJson;
        penaltyResult: GameResultJson;
        finished: boolean;
    }

    interface GameResultJson extends Serializable {
        homeGoals: number;
        guestGoals: number;
    }

    interface GameTippJson extends GameJson {
        tipp: GameResultJson;
    }

    interface GroupTeamTableJson {
        groupTypeJson: GroupTypeJson;
        teamResultJsons: TeamResultJson[];
    }

    interface GroupTypeJson extends AbstractOpenligaid {
        name: string;
    }

    interface HistoryTeamVsTeamJson {
        teamVsTeamJsons: TeamVsTeamJson[];
    }

    interface RoundAndTableJson {
        roundJson: RoundJson;
        groupTeamTableJsons: GroupTeamTableJson;
    }

    interface RoundJson extends AbstractRoundJson {
    }

    interface SeasonJson extends AbstractIdentifier {
        name: string;
        year: string;
        seasonType: string;
        teamType: string;
        rounds: RoundJson[];
    }

    interface SecurityTokenJson extends TokenJson {
        nickname: string;
        role: string;
        loginTime: string;
    }

    interface SubmitTippGameJson extends Serializable {
        gameId: number;
        tippResult: GameResultJson;
    }

    interface SubmitTippRoundJson extends Serializable {
        nickname: string;
        token: string;
        roundId: number;
        submitTippGames: SubmitTippGameJson[];
    }

    interface TeamJson extends AbstractOpenligaid {
        name: string;
        longName: string;
        logo: string;
        type: string;
    }

    interface TeamResultJson extends Serializable {
        teamName: string;
        posGoals: number;
        negGoals: number;
        win: number;
        lost: number;
        remis: number;
        tablePosition: number;
    }

    interface TeamVsTeamJson {
        homeTeamName: string;
        guestTeamName: string;
        matchDate: string;
        homeTeamGoals: number;
        guestTeamGoals: number;
    }

    interface TeamsJson {
        teamJsons: TeamJson[];
    }

    interface TippRoundJson extends AbstractRoundJson {
        gameTipps: GameTippJson[];
    }

    interface TokenJson extends Serializable {
        token: string;
    }

    interface UserJson extends AbstractIdentifier {
        nickname: string;
        win: number;
        toto: number;
        ticket: number;
        points: number;
        position: number;
    }

    interface UserTableJson {
        season: SeasonJson;
        round: RoundJson;
        users: UserJson[];
    }

    interface AbstractIdentifier {
        id: number;
    }

    interface AbstractOpenligaid extends AbstractIdentifier, OpenligaObject {
    }

    interface Serializable {
    }

    interface OpenligaObject {
        openligaid: number;
    }

}
