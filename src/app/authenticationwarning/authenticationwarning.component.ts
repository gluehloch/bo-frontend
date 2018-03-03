import { Component, ElementRef, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ModalService } from './../modal/modal.service';

declare var jquery: any;
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'app-authentication-warning',
    templateUrl: './authenticationwarning.component.html'
  })
export class AuthenticationWarningComponent implements OnInit, OnDestroy  {

    // Exampel or an input element
    // @Input() id: string;

    private static readonly ID = 'AuthenticationWarningComponent';
    private static readonly HTML_ELEMENT_ID = '#authenticationWarning';

    private element: any;
    private httpError: any;

    readonly id = AuthenticationWarningComponent.ID;

    constructor(private router: Router, private modalService: ModalService, private el: ElementRef) {
        this.element = $(el.nativeElement);
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


}
