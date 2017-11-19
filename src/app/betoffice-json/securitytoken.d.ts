// Generated using typescript-generator version 1.14.251 on 2017-11-18 19:32:16.

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
        tipps: GameTippJson[];
    }

    interface GameResultJson extends Serializable {
        homeGoals: number;
        guestGoals: number;
    }

    interface GameTippJson {
        nickname: string;
        tipp: GameResultJson;
        points: number;
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

    interface PartyJson extends AbstractIdentifier, Serializable {
        nickname: string;
        name: string;
        surname: string;
        mail: string;
        phone: string;
        password: string;
        title: string;
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
        tippable: boolean;
        games: GameJson[];
    }

    interface SeasonJson extends AbstractIdentifier, Serializable {
        name: string;
        year: string;
        seasonType: string;
        teamType: string;
        openligaLeagueShortcut: string;
        openligaLeagueSeason: string;
        rounds: RoundJson[];
    }

    interface SeasonMemberJson extends AbstractIdentifier {
        nickname: string;
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
        roundId: number;
        submitTippGames: SubmitTippGameJson[];
    }

    interface TeamJson extends AbstractOpenligaid {
        name: string;
        longName: string;
        shortName: string;
        xshortName: string;
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
