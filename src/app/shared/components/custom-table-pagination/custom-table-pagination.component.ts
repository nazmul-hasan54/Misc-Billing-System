import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { TableColumn } from "../../models/tableColumn";

@Component({
  selector: "ngx-custom-table-pagination",
  templateUrl: "./custom-table-pagination.component.html",
  styleUrls: ["./custom-table-pagination.component.scss"],
})
export class CustomTablePaginationComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: any;
  @Input() columns: Array<TableColumn>;
  @Input() dataset: Array<any> = [];
  @Input() total: number;
  @Input() currentPage: number;
  @Input() pageSize: number;
  @Output() onDialogOpen = new EventEmitter();
  @Output() onPageChange = new EventEmitter<PageEvent>();

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  //pageSize: number = 10;
  //currentPage: number = 0;
  searchBy: string = "";
  data: Array<any> = [];
  highlightedRows = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.dataset?.currentValue) {
      this.dataSource = new MatTableDataSource<any>(
        changes?.dataset.currentValue
      );
    }
    if (changes?.total?.currentValue) {
      this.total = changes.total.currentValue;
    }
    if (changes?.currentPage?.currentValue) {
      this.currentPage = changes.currentPage.currentValue;
    }

    if (changes?.pageSize?.currentValue) {
      this.pageSize = changes.pageSize.currentValue;
    }
  }

  ngOnInit(): void {
    this.displayedColumns = this.displayedColumns.concat(
      this.columns.map((x) => x.columnDef)
    ); // pre-fix static
  }

  openDialog(rowData: any) {
    this.onDialogOpen.emit(rowData);
  }

  onPageChangeFromCustomTable(page: PageEvent) {
    this.onPageChange.emit(page);
    this.currentPage = page.pageIndex;
    this.pageSize = page.pageSize;
  }

  mouseOverIndex = -1;
  rowHighlightIndex = -1;

  public onMouseOver(index) {
    this.mouseOverIndex = index;
    this.rowHighlightIndex = -1;
  }
  public onMouseOut() {
    this.mouseOverIndex = -1;
  }

  public highlight(index) {
    this.rowHighlightIndex = index;
  }

}
