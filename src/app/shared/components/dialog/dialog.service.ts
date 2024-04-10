import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "./dialog.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  public openDialog(component: any, data: any, width: string) {
    let dialogRef = this.dialog.open(DialogComponent, {
      position: { top: "0", right: "0" },
      height: "100%",
      width: width,
      data: {
        component: component,
        data: data,
      },
      autoFocus: false,
      panelClass: [
        "animate__animated",
        "animate__slideInRight",
        "dialog_width_change",
      ],
    });

    return dialogRef;
  }

  public closeDialog(dialogRef: any) {
    document
      .getElementsByClassName("animate__animated")[0]
      .classList.remove("animate__slideInRight");
    document
      .getElementsByClassName("animate__animated")[0]
      .classList.add("animate__slideOutRight");

    setTimeout(() => {
      dialogRef.close();
    }, 1000);
  }
}
