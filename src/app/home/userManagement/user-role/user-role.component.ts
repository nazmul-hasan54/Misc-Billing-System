import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { NbToastrService } from '@nebular/theme';
import { DataTableDirective } from 'angular-datatables';
import { log } from 'console';
import { Subject } from 'rxjs';
import { Role } from '../../../model/role.model';
import { UserManagementService } from '../../../services/user-management.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { UserRoleCreateComponent } from './user-role-create/user-role-create.component';
import { UserRoleEditComponent } from './user-role-edit/user-role-edit.component';

@Component({
  selector: 'ngx-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {
  roleForm: FormGroup;
  total: number = 0;
  roleList: Role[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  searchBy: string = "";
  isLoading = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isUpdate: boolean;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  columns = [
    { columnDef: "roleName", header: "Role Name" },
    { columnDef: "menuName", header: "Menu Name" },
  ];

  constructor(
    private dialog: MatDialog,
    private userManagementService: UserManagementService,
    private toastr: NbToastrService,
    private fb: FormBuilder,
    private userServiceManagement: UserManagementService,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      destroy:true
    };
    this.getAllRole();
    this.createForm();
  }

  getAllRole = function () {
    this.isLoading = true;
    this.userManagementService
      .getAllRole(this.currentPage, this.pageSize, this.searchBy)
      .subscribe((res: any) => {
        this.roleList = res.data.data;
        this.total = res.data.totalCount;
        this.pageSize = res.data.pageSize;
        this.dtTrigger.next();
        console.log("Role", this.roleList)
      });
    this.isLoading = false;
  };

  searchRoleByRoleName() {
    this.currentPage = 0;
    this.getAllRole();
  }

  onPageChange(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getAllRole();
  }

  addRole() {
    const dialogRef = this.dialog.open(UserRoleCreateComponent, {
      position: { top: "0", right: "0" },
      height: "100%",
      width: "30%",
      autoFocus: false,
      panelClass: [
        "animate__animated",
        "animate__slideInRight",
        "dialog_width_change",
      ],
    });

    dialogRef.afterClosed().subscribe(() => this.getAllRole());
  }

  editRole(data: any) {
    // this.isUpdate=true;
    // this.userServiceManagement.getRoleByuserId(id).subscribe((res => {
    //   this.formValuePatch(res.data);
  // }));
    // const dialogRef = this.dialog.open(UserRoleEditComponent, {
    //   position: { top: "0", right: "0" },
    //   data: roledata,
    //   height: "100%",
    //   width: "30%",
    //   autoFocus: false,
    //   panelClass: [
    //     "animate__animated",
    //     "animate__slideInRight",
    //     "dialog_width_change",
    //   ],
    // });

    // dialogRef.afterClosed().subscribe(() => this.getAllRole());
    this.formValuePatch(data);
  }

  deleteRole(id: any){
    const ref=  this.dialog.open(ConfirmDialogComponent, {
      position:{top:"250px"},
      width:"400px",
      data:{title:"Role",message:"Are you want to delete?"},
      panelClass: [
        "animate__animated",
        "animate__slideInTop",
        "dialog_width_change",
      ],
    });
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.userManagementService.deleteUserRole(id).subscribe(res =>{
        if(res.statusCode == 200){
          this.refresh();
          this.toastr.danger("Delete Successfull", "Delete");
        }
        else{
          this.toastr.danger("Delete Failed!", "Delete");
        }});
      }
  });
    // this.userServiceManagement.deleteUserRole(id).subscribe((res) =>{
    //   this.toastr.danger(res.message, "Success")
    //   this.refresh();
    // });
  }

  onSave() {
    console.log(this.roleForm);
    if (!this.roleForm.valid) return;

    //this.roleForm.value.menuFkId = this.roleForm.value.menuFkId.key;
    console.log(this.roleForm.value);
    if(this.roleForm.value.id > 0){
      this.userServiceManagement.editUserRole(this.roleForm.value).subscribe((res => {
        if(res.statusCode==200){
          this.toastr.success(res.message, "Success");
        this.refresh();
        } else {
          this.toastr.danger(res.message, "Failed!")
        } 
      }));
    }
    else {
      this.userServiceManagement.saveUserRole(this.roleForm.value).subscribe(
        (res) => {
          //this.close();
          this.toastr.success(res.message, "Success");
          this.refresh();
        },
        (err) => {
          this.toastr.danger("An error occurred, Please try again", "Error");
          console.log(err);
        }
      );
    }
  }

  createForm() {
    this.roleForm = this.fb.group({
      id: [0],
      //menuFkId: [],
      roleName: ["", [Validators.required]],
      isActive: [1,[]],
      priority:["",[Validators.required]],
    });
  }

  formValuePatch(data: any){
    this.roleForm.patchValue({
      id: data.id,
      roleName: data.roleName,
      isActive: data.isActive,
      priority: data.priority,
    });
  }



  get formVal() {
    return this.roleForm.value;
  }
  get f() {
    return this.roleForm.controls;
  }

  refresh(): void {
    this.createForm();
    this.reRender();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

     //#region Reload Page
     private reRender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.getAllRole();
      });
    }
    //#endregion

}
