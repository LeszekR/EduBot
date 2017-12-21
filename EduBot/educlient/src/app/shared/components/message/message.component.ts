import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalModule, ModalDirective } from 'ngx-bootstrap';
import { MessageService } from './message.service';
import { TranslateService } from '../../../languages';

@Component ({
  moduleId: module.id,
  selector: 'message-modal',
  templateUrl: 'message.component.html',
  styles: [
    `
        .message-dialog .modal-title {
            display: inline;
        }
        
        .message-dialog .modal-title span {
            vertical-align: middle;
            padding-right: 5px;
        }
    `
    ]

})
export class MessageComponent implements OnInit {
    @ViewChild('lgModal') lgModal: ModalDirective;

    config: MessageWindowConfiguration;

    private _confirmElement:any;
    private _cancelButton:any;
    private _okButton:any;
    private _textInput:any;
    
    constructor(
        private messageService: MessageService,
        private translate: TranslateService  
    ) {
        this.bindWindowTypes();
        this.config = new MessageWindowConfiguration();
    }

    ngOnInit() {
        console.log("Ng on init");
        this._cancelButton = document.getElementById('cancelButton');
        this._okButton = document.getElementById('okButton');
    }

    bindWindowTypes() {
        this.messageService.confirm = this.confirm.bind(this);
        this.messageService.error = this.error.bind(this);
    }

    confirm(message: string, title: string) {
        this.config.okButtonVisible = true;
        this.config.cancelButtonVisible = true;
        return this.activate(message, title);
    }

    error(message: string, title: string = this.translate.instant("message.error")) {
        this.config.okButtonVisible = true;
        this.config.cancelButtonVisible = false;
        return this.activate(message, title);
    }

    activate(message: string, title: string) {
        this.config.title = title;
        this.config.message = message;

        let promise = new Promise<any>(resolve => {
            this._show(resolve);
        });
        return promise;
    }
    
    private _show(resolve:(res: any) => any) {
        console.log("Show");

        let negativeOnClick = (e:any) => resolve(false);
        let positiveOnClick = (e:any) => resolve(true);

        this._cancelButton.onclick = ((e:any) => {
            e.preventDefault();
            if (!negativeOnClick(e)) this._hideDialog();
        })

        this._okButton.onclick = ((e:any) => {
            e.preventDefault();
            if (!positiveOnClick(e)) this._hideDialog()
        });
      
        this.lgModal.config.backdrop = 'static';
        this.lgModal.show();
    }

    private _hideDialog() {
        this.lgModal.hide();
    }

}

class MessageWindowConfiguration {
    title: string;
    message: string;
    okButtonVisible: boolean;
    cancelButtonVisible: boolean;
}