import { Component, OnInit, Input } from '@angular/core';
import { NavigationRouterService } from '../navigationrouter.service';

import { RegistrationService, RegistrationJson, ValidationCode } from './registration.service';

class InputFieldModel {
    name: string;
    value: string;
    message: string;
    invalid = false;
    valid = false;

    setMessage(message: string) {
        this.message = message;
        this.valid = false;
        this.invalid = !this.valid;
    }

    setOk() {
        this.message = null;
        this.valid = true;
        this.invalid = !this.valid;
    }
}

enum ProgressState {
    Init = 0,
    TransmissionStart = 25,
    TransmissionEnd = 75,
    TransmissionEvaluated = 100
}

enum FormState {
    Init = 0,
    Valid = 1,
    TransmissionStart = 2,
    TransmissionOk = 3,
    TransmissionError = 4
}

class RegistrationModel {

    progressState: ProgressState;
    formState: FormState;

    name: InputFieldModel;
    firstname: InputFieldModel;
    nickname: InputFieldModel;
    password: InputFieldModel;
    password2: InputFieldModel;
    email: InputFieldModel;
    community: InputFieldModel;

    acceptEmail = false;
    acceptEmailInvalid = false;
    acceptCookie = false;
    acceptCookieInvalid = false;

    constructor() {
        this.progressState = ProgressState.Init;
        this.formState = FormState.Init;

        this.name = new InputFieldModel();
        this.firstname = new InputFieldModel();
        this.nickname = new InputFieldModel();
        this.password = new InputFieldModel();
        this.password2 = new InputFieldModel();
        this.email = new InputFieldModel();
        this.community = new InputFieldModel();
    }

    setNameMessage(message: string) {
        this.name.setMessage(message);
    }

    setNameOk() {
        this.name.setOk();
    }

    setFirstnameMessage(message: string) {
        this.firstname.setMessage(message);
    }

    setFirstnameOk() {
        this.firstname.setOk();
    }

    setNicknameMessage(message: string) {
        this.nickname.setMessage(message);
    }

    setNicknameOk() {
        this.nickname.setOk();
    }

    setPasswordMessage(message: string) {
        this.password.setMessage(message);
    }

    setPasswordOk() {
        this.password.setOk();
    }

    setPassword2Message(message: string) {
        this.password2.setMessage(message);
    }

    setPassword2Ok() {
        this.password2.setOk();
    }

    setEmailMessage(message: string) {
        this.email.setMessage(message);
    }

    setEmailOk() {
        this.email.setOk();
    }

    setCommunityMessage(message: string) {
        this.community.setMessage(message);
    }

    setCommunityOk() {
        this.community.setOk();
    }

    setMissingAcceptCookie(invalid: boolean) {
        this.acceptCookieInvalid = invalid;
    }

    setMissingAcceptEmail(invalid: boolean) {
        this.acceptEmailInvalid = invalid;
    }

    isInvalid() {
        return this.name.invalid
            || this.nickname.invalid
            || this.firstname.invalid
            || this.password.invalid
            || this.community.invalid
            || this.email.invalid
            || this.acceptCookieInvalid
            || this.acceptEmailInvalid;
    }

    isValid() {
        return !this.isInvalid();
    }

    reset() {
        this.name.value = '';
        this.firstname.value = '';
        this.nickname.value = '';
        this.password.value = '';
        this.password2.value = '';
        this.community.value = '';
        this.email.value = '';
    }

    resetMessages() {
        this.name.message = '';
        this.firstname.message = '';
        this.nickname.message = '';
        this.password.message = '';
        this.community.message = '';
        this.email.message = '';
    }

    resetInvalid() {
        this.name.valid = false;
        this.name.invalid = false;

        this.nickname.valid = false;
        this.nickname.invalid = false;

        this.firstname.valid = false;
        this.firstname.invalid = false;

        this.password.valid = false;
        this.password.invalid = false;
        this.password2.valid = false;
        this.password2.invalid = false;

        this.community.valid = false;
        this.community.invalid = false;

        this.email.valid = false;
        this.email.invalid = false;

        this.acceptEmailInvalid = false;
        this.acceptCookieInvalid = false;
    }
}

