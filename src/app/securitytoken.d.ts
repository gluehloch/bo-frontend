// Generated using typescript-generator version 1.14.251 on 2017-01-21 12:56:53.

declare namespace Rest {

    export interface SecurityTokenJson extends TokenJson {
        nickname: string;
        role: string;
        loginTime: number;
    }

    export interface GameJson extends AbstractOpenligaid {
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

    export interface TokenJson extends Serializable {
        token: string;
    }

    export interface TeamJson extends AbstractOpenligaid {
        name: string;
        longName: string;
        logo: string;
        type: string;
    }

    export interface GameResultJson extends Serializable {
        homeGoals: number;
        guestGoals: number;
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
