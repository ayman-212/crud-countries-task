import { Injectable } from '@angular/core';
import {Store} from '@ngxs/store';
import { Subject } from 'rxjs';
import {ShowSpinner,HideSpinner} from './state/spinner.action'

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private _store:Store) { }

  isLoading = new Subject<boolean>();
  requestsCount = 0;
  public show() {
    this.requestsCount++;
    this._store.dispatch(new ShowSpinner);
  }
  public hide() {
    this.requestsCount--;
    if (this.requestsCount === 0) this._store.dispatch(new HideSpinner);
  }
}
