import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validator,
  Validators
} from "@angular/forms";

import { ConfirmDialogComponent } from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import { DataTableDirective } from "angular-datatables";
import { LocalDataSource } from "ng2-smart-table";
import { Locations } from "../../../../model/locations.model";
import { MatDialog } from "@angular/material/dialog";
import { NbToastrService } from "@nebular/theme";
import { NewUserByCenterLoc } from "../../../../model/new-user-center-location.model";
import { NewUserByCenterLocationService } from "../../../../services/new-user-by-center-location.service";
import { Subject } from "rxjs";
import { UserRolesModel } from "../../../../model/userRoles.model";
import { hasErrorValidation } from "../../../../@core/utils/utiliy";
import { event } from "jquery";
import { MinistryService } from "../../../../services/ministry.service";

@Component({
  selector: "ngx-create-new-user-center-loc-setting",
  templateUrl: "./create-new-user-center-loc-setting.component.html",
  styleUrls: ["./create-new-user-center-loc-setting.component.scss"],
})
export class CreateNewUserCenterLocSettingComponent implements OnInit {
  newUserForm: FormGroup;

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
  roleName:string=localStorage.getItem("roleName");
  user:string=localStorage.getItem("userName");
  usersRole=this.user.split(",");

  locationCode = localStorage.getItem("locationCodeList");
  locationLists = this.locationCode.split(",");
  submitted:boolean=false;
  DBCenterList: any = [""];
  constructor(
    private fb: FormBuilder,
    private newUserCLService: NewUserByCenterLocationService,
    private toastr: NbToastrService,
    private dialog: MatDialog,
    private _ministryService: MinistryService,
  ) {
    //this.source = new LocalDataSource(this.users);
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
    };

