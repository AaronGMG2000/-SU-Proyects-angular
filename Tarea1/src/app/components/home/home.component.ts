import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name: string = ""
  enableText = false;
  constructor() {
    this.name = ""
    this.enableText = false
  }

  ngOnInit(): void {
    // ngOnInit
  }

  changeEnableText() {
    this.enableText = !this.enableText
  }


}
