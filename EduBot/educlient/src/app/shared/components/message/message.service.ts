import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

enum MessageType {
    success,
    info,
    warning,
    danger
}

export class MessageData{
    constructor(public msg: string, public type: string, public title: string){}
}

@Injectable()
export class MessageService {

    constructor(){}

    messageSource: Subject<MessageData> = new Subject<MessageData>();

    success(msg: string, title?: string): void{
        this.add(msg, MessageType.success, title);
    }

    info(msg: string, title?: string): void{
        this.add(msg, MessageType.info, title);
    }

    warning(msg: string, title?: string): void{
        this.add(msg, MessageType.warning, title);
    }

    error(msg: string, title?: string): void{
        this.add(msg, MessageType.danger, title);
    }

    private add(msg: string, type: MessageType, title: string) {
        let message = new MessageData(msg, MessageType[type], title);
        this.messageSource.next(message);
    }
   
}