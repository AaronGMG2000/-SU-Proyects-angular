import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  @Input() items: any
  @Input() cols: any
  @Input() loading: boolean
  @Input() totalRecords: number
  @Input() buttons: boolean[]
  @Output() onDelete = new EventEmitter<any>()
  @Output() onEdit = new EventEmitter<any>()
  @Output() onGet = new EventEmitter<any>()
  constructor() {
    this.loading = true
    this.totalRecords = 0

    this.buttons = [true, true, false]
  }
  ngOnInit(): void {
    //Init
  }

  deleteData = (value: any) => { this.onDelete.emit(value) }
  getData = (value: any) => { this.onGet.emit(value); }
  editData = (value: any) => { this.onEdit.emit(value) }

}
