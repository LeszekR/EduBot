import {Injectable} from '@angular/core';

@Injectable()
export class MessageService {
    public confirm: (message: string, title: string) => Promise<boolean>;
    public error: (message: string, title: string) => Promise<boolean>;
    public info:  (message: string, title: string) => Promise<boolean>;
}