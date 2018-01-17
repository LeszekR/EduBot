import { Component, OnDestroy } from '@angular/core';
import { DistractorService, DistractorType } from '../../../services/distractor.service';

@Component({
    moduleId: module.id,
    selector: 'distractor-component',
    templateUrl: `./distractor.component.html`,
    styleUrls: ['distractor.component.css']
})
export class DistractorComponent implements OnDestroy {

    private KEY_ESC = 27;
    private IMG_PATH = '/assets/img/';

    private showDistractor: boolean;
    private distractorSubsciption: any;
    private imgSrc;

    constructor(private service: DistractorService) {
        this.distractorSubsciption = this.service.onShowDistrctor.subscribe(d => this.show(d));
    }

    ngOnDestroy(){
        this.distractorSubsciption.unsubscribe();
    }

    private show(type: DistractorType){
        this.imgSrc = this.getImgSrc(type);
        this.showDistractor = true;

        document.onkeydown = (e:any) => {
            if(e.which == this.KEY_ESC){
                this.hide();
            } 
        }
    }

    private hide(){
        this.imgSrc = null;
        this.showDistractor = false;
    }

    private getImgSrc(type: DistractorType): string{
        switch(type){
            case DistractorType.SmallExplosion:
                return this.IMG_PATH + "small-explosion.png";
            case DistractorType.MediumExplosion:
                return this.IMG_PATH + "medium-explosion.png";
            case DistractorType.BigExplosion:
                return this.IMG_PATH + "big-explosion.png";
            case DistractorType.DisarmedMine:
                return this.IMG_PATH + "disarmed.png";
            case DistractorType.HiddenMine:
                return this.IMG_PATH + "logo-pg.png";
            case DistractorType.Promotion:
                return this.IMG_PATH + "logo-pg.png";
            default: 
                return null;
        }
    }

}