import { EventEmitter, Injectable, Inject } from '@angular/core';
import { TRANSLATIONS } from './translations';

@Injectable()
export class TranslateService {
	public onLangChanged: EventEmitter<string> = new EventEmitter<string>();

	private _currentLang: string;
	private _defaultLang: string = 'en';
	private PLACEHOLDER: string = '%';
	
	public get currentLang() {
	  return this._currentLang || this._defaultLang;
	}

	constructor(@Inject(TRANSLATIONS) private _translations: any) {
		this.use(this.getLang());
	}

	private getLang(): string {
		var lang = localStorage.getItem('lang');
		if (!lang)
			lang = navigator.language;
		if (!lang)
			lang = this._defaultLang;
		return (lang == 'pl' || lang == 'de') ? lang : this._defaultLang;
	}

	public use(lang: string): void {
		localStorage.setItem('lang', lang);
		this._currentLang = lang;
		this.onLangChanged.emit(lang);
	}

	private translate(key: string): any {
		let translation = key;
    
        if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
			return this._translations[this.currentLang][key];
		}
		
		let split = translation.split(".");
		return split[split.length-1];
	}

	public instant(key: string, words?: string | string[]) {
		const translation: string = this.translate(key);
		if (!words) return translation;
		return this.replace(translation, words); 
	}

	public replace(text: string = '', words: string | string[] = '') {
    	let translation: string = text;

		const values: string[] = [].concat(words);
		values.forEach((e, i) => {
			translation = translation.replace(this.PLACEHOLDER.concat(<any>(i+1)), e);
		});

    	return translation;
	}
}