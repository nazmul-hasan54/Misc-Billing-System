import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "ngx-audio-permission",
  templateUrl: "./audio-permission.component.html",
  styleUrls: ["./audio-permission.component.scss"],
})
export class AudioPermissionComponent implements OnInit {
  message: string;
  constructor(
    public dialogRef: MatDialogRef<AudioPermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data;
  }

  ngOnInit(): void {}

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