class ValidationCodeToInputFieldMapper {
    validationCode: ValidationCode;
    setMessage: () => void;
}

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    EnumFormState = FormState;
    EnumProgressState = ProgressState;

    registrationModel: RegistrationModel;

    constructor(private navigationRouterService: NavigationRouterService,
        private registrationService: RegistrationService) {
    }

    ngOnInit() {
        this.init();
        this.navigationRouterService.activate(NavigationRouterService.ROUTE_LOGIN);
    }

    init() {
        this.registrationModel = new RegistrationModel();
    }

    validateNickname() {
        if (this.registrationModel.nickname.value) {
            this.registrationModel.setNicknameOk();
        } else {
            this.registrationModel.setNicknameMessage('Der Nickname fehlt.');
        }
    }

    validatePassword() {
        if (!this.registrationModel.password.value) {
            this.registrationModel.setPasswordMessage('Das Passwort fehlt.');
        } else if (!this.registrationModel.password2.value) {
            this.registrationModel.setPassword2Message('Die Passwort Wiederholung fehlt.');
        } else if (this.registrationModel.password.value !== this.registrationModel.password2.value) {
            this.registrationModel.setPassword2Message('Die Passwörter sind nicht gleich.');
            console.log('Form validation: Different passwords.');
        } else {
            this.registrationModel.setPasswordOk();
            this.registrationModel.setPassword2Ok();
        }
    }

    validateName() {
        if (this.registrationModel.name.value) {
            this.registrationModel.setNameOk();
        } else {
            this.registrationModel.setNameMessage('Der Name fehlt.');
        }
    }

    validateFirstname() {
        if (this.registrationModel.firstname.value) {
            this.registrationModel.setFirstnameOk();
        } else {
            this.registrationModel.setFirstnameMessage('Der Vorname fehlt.');
        }
    }

    validateEmail() {
        if (this.registrationModel.email.value) {
            this.registrationModel.setEmailOk();
        } else {
            this.registrationModel.setEmailMessage('Die Email Adresse fehlt.');
        }
    }

    validateCommunity() {
        if (this.registrationModel.community.value) {
            this.registrationModel.setCommunityOk();
        } else {
            this.registrationModel.setCommunityMessage('Deine Wunsch Community fehlt.');
        }

    }

    validateAcceptCookie() {
        this.registrationModel.setMissingAcceptCookie(!this.registrationModel.acceptCookie);
    }

    validateAcceptEmail() {
        this.registrationModel.setMissingAcceptEmail(!this.registrationModel.acceptEmail);
    }

    validate() {
        this.registrationModel.resetMessages();

        this.validateNickname();
        this.validatePassword();
        this.validateName();
        this.validateFirstname();
        this.validateEmail();
        this.validateCommunity();
        this.validateAcceptCookie();
        this.validateAcceptEmail();
    }

    reset() {
        this.registrationModel.reset();
        this.registrationModel.resetMessages();
        this.registrationModel.resetInvalid();
    }

    startRegistration() {
        this.validate();

        if (this.registrationModel.isValid()) {
            // GUI: Kennzeichnung 'Start' der Transaktion.
            this.registrationModel.formState = FormState.TransmissionStart;
            this.registrationModel.progressState = ProgressState.TransmissionStart;

            const registration = new RegistrationJson();
            registration.name = this.registrationModel.name.value;
            registration.acceptCookie = this.registrationModel.acceptCookie;
            registration.acceptMail = this.registrationModel.acceptEmail;
            registration.applicationName = 'tippdiekistebier.de';
            registration.email = this.registrationModel.email.value;
            registration.firstname = this.registrationModel.firstname.value;
            registration.nickname = this.registrationModel.nickname.value;
            registration.password = this.registrationModel.password.value;
            registration.supplement = `{'community': '${this.registrationModel.community.value}'}`;

            this.registrationService.register(registration)
                .subscribe((registrationResponse: RegistrationJson) => {
                    if (registrationResponse.validationCodes.indexOf(ValidationCode.OK.name) !== -1) {
                        console.log('Registration request is accepted: ', registrationResponse);
                        // GUI: Kennzeichnung 'Ende' der Transaktion.
                        this.registrationModel.formState = FormState.TransmissionOk;
                        this.registrationModel.progressState = ProgressState.TransmissionEnd;
                    } else {
                        console.log('Registration request is rejected:', registrationResponse);
                        // GUI: Kennzeichnung 'Ende' der Transaktion.
                        this.registrationModel.formState = FormState.TransmissionError;
                        this.registrationModel.progressState = ProgressState.TransmissionEnd;

                        /*
                        ValidationCode.VALIDATON_CODES.forEach(code => {
                            // TODO
                            registrationResponse.validationCodes.indexOf(code.name);
                        });
                        */

                        const mapper = new Array<ValidationCodeToInputFieldMapper>();
                        mapper.push({
                            validationCode: ValidationCode.KNOWN_NICKNAME,
                            setMessage: () => {
                                this.registrationModel.nickname.message = 'Der Nickname ist bereits vergeben.';
                            }
                        });

                        const index = registrationResponse.validationCodes.indexOf(ValidationCode.KNOWN_NICKNAME.name);
                        if (index !== -1) {
                            this.mapValidationCode(ValidationCode.KNOWN_NICKNAME, () => {
                                this.registrationModel.setNicknameMessage('Der Nickname ist bereits vergeben.');
                            });
                        }

                    }
                });
        } else {
            console.log('Form is not valid.');
        }
    }

    private mapValidationCode(validationCode: ValidationCode, setMessage: () => void) {
        setMessage();
    }

}
