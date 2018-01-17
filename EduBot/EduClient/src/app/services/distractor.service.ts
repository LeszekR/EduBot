import { Injectable, Output, EventEmitter } from '@angular/core';

// Model
import { Distractor } from '../models/distractor';

export enum DistractorType{
    SmallExplosion,
    MediumExplosion,
    BigExplosion,
    DisarmedMine,
    HiddenMine,
    Promotion,
    WheelOfFortune,
    CardsDraw
}
// ==================================================================================================================

@Injectable()
export class DistractorService {

  @Output() onShowDistrctor = new EventEmitter<DistractorType>();

  public show(type: DistractorType): void {
      this.onShowDistrctor.emit(type);
  }

}