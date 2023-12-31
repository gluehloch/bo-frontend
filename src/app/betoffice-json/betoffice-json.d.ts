// Generated using typescript-generator version 1.14.251 on 2018-05-12 17:16:11.

declare namespace Rest {
    interface PageParam {
        page: number;
        size: number;
    }

    interface Slice {
        number: number;
        size: number;
        numberOfElements: number;
    }

    interface Page<CONTENT_TYPE> extends Slice {
        totalPages: number;
        totalElements: number;
        content: CONTENT_TYPE[];
    }

    interface CommunityJson {
        name: string;
        year: string;
        shortName: string;
        communityManager: UserJson;
        season: SeasonJson;
    }

    interface GameJson extends AbstractOpenligaid {
        index: number;
        roundId: number;
        dateTime: string;
        homeTeam: TeamJson;
        guestTeam: TeamJson;
        halfTimeResult: GameResultJson;
        result: GameResultJson;
        overtimeResult: GameResultJson;
        penaltyResult: GameResultJson;
        finished: boolean;
        ko: boolean;
        tipps: GameTippJson[];
    }

    interface GoalJson {
        playerName: string;
        minute: number;
        goalType: 'REGULAR' | 'PENALTY' | 'OVERTIME' | 'OWNGOAL';
        gameResult: GameResultJson;
    }

    interface GameDetailsJson extends GameJson {
        goals: GoalJson[];
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
        currentRoundId: number;
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
        team: TeamJson;
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

    interface GroupTeamJson {
        groupType: GroupTypeJson;
        teams: TeamJson[];
    }

    interface SeasonGroupTeamJson {
        season: SeasonJson;
        groupTeams: GroupTeamJson[];
    }

}
