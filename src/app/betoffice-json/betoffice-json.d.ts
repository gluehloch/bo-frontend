// Generated using typescript-generator version 1.14.251 on 2017-01-21 20:28:32.

declare namespace Rest {

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

    interface RoundJson extends AbstractIdentifier {
        seasonId: number;
        seasonName: string;
        seasonYear: string;
        dateTime: Date;
        index: number;
        lastRound: boolean;
        games: GameJson[];
        tippable: boolean;
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

    interface TippGameJson extends Serializable {
        gameId: number;
        tippResult: GameResultJson;
    }

    interface TippRoundJson extends Serializable {
        nickname: string;
        token: string;
        roundId: number;
        tippGames: TippGameJson[];
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

    interface AbstractOpenligaid extends AbstractIdentifier, OpenligaObject {
    }

    interface Serializable {
    }

    interface AbstractIdentifier {
        id: number;
    }

    interface OpenligaObject {
        openligaid: number;
    }

}
