import { StateContext, Selector, State, Action } from '@ngxs/store';
import { ShowSpinner, HideSpinner } from './spinner.action';
import { Injectable } from '@angular/core';

export class SpinnerStateModel {
  public enabled: boolean = false;
  public loading: boolean = false;
}
@Injectable()
@State<SpinnerStateModel>({
  name: 'spinner',
  defaults: {
    enabled: false,
    loading: true,
  },
})
export class SpinnerState {
  @Selector()
  public static enabled(state: SpinnerStateModel): boolean {
    return state.enabled;
  }
  @Selector()
  public static loading(state: SpinnerStateModel): boolean {
    return state.loading;
  }

  @Action(ShowSpinner)
  show({ patchState }: StateContext<SpinnerStateModel>) {
    patchState({
      loading: true,
      enabled: true,
    });
  }

  @Action(HideSpinner)
  hide({ patchState }: StateContext<SpinnerStateModel>) {
    patchState({
      loading: false,
      enabled: false,
    });
  }
}
