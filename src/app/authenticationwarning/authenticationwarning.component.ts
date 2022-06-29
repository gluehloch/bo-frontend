import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService, ModalComponent } from './../modal/modal.service';

declare var jquery: any;
declare var $: any;

@Component({
    selector: 'app-authentication-warning',
    templateUrl: './authenticationwarning.component.html'
})
export class AuthenticationWarningComponent implements OnInit, OnDestroy, ModalComponent  {

    @ViewChild('authenticationWarningModal') authenticationWarningModal: any; 

    // Exampel or an input element
    // @Input() id: string;

    private static readonly ID = 'AuthenticationWarningComponent';
    private static readonly HTML_ELEMENT_ID = '#authenticationWarning';

    //private element: any;
    httpError: any;

    readonly id = AuthenticationWarningComponent.ID;

    constructor(private router: Router, private modalService: ModalService, private el: ElementRef) {
        //this.element = $(el.nativeElement);
    }

    ngOnInit() {
        this.modalService.add(this);
    }

    ngOnDestroy() {
        this.modalService.remove(this);
    }

    open(httpError: any) {
        this.httpError = httpError;
        $(AuthenticationWarningComponent.HTML_ELEMENT_ID).modal('show');
    }

    close() {
        $(AuthenticationWarningComponent.HTML_ELEMENT_ID).modal('hide');
    }

    gotoLoginDialog() {
        this.close();
        this.router.navigate(['./login']);
    }

    getId() {
        return this.id;
    }

}
