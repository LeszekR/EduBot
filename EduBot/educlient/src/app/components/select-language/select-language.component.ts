import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../../languages/translate.service';

@Component({
    moduleId: module.id,
    selector: 'select-language',
    templateUrl: 'select-language.component.html',
    styleUrls: ['select-language.component.css']
})
export class SelectLanguageComponent {
    public supportedLangs = [
        { title: 'polski',  value: 'pl', flag: 'flag-icon-pl' },
        { title: 'deutsch', value: 'de', flag: 'flag-icon-de' },
        { title: 'English', value: 'en', flag: 'flag-icon-gb' }
    ];

    constructor(
        private translate: TranslateService
    ) { }
    
    selectLang(lang: string) {
        this.translate.use(lang);
    }
}