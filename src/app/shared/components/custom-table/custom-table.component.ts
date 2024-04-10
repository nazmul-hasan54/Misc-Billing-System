import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { TableColumn } from "../../models/tableColumn";

@Component({
  selector: "ngx-custom-table",
  templateUrl: "./custom-table.component.html",
  styleUrls: ["./custom-table.component.scss"],
})
export class CustomTableComponent implements OnInit, OnChanges {
  @Input() columns: Array<TableColumn>;
  @Input() dataset: Array<any> = [];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<any>(
      changes?.dataset.currentValue
    );
  }

  ngOnInit(): void {
    // set table columns
    this.displayedColumns = this.displayedColumns.concat(
      this.columns.map((x) => x.columnDef)
    ); // pre-fix static
  }
}
