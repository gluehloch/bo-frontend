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
    registrationModel: RegistrationModel;
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
    mapper = new Array<ValidationCodeToInputFieldMapper>();

    constructor(private navigationRouterService: NavigationRouterService,
        private registrationService: RegistrationService) {
    }

    ngOnInit() {
        this.init();
        this.navigationRouterService.activate(NavigationRouterService.ROUTE_LOGIN);
    }

    init() {
        this.registrationModel = new RegistrationModel();

        this.mapper.push({
            registrationModel: this.registrationModel,
            validationCode: ValidationCode.KNOWN_NICKNAME,
            setMessage: () => {
                this.registrationModel.nickname.setMessage('Der Nickname ist bereits vergeben.');
            }
        });

        this.mapper.push({
            registrationModel: this.registrationModel,
            validationCode: ValidationCode.UNKNOWN_APPLICATION,
            setMessage: () => {
                this.registrationModel.nickname.setMessage('Registrierungsapplikation ist nicht bekannt.');
            }
        });
    }

    validateNickname() {
        if (this.registrationModel.nickname.value) {
            this.registrationModel.nickname.setOk();
        } else {
            this.registrationModel.nickname.setMessage('Der Nickname fehlt.');
        }
    }

    validatePassword() {
        if (!this.registrationModel.password.value) {
            this.registrationModel.password.setMessage('Das Passwort fehlt.');
        } else if (!this.registrationModel.password2.value) {
            this.registrationModel.password2.setMessage('Die Passwort Wiederholung fehlt.');
        } else if (this.registrationModel.password.value !== this.registrationModel.password2.value) {
            this.registrationModel.password2.setMessage('Die Passwörter sind nicht gleich.');
            console.log('Form validation: Different passwords.');
        } else {
            this.registrationModel.password.setOk();
            this.registrationModel.password2.setOk();
        }
    }

    validateName() {
        if (this.registrationModel.name.value) {
            this.registrationModel.name.setOk();
        } else {
            this.registrationModel.name.setMessage('Der Name fehlt.');
        }
    }

    validateFirstname() {
        if (this.registrationModel.firstname.value) {
            this.registrationModel.firstname.setOk();
        } else {
            this.registrationModel.firstname.setMessage('Der Vorname fehlt.');
        }
    }

    validateEmail() {
        if (this.registrationModel.email.value) {
            this.registrationModel.email.setOk();
        } else {
            this.registrationModel.email.setMessage('Die Email Adresse fehlt.');
        }
    }

    validateCommunity() {
        if (this.registrationModel.community.value) {
            this.registrationModel.community.setOk();
        } else {
            this.registrationModel.community.setMessage('Deine Wunsch Community fehlt.');
        }
    }

    validateAcceptCookie() {
        this.registrationModel.acceptCookieInvalid = !this.registrationModel.acceptCookie;
    }

    validateAcceptEmail() {
        this.registrationModel.acceptEmailInvalid = !this.registrationModel.acceptEmail;
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

                        this.mapper.forEach(map => {
                            const index = registrationResponse.validationCodes.indexOf(map.validationCode.name);
                            if (index !== -1) {
                                map.setMessage();
                            }
                        })

                        /*
                        const index = registrationResponse.validationCodes.indexOf(ValidationCode.KNOWN_NICKNAME.name);
                        if (index !== -1) {
                            this.mapValidationCode(ValidationCode.KNOWN_NICKNAME, () => {
                                this.registrationModel.nickname.setMessage('Der Nickname ist bereits vergeben.');
                            });
                        }
                        */

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
