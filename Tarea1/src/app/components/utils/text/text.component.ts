import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  @Input() variable: any;
  @Input() element: string;
  @Input() maxlength: string;
  @Input() type: string;
  @Input() readonly: boolean;
  @Input() name: string;
  @Input() required: boolean;
  @Input() text: string;
  constructor() {
    this.variable = "";
    this.maxlength = "20";
    this.type = "text";
    this.readonly = false;
    this.name = "";
    this.required = true;
    this.text = "";
    this.element = "";
  }

  ngOnInit(): void {
    //INIT
  }

}