    this.createForm();
    this.getAllDatabaseDD();
    this.getAllRoleDD();
    //this.getAllLocationDD();
   // this.getRoleByUserId();
    this.getUsersRoles();
    this.refresh();
  }

  onSelect(data) {
      if(this.roleName=='Admin'){
        if(data.length == 0){
          this.newUserForm.patchValue({
            location: [],
          });
          this.patchLocation = [];
          this.locationData = [];
          this.selectedLocation = [];
        }
        //this.locationData = [];
        this.patchLocation = [];
        this.newUserCLService.getLocationByDbArray(data).subscribe((response) => {
          this.locationData = response.data as Locations[];
          const filteredArray = this.locationData?.filter(value => this.selectedLocation.includes(value.id));
          this.selectedLocation = [];
          this.selectedLocation = filteredArray.map(a => a.id);
          this.selectedLocation?.forEach((item) => {
            this.locationData?.forEach((lData) => {
              if (item === lData.id) {
                this.patchLocation.push(lData.id);
              }
            });
          });
         // console.log('fromValue',this.newUserForm.value.location);
         // console.log("patchLocation", this.patchLocation);
         if(data.length > 0){
          setTimeout(() => {
            this.newUserForm.patchValue({
              location: this.patchLocation,
            });
          }, 400);
         }
        });
      }
      else{
        if(data.length == 0){
          this.newUserForm.patchValue({
            location: [],
          });
          this.patchLocation = [];
          this.locationData = [];
          this.selectedLocation = [];
        }
        this.patchLocation = [];
        this.newUserCLService.getLocationByUserNameAndDBCenter(this.usersRole[0],data).subscribe((res:any) => {
          this.locationData = res as Locations[];
          const filteredArray = this.locationData?.filter(value => this.selectedLocation.includes(value.id));
          this.selectedLocation = [];
          this.selectedLocation = filteredArray.map(a => a.id);
          this.selectedLocation?.forEach((item) => {
            this.locationData?.forEach((lData) => {
              if (item === lData.id) {
                this.patchLocation.push(lData.id);
              }
            });
          });
         if(data.length > 0){
          setTimeout(() => {
            this.newUserForm.patchValue({
              location: this.patchLocation,
            });
          }, 400);
         }
        });
      }
  }
 
  locationChange(data) {
    this.selectedLocation = [];
    data.forEach((p) => {
      this.selectedLocation.push(p);
    });
  }

  private getAllRoleDD() {
      this.newUserCLService.getPriorityWiseAllRole().subscribe((response) => {
        this.roleData = response;
      });
  }

  private getAllDatabaseDD() {
    if(this.roleName=='Admin'){
      this.newUserCLService.getAllDatabase().subscribe((response) => {
        this.dbData = response.data.data;
      });
    }
    else{
      this.newUserCLService.getAllDBCenterByUsernaem(this.usersRole[0]).subscribe((res:any)=>{
        this.DBCenterList= res as any[];
      });
    }
  }

  getAllLocationDD() {
    if(this.roleName=='Admin'){
      this.newUserCLService.getAllLocation().subscribe((response) => {
        this.locationData = response.data.data;
      });
    }
  }


  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  }

  ConvertToLower(evt) {
    this.userName = evt?.toLowerCase();
  }

  onSave() {
    this.submit = true;
    this.submitted=true;

    if (!this.newUserForm.valid) return;
    this.isLoading = true;
     var uniqueDb = this.newUserForm.value.db.filter(onlyUnique);
     this.newUserForm.value.db = uniqueDb;
    if (this.newUserForm.value.id > 0) {
      this.newUserCLService
        .updateNewUserLocationCenter(this.newUserForm.value)
        .subscribe((res) => {
          if (res.statusCode == 200) {
            this.submitted = false;
            this.toastr.success(res.message, "Success");
            this.refresh();
            // this.createForm();
          } else {
            this.toastr.danger(res.message, "Failed!");
          }
        });
    } else {
      this.newUserCLService
        .saveNewUserByCenterLocation(this.newUserForm.value)
        .subscribe(
          (res) => {
            this.submitted = false;
            this.toastr.success(res.message, "Success");
            this.refresh();
          },
          (err) => {
            this.toastr.danger("Something went wrong!", "Error");
            this.isLoading = false;
          }
        );
    }
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }
  }
  
  refresh(): void {
    this.isReadOnly = false;
    this.newUserForm.controls.userPassword.enable();
    this.createForm();
    this.newUserForm.controls["location"].setValue([]);
    this.reRender();
  }

  getUsersRoles() {
    this.newUserCLService.getUsersRoles().subscribe((response: any) => {
      this.usersList = response.data as UserRolesModel[];
      this.dtTrigger.next();
    });
  }

  // getRoleByUserId() {
  //   this.newUserCLService.getRoleByuserId(141).subscribe((response) => {
  //     this.rolesByUserId = response.data;
  //   });
  // }

  getUserByLocationCenterbyIdForEdit(id: number) {
    this.isUpdate = true;
    this.newUserCLService.getUserByLocationCenterbyId(id).subscribe((res) => {
      this.formValuePatch(res.data);
    });
  }
  formValuePatch(data: any) {
    this.isReadOnly = true;
    this.onSelect(data.dbList);
    setTimeout(() => {
      this.newUserForm.patchValue({
        id: data.content.userId,
        roleId: data.content.roleId,
        db: data.dbList,
        location: data.locationList,
        userName: data.content.userName,
        // userPassword: ['', [Validators.required]],
      });
    }, 800);
    this.selectedLocation = data.locationList;
    this.newUserForm.controls["userPassword"].disable();
  }
  deleteNewUser(id) {
    const ref=  this.dialog.open(ConfirmDialogComponent, {
      position:{top:"50px"},
      width:"400px",
      data:{title:"New User",message:"Are you want to delete?"},
      panelClass: [
        "animate__animated",
        "animate__slideInTop",
        "dialog_width_change",
      ],
    });
      ref.afterClosed().subscribe(result => {
        if (result) {
          this.newUserCLService.deleteNewUser(id).subscribe((result) => {
            this.toastr.danger(result.message, "Success");
            this.refresh();
          }, error=>{
            this.toastr.danger("Delete Failed!", "Delete");
          });
        }
    });

   
  }
  // public hasError = (controlName: string, errorName: string) => {
  //   return hasErrorValidation(this.newUserForm, controlName, errorName);
  // };
    //#region Reload Page
   private reRender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.getUsersRoles();
      });
    }
    //#endregion

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  createForm() {
    this.newUserForm = this.fb.group({
      id: [0,[Validators.required]],
      roleId: ["", [Validators.required]],
      db: [[], [Validators.required]],
      location: [, []],
      userName: [, [Validators.required]],
      userPassword: [, [Validators.required]],
    });
  }

  get formVal() {
    return this.newUserForm.value;
  }
  get f() {
    return this.newUserForm.controls;
  }
}