import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/share';

export enum SpinnerMode {
    NONE,
    DEFAULT,
    SCREEN_ONLY
}

@Injectable()
export class SpinnerService {

  public mode: Subject<SpinnerMode> = new Subject();

  public start(mode?: SpinnerMode): void {
    this.mode.next(mode ? mode : SpinnerMode.DEFAULT);
  }

  public stop(): void {
    this.mode.next(SpinnerMode.NONE);
  }
}