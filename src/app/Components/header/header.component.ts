import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  darkMode: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  darkModeHandler() {
    if (!this.darkMode) {
      document
        .getElementsByTagName('html')[0]
        .setAttribute('data-theme', 'dark');
      this.darkMode = true;
    } else {
      document.getElementsByTagName('html')[0].setAttribute('data-theme', '');
      this.darkMode = false;
    }
  }
}
