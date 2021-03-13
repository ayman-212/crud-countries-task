import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-result-widget',
  templateUrl: './no-result-widget.component.html',
  styleUrls: ['./no-result-widget.component.scss'],
})
export class NoResultWidgetComponent implements OnInit {
  @Input() public errorMessage: string;

  constructor() {}

  ngOnInit(): void {}
}
