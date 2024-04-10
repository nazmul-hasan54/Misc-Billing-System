import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { ExampleService } from '../../Service/example.service';
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: 'ngx-office-stuff-create',
  templateUrl: './office-stuff-create.component.html',
  styleUrls: ['./office-stuff-create.component.scss']
})
export class OfficeStuffCreateComponent implements OnInit {

  form = new FormGroup({
    officeStuffName: new FormControl("", Validators.required),
    designation: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
    isActive: new FormControl(1),
  });


  constructor(
    public dialogRef: MatDialogRef<OfficeStuffCreateComponent>,
    private exampleService: ExampleService,
    private toastr: NbToastrService
  ) { }

  ngOnInit(): void {
  }


  onSave() {
    if (!this.form.valid) return;

    var data = this.form.value;
    // data.parentId =
    //   data.isParent === true
    //     ? null
    //     : data.parentId !== undefined
    //       ? data.parentId.key
    //       : null;
    

    this.exampleService.saveStuffInfo(data).subscribe(
      (res) => {
        this.close();
        this.toastr.success(res.message, "Success");
      },
      (err) => {
        this.toastr.danger("An error occurred, Please try again", "Error");
        console.log(err);
      }
    );
  }
  close() {
    document
      .getElementsByClassName("animate__animated")[0]
      .classList.remove("animate__slideInRight");
    document
      .getElementsByClassName("animate__animated")[0]
      .classList.add("animate__slideOutRight");

    setTimeout(() => {
      this.dialogRef.close();
    }, 1000);
  }

}
