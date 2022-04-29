import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {



  @Input() data: any[];
  @Input() selectData: any;
  @Input() field: string;
  @Input() required: boolean;
  @Input() name: string;
  @Input() placeholder: string;
  @Output() onSelectData: EventEmitter<any> = new EventEmitter();
  filter: any[] = [];

  constructor() {
    this.data = [];
    this.selectData = [];
    this.field = "";
    this.required = false;
    this.name = "";
    this.placeholder = "";
  }
  ngOnInit(): void {
    //ngOnInit


  }
  filterData(event: any) {
    let filtered: any[] = [];
    let query = event.query;
    for (const element of this.data) {
      if (element[`${this.field}`].toString().toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(element);
      }
    }
    this.filter = filtered;
  }

  selectDataItem() {
    this.onSelectData.emit(this.selectData);
  }
}
