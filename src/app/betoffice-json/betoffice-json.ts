// Generated using typescript-generator version 1.14.251 on 2018-05-12 17:16:11.

declare namespace Rest {
    type PageParam = {
        page: number;
        size: number;
    }

    type Slice = {
        number: number;
        size: number;
        numberOfElements: number;
    }

    type Page<CONTENT_TYPE> = Slice & {
        totalPages: number;
        totalElements: number;
        content: CONTENT_TYPE[];
    }

    type CommunityJson = {
        id: number;
        shortName: string;
        name: string;
        year: string;
        communityManager: UserJson;
        season: SeasonJson;
    }

    type GameJson = AbstractOpenligaid & {
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

    type GoalType = 'REGULAR' | 'PENALTY' | 'OVERTIME' | 'OWNGOAL';
    
    type GoalJson = {
        playerName: string;
        minute: number;
        goalType: Rest.GoalType;
        gameResult: GameResultJson;
    }

    type GameDetailsJson = GameJson & {
        goals: GoalJson[];
    }

    type GameResultJson = Serializable & {
        homeGoals: number;
        guestGoals: number;
    }

    type GameTippJson = {
        nickname: string;
        tipp: GameResultJson;
        points: number;
    }

    type GroupTeamTableJson = {
        groupTypeJson: GroupTypeJson;
        teamResultJsons: TeamResultJson[];
    }

    type GroupTypeJson = AbstractOpenligaid & {
        name: string;
        type: 'LEAGUE' | 'PRELIMINARY_ROUND' | 'KNOCKOUT_ROUND' | 'SEMI_FINAL' | 'FINAL';
    }

    type HistoryTeamVsTeamJson = {
        teamVsTeamJsons: TeamVsTeamJson[];
    }

    type PartyJson = AbstractIdentifier & Serializable & {
        nickname: string;
        name: string;
        surname: string;
        mail: string;
        phone: string;
        password: string;
        title: string;
    }

    type RoundAndTableJson = {
        roundJson: RoundJson;
        groupTeamTableJsons: GroupTeamTableJson;
    }

    type RoundJson = AbstractIdentifier & {
        seasonId: number;
        seasonName: string;
        seasonYear: string;
        dateTime: Date;
        index: number;
        lastRound: boolean;
        tippable: boolean;
        games: GameJson[];
    }

    type SeasonJson = AbstractIdentifier & Serializable & {
        name: string;
        year: string;
        seasonType: string;
        teamType: string;
        openligaLeagueShortcut: string;
        openligaLeagueSeason: string;
        currentRoundId: number;
        rounds: RoundJson[];
    }

    type SeasonMemberJson = AbstractIdentifier & {
        nickname: string;
    }

    type SecurityTokenJson = TokenJson & {
        nickname: string;
        role: string;
        loginTime: string;
    }

    type SubmitTippGameJson = Serializable & {
        gameId: number;
        tippResult: GameResultJson;
    }

    type SubmitTippRoundJson = Serializable & {
        nickname: string;
        roundId: number;
        submitTippGames: SubmitTippGameJson[];
    }

    type TeamType = 'DFB' | 'FIFA';

    type TeamJson = AbstractOpenligaid & {
        name: string;
        longName: string;
        shortName: string;
        xshortName: string;
        logo: string;
        type: TeamType;
    }

    type TeamResultJson = Serializable & {
        team: TeamJson;
        posGoals: number;
        negGoals: number;
        win: number;
        lost: number;
        remis: number;
        tablePosition: number;
    }

    type TeamVsTeamJson = {
        homeTeamName: string;
        guestTeamName: string;
        matchDate: string;
        homeTeamGoals: number;
        guestTeamGoals: number;
    }

    type TokenJson = Serializable & {
        token: string;
    }

    type UserJson = AbstractIdentifier & {
        nickname: string;
        win: number;
        toto: number;
        ticket: number;
        points: number;
        position: number;
    }

    type UserTableJson = {
        season: SeasonJson;
        round: RoundJson;
        users: UserJson[];
    }

    type AbstractOpenligaid = AbstractIdentifier & OpenligaObject & {
    }

    type Serializable = {
    }

    type AbstractIdentifier = {
        id: number;
    }

    type OpenligaObject = {
        openligaid: number;
    }

    type GroupTeamJson = {
        groupType: GroupTypeJson;
        teams: TeamJson[];
    }

    type SeasonGroupTeamJson = {
        season: SeasonJson;
        groupTeams: GroupTeamJson[];
    }

}
