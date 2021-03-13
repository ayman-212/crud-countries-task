import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  @Input() public detailsName: string;
  @Input() public detailsValue: any;

  constructor() {}

  ngOnInit(): void {}
}
