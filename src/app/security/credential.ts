export enum USER_ROLE {
    ADMIN,
    USER
};

export class Authentication {

    nickname: string;
    password: string;
    authenticate: boolean;
    rememberme: boolean;
    authenticationTries: number;
    sessionId: string;
    role: USER_ROLE = USER_ROLE.USER;

    constructor(nickname : string, role : USER_ROLE) {
        this.nickname = nickname;
        this.role = role;
    }

    isAdmin() {
        return this.role === USER_ROLE.ADMIN;
    }

}
