import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import dayjs from "dayjs";
import { Subject } from "rxjs";
import { LogEventModel } from "../../../model/logEvent/logEvent.model";
import { LogEventService } from "../../../services/log-event.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import { DataTableDirective } from "angular-datatables";
import { DialogComponent } from "../../../shared/components/dialog/dialog.component";
import { DialogBoxComponent } from "../../../shared/components/dialog-box/dialog-box.component";


@Component({
  selector: "ngx-view-serilog-event",
  templateUrl: "./view-serilog-event.component.html",
  styleUrls: ["./view-serilog-event.component.scss"],
})
export class ViewSerilogEventComponent implements OnInit {
  viewSerilogForm: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  logList: LogEventModel[] = [];
  pFromDate: any;
  pToDate: any;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  date = new Date();
  firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  lastDay = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);


  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _logEventService: LogEventService,
    private dialog: MatDialog,

  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
    };
    this.CreateForm();
    this.getAllLog();
  }

  getAllLog() {
    // this._logEventService.getLogEvent().subscribe(
    //   (res: any) => {
    //     this.logList = res as LogEventModel[];
    //     this.dtTrigger.next();
    //     console.log("Log", this.logList);
    //   },
    //   () => {
    //     this._toasterService.danger(
    //       "Something went wrong !! Please try again",
    //       "Error"
    //     );
    //   }
    // );

    let fDate = dayjs(this.firstDay).format('DD-MMM-YY');
    let tDate = dayjs(this.lastDay).format('DD-MMM-YY');
    
    this._logEventService
      .getLogEventByDate(fDate, tDate)
      .subscribe(
        (res: any) => {
          if (res.length == 0) {
            this._toasterService.danger(
              "No Data Found !! Please try again",
              "Failed"
            );
            return;
          } else {
            this.logList = res as LogEventModel[];
            this.dtTrigger.next();
          }
        },
        () => {
          this._toasterService.danger(
            "Something went wrong !! Please try again",
            "Error"
          );
        }
      );

  }

  findLogByDate() {
    if (
      this.viewSerilogForm.value.fDate == null ||
      this.viewSerilogForm.value.tDate == null
    ) {
      this._toasterService.danger("Please fill all Information!.", "Failed");
      return;
    }

    this._logEventService
      .getLogEventByDate(this.pFromDate, this.pToDate)
      .subscribe(
        (res: any) => {
          if (res.length == 0) {
            this._toasterService.danger(
              "No Data Found !! Please try again",
              "Failed"
            );
            return;
          } else {
            this.logList = res as LogEventModel[];
            
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
            });
            this.dtTrigger.next();
            
          }
        },
        () => {
          this._toasterService.danger(
            "Something went wrong !! Please try again",
            "Error"
          );
        }
      );
  }

  deleteByDate(){
    if (
      this.viewSerilogForm.value.fDate == null ||
      this.viewSerilogForm.value.tDate == null
    ) {
      this._toasterService.danger("Please fill all Information!.", "Failed");
      return;
    }

    this._logEventService
      .deleteLogEventByDate(this.pFromDate, this.pToDate)
      .subscribe(
        (res: any) => {
          if(res == 1){
            this.reRender();
            this._toasterService.danger("Delete Successfull", "Delete");
          }
          else{
            this._toasterService.danger("Delete Failed!", "Delete");
          }
        },
        () => {
          this._toasterService.danger(
            "Something went wrong !! Please try again",
            "Error"
          );
        }
      );
  }

  deleteLogEvent(id: number){    
    const ref=  this.dialog.open(ConfirmDialogComponent, {
      position:{top:"50px"},
      width:"400px",
      data:{title:"Log",message:"Are you want to delete?"},
      panelClass: [
        "animate__animated",
        "animate__slideInTop",
        "dialog_width_change",
      ],
    });
      ref.afterClosed().subscribe(result => {
        if (result) {
          this._logEventService.deleteLog(id).subscribe(res =>{
          if(res == 1){
            this.reRender();
            this._toasterService.danger("Delete Successfull", "Delete");
          }
          else{
            this._toasterService.danger("Delete Failed!", "Delete");
          }
        });
        }
    });
  }



  showMessage(event: string){
    const ref=  this.dialog.open(DialogBoxComponent, {
      position:{top:"50px"},
      width:"90%",
      height:"80%",
      data:{title:"Log Event",message:event},
      panelClass: [
        "animate__animated",
        "animate__slideInTop",
        "dialog_width_change",
      ],
    });
  }

  fromDateChange(event: Date) {
    this.pFromDate = dayjs(event).format("DD-MMM-YY");
  }

  toDateChange(event: Date) {
    this.pToDate = dayjs(event).format("DD-MMM-YY");
  }

  CreateForm() {
    this.viewSerilogForm = this._fb.group({
      fDate: [, [Validators.required]],
      tDate: [, [Validators.required]],
    });
  }

  get f() {
    return this.viewSerilogForm.controls;
  }
  get formVal() {
    return this.viewSerilogForm.value;
  }

  
  //#region Reload Page
  private reRender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getAllLog();
    });
  }
  //#endregion

  refresh(){
    this.CreateForm();
    this.reRender();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
