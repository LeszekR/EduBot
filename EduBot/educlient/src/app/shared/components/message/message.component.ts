import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ModalModule, ModalDirective } from 'ngx-bootstrap';
import { MessageService, MessageData } from './message.service';


@Component ({
  moduleId: module.id,
  selector: 'message-modal',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.css']
})
export class MessageComponent implements OnDestroy {
    @ViewChild('staticModal') modal: ModalDirective;

    private message: MessageData;
    private messageSubsciption: any;

    constructor(private service: MessageService ) {
        this.messageSubsciption = this.service.messageSource.subscribe(m => this.show(m));
    }

    private show(message: MessageData) {
        this.message = message;
        this.modal.show();
    }

    private closeModal(){
        this.modal.hide();
        this.message = null;
    }

    private getAlertClass(): string{
        return this.message ? 'alert-' + this.message.type : '';
    }

    ngOnDestroy(){
        this.messageSubsciption.unsubscribe();
    }
}