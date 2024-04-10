import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validator,
  Validators
} from "@angular/forms";
import { data, event } from "jquery";

import { AppManagementServiceService } from "../../../services/app-management-service.service";
import { AppUserDesignationModel } from "../../../model/app-user-designation.model";
import { AppUserManagementModel } from "../../../model/app-management-model";
import { ConfirmDialogComponent } from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import { DataTableDirective } from "angular-datatables";
import { LocalDataSource } from "ng2-smart-table";
import { Location } from '@angular/common';
import { Locations } from "../../../model/locations.model";
import { MatDialog } from "@angular/material/dialog";
import { NbToastrService } from "@nebular/theme";
import { NewUserByCenterLoc } from "../../../model/new-user-center-location.model";
import { NewUserByCenterLocationService } from "../../../services/new-user-by-center-location.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { UserRolesModel } from "../../../model/userRoles.model";
import { log } from "console";

@Component({
  selector: 'ngx-new-app-user',
  templateUrl: './new-app-user.component.html',
  styleUrls: ['./new-app-user.component.scss']
})
export class NewAppUserComponent implements OnInit {
  newUserForm: FormGroup;
  appManagementList: AppUserManagementModel[]=[];
  message: any;
  isLoading = false;
  public selectData: Array<NewUserByCenterLoc>;
  showPassword = true;
  roleData: any = [""];
  dbData: any = [""];
  usersList: UserRolesModel[] = [];
  rolesByUserId: any = [""];
  locationData: Locations[] = [];
  locations: any[] = [];
  allLocation: any;
  location: any = [""];
  patchLocation: any[] = [];
  selectRoleValid: boolean = true;
  isReadOnly: boolean;
  submit = false;
  userName: string;
  selectedLocation: any[] = [];
  locationId: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isUpdate: boolean;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  //source: LocalDataSource = new LocalDataSource();
  btnStatus: string = "Save";
  submitted: boolean = false;
  isSavedDisable: boolean = true;
  isDtInitialized: boolean = false;
  designationList: AppUserDesignationModel []=[]
  constructor(
    private fb: FormBuilder,
    private newUserCLService: AppManagementServiceService,
    private toastr: NbToastrService,
    private dialog: MatDialog,
    private _router: Router,
     private _newUserCLService: NewUserByCenterLocationService,
  ) {
    //this.source = new LocalDataSource(this.users);
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
    };
    this.createForm();
    
    
    this.getAllUserMangementList();
    this.getAllDesignationList();
    this.getAllDatabaseDD();
  }

  
  

  getAllUserMangementList(){
    this.newUserCLService.getAppManagelist().subscribe((res)=>{
      this.appManagementList=res as AppUserManagementModel[];
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      }
      else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      }
    })
  }

  getAllDesignationList(){
   this.newUserCLService.getDesignationlist().subscribe((res)=>{
    this.designationList= res as AppUserDesignationModel[];
   })
  }

  saveAppUserManagement(){
    this.newUserCLService.saveAppManagementBill(this.formVal).subscribe((res:any)=>{
      if(res==0 || res==1 || res==3){
        res == 1 ? this.toastr.success("Bill Successfully Saved!", "Success") : this.toastr.success("Bill Successfully Updated!", "Updated");
        this._router.navigate(['app-user-management/new-app-user'])
        this.getAllUserMangementList();
        this.createForm();
      }
      else if (res == 2) {
        this.toastr.danger("user code is already exists! please try again", "Error")
      }
      else{
        this.toastr.danger("Failed To Saved ", "Error");
      }
    })
  }

  editAppUserList(item:AppUserManagementModel){
    this.btnStatus = 'Update';
    this.newUserForm.patchValue(item);  
     let dbCode=item.db as any;
    this._newUserCLService.getLocationByDbArray(dbCode).subscribe((response) => {
      this.locationData = response.data as Locations[];
    }); 
  }

  deleteAppUser(id:number){
    const ref = this.dialog.open(ConfirmDialogComponent, {
      position: { top: "250px" },
      width: "400px",
      data: { title: "New  App User", message: "Are you sure to delete this?" },
      panelClass: [
        "animate__animated",
        "animate__slideInTop",
        "dialog_width_change",
      ],
    });
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.newUserCLService.deleteAppManagementBill(id).subscribe((res: any) => {
          if (res == 1) {
            this.toastr.danger("Deleted Successfully", "Delete");
            if (this.isDtInitialized) {
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
              });
            }
            else {
              this.isDtInitialized = true
              this.dtTrigger.next();
            }
            this.getAllUserMangementList();
            this.reset();
          }
          else {
            this.toastr.danger("Delete Failed!", "Delete");
          }
        });
      }
    });
  }

  reset() {
    this.createForm();
    this.btnStatus = 'Save';
  }


  onSelect(data) {
    this._newUserCLService.getLocationByDbArray(data).subscribe((response) => {
      this.locationData = response.data as Locations[];
      this.f.location.setValue('null')
      
    });
  }
 
  

  private getAllDatabaseDD() {
    this._newUserCLService.getAllDatabase().subscribe((response) => {
      this.dbData = response.data.data;
    });
  }

  createForm() {
    this.newUserForm = this.fb.group({
       userId:[0,[]],
      userName: [, [Validators.required]],
      userPassword: [, [Validators.required]],
      db: [, [Validators.required]],
      location: [, [Validators.required]],
      userCode: [, [Validators.required]],
      designationCode:[,[Validators.required]]
       
    });
  }

  mobileNo: string | null;

  get formVal() {
    return this.newUserForm.value;
  }
  get f() {
    return this.newUserForm.controls;
  }
  // space(e: any) {
  //   if (e.charCode === 32) {
  //     e.preventDefault();
  //   }
  // }

  // ConvertToLower(evt) {
  //   this.userName = evt?.toLowerCase();
  // }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
