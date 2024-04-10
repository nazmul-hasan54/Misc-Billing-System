import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { ExampleService } from '../../Service/example.service';

@Component({
  selector: 'ngx-office-stuff-edit',
  templateUrl: './office-stuff-edit.component.html',
  styleUrls: ['./office-stuff-edit.component.scss']
})
export class OfficeStuffEditComponent implements OnInit {

  form = new FormGroup({
    officeStuffId: new FormControl(this.data.officeStuffId, Validators.required),
    officeStuffName: new FormControl(this.data.officeStuffName, Validators.required),
    designation: new FormControl(this.data.designation),
    phone: new FormControl(this.data.phone),
    email: new FormControl(this.data.email),
    isActive: new FormControl(this.data.isActive),
  });

  constructor(
    public dialogRef: MatDialogRef<OfficeStuffEditComponent>,
    private exampleService: ExampleService,
    private toastr: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
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
   

    this.exampleService.editStuff(data).subscribe(
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
