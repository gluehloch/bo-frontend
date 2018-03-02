import { Component, ElementRef, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from './../modal/modal.service';

import * as $ from 'jquery';

@Component({
    moduleId: module.id,
    selector: 'app-authentication-warning',
    templateUrl: './authenticationwarning.component.html'
  })
export class AuthenticationWarningComponent implements OnInit, OnDestroy  {

  @Input() id: string;

  private element: jQuery;

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

  open() {
    // this.modalService.open(this.id);
    $('#confirmDeleteAction').modal();
  }

  close() {
    this.modalService.close(this.id);
    $('#confirmDeleteAction').modal();
  }

}
