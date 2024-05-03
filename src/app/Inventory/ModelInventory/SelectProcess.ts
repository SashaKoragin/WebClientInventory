export class SelectProcess {
    constructor(IdProcess: number, UserLogin: string = null, PasswordUser: string = null) {
        this.idProcessField = IdProcess;
        this.userLoginField = UserLogin;
        this.passwordUserField = PasswordUser;
    }
    public idProcessField: number;
    public userLoginField: string;
    public passwordUserField: string;
}