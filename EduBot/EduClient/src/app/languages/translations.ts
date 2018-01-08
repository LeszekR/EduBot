import { OpaqueToken } from '@angular/core';

import { LANG_DE_NAME, LANG_DE_TRANS } from './langs/lang-de';
import { LANG_EN_NAME, LANG_EN_TRANS } from './langs/lang-en';
import { LANG_PL_NAME, LANG_PL_TRANS } from './langs/lang-pl';

export const TRANSLATIONS = new OpaqueToken('translations');

export const dictionary = {
	[LANG_DE_NAME]: LANG_DE_TRANS,
	[LANG_EN_NAME]: LANG_EN_TRANS,
	[LANG_PL_NAME]: LANG_PL_TRANS
};

export const TRANSLATION_PROVIDERS = [
	{ provide: TRANSLATIONS, useValue: dictionary },
];