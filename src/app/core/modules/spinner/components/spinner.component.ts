import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SpinnerState } from '../state/spinner.state';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  constructor() { }

  @Select(SpinnerState.enabled) public isEnabled$:Observable<boolean>

  ngOnInit(): void {
  }

}
