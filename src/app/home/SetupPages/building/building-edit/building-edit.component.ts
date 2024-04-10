import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { BuildingService } from '../../../../services/building.service';
import { dateFormatISO } from '../../../../@core/utils/utiliy';
import { SD } from '../../../../@core/utils/static-data';

@Component({
  selector: 'ngx-building-edit',
  templateUrl: './building-edit.component.html',
  styleUrls: ['./building-edit.component.scss']
})

export class BuildingEditComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  result: any;
  buildingTypeDdList = SD.buildingTypeDdList;
  addressCodeDdList = SD.addressCodeDdList;
  
  constructor(
    public dialogRef: MatDialogRef<BuildingEditComponent>,
    private Building: BuildingService,
    private toastr: NbToastrService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.getBuildingById();
  }

  initForm() {
    this.form = this.formBuilder.group({
      buildingId: [null, [Validators.required]],
      siteNbr: [null, [Validators.required]],
      addressCode: [null, [Validators.required]],
      buildingTitle: [null, [Validators.required]],
      address: [null, [Validators.required]],
      postalCode: [null, [Validators.required]],
      buildingType: [null],
      assetNo: [null],
      ltaId: [null],
      issInstallDate: [new Date(), [Validators.required]],
      isActive: [false],
      isOnTest: [false]
    });
  }

  getBuildingById() {
    this.Building
      .getBuildingById(this.data.buildingId)
      .subscribe((res: any) => {
        this.result = res.data;
        this.setValueToForm();
      });
  }

  setValueToForm() {
    const building = this.result;
    this.form.patchValue({
      buildingId: building.buildingId,
      siteNbr: building.siteNbr,
      addressCode: building.addressCode,
      buildingTitle: building.buildingTitle,
      address: building.address,
      postalCode: building.postalCode,
      buildingType: building.buildingType,
      assetNo: building.assetNo,
      ltaId: building.ltaId,
      issInstallDate: new Date(building.issInstallDate),
      isActive: building.isActive,
      isOnTest: building.isOnTest
    });
  }

  onSave() {
    if (!this.form.valid) return;
    if (this.checkUniqueSiteNbr(this.form.value.buildingId,this.form.value.siteNbr)) return;

    let payload = this.form.value;
    payload.issInstallDate = dateFormatISO(payload.issInstallDate);

    this.Building.editBuilding(payload).subscribe(
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
