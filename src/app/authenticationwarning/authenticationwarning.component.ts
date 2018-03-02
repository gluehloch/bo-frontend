import { Component, ElementRef, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from './../modal/modal.service';

declare var jquery: any;
declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'app-authentication-warning',
    templateUrl: './authenticationwarning.component.html'
  })
export class AuthenticationWarningComponent implements OnInit, OnDestroy  {

  @Input() id: string;

  private element: any;
  private httpError: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = $(el.nativeElement);

    this.modalService.add(this);
  }

  ngOnInit() {
    // $('#confirmDeleteAction').modal();
  }

  ngOnDestroy() {
    // this.modalService.remove(this.id);
    // this.element.remove();
  }

  open(httpError: any) {
    this.httpError = httpError;
    // this.modalService.open(this.id);
    $('#confirmDeleteAction').modal();
  }

  close() {
    this.modalService.close(this.id);
    $('#confirmDeleteAction').modal();
  }

}
