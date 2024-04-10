import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { SD } from '../../../../@core/utils/static-data';
import { dateFormatISO } from '../../../../@core/utils/utiliy';
import { BuildingService } from '../../../../services/building.service';

@Component({
  selector: 'ngx-building-create',
  templateUrl: './building-create.component.html',
  styleUrls: ['./building-create.component.scss']
})

export class BuildingCreateComponent implements OnInit {
  form = new FormGroup({
    siteNbr: new FormControl("", Validators.required),
    addressCode: new FormControl("", Validators.required),
    buildingTitle: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    postalCode: new FormControl("", Validators.required),
    buildingType: new FormControl(""),
    assetNo: new FormControl(""),
    ltaId: new FormControl(""),
    issInstallDate: new FormControl("", Validators.required),
    isActive: new FormControl(true),
    isOnTest: new FormControl(false),
  });

  buildingTypeDdList = SD.buildingTypeDdList;
  addressCodeDdList = SD.addressCodeDdList;
  constructor(
    public dialogRef: MatDialogRef<BuildingCreateComponent>,
    private Building: BuildingService,
    private toastr: NbToastrService
  ) { }

  ngOnInit(): void {
  }

  onSave() {
    if (!this.form.valid) return;
    if (this.checkUniqueSiteNbr(this.form.value.buildingId,this.form.value.siteNbr)) return;

    let payload = this.form.value;
    payload.issInstallDate = dateFormatISO(payload.issInstallDate);

    this.Building.saveBuilding(payload).subscribe(
      (res) => {
        if(res.succeeded){
          this.close();
          this.toastr.success(res.message, "Success");
        }
        else{
          this.toastr.warning(res.message, "Warning");
        }
      },
      (err) => {
        this.toastr.danger("An error occurred, Please try again", "Error");
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

  checkUniqueSiteNbr(buildingId,siteNbr): boolean {
    let isUnique = false;
    this.Building.checkUniqueSiteNbr(buildingId,siteNbr).subscribe((res: any) => {
      if (!res.data) {
        this.toastr.warning(res.message, "Warning");
        isUnique = true;
      }
    });
    return isUnique;
  }
}
