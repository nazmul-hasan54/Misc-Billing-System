import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../../../Authentication/services/auth.service';
import { NbToastrService } from '@nebular/theme';
import { RoleToMenu } from '../../../model/role-to-menu.model';
import { UserManagementService } from '../../../services/user-management.service';
import { UserToMenu } from '../../../model/user-to-menu.model';

@Component({
  selector: 'ngx-access-mapping',
  templateUrl: './access-mapping.component.html',
  styleUrls: ['./access-mapping.component.scss']
})
export class AccessMappingComponent implements OnInit {
  roleDDList = [];
  userDDList = [];
  userDDListForRestrictedMenu = [];
  menuItemList = [];

  userFkId: any;
  userFkIdForRestricted: any;
  roleFkId: any;

  roleControl = new FormControl("");
  userControl = new FormControl("");
  userRestrictionControl = new FormControl("");
  accessForm: FormGroup;
  constructor(
    private userManagementService: UserManagementService,
    private authService: AuthService,
    private toastr: NbToastrService,
    private _fb: FormBuilder,
  
  ) {}

  ngOnInit(): void {
    this.getRoleDD("");
    this.getUserDD("");
    this.getUserDDForRestrictedMenu("");
    this.createForm();
    this.onRoleControlChanges();
    this.onUserControlChanges();
    this.onUserRestrictionControlChanges();
  }

  onRoleControlChanges() {
    this.roleControl.valueChanges.subscribe((value) => {
      this.getRoleDD(value);
    });
  }

  onUserControlChanges() {
    this.userControl.valueChanges.subscribe((value) => {
      this.getUserDD(value);
    });
  }

  onUserRestrictionControlChanges() {
    this.userRestrictionControl.valueChanges.subscribe((value) => {
      this.getUserDDForRestrictedMenu(value);
    });
  }

  displayRole(option): string {
    return option.value;
  }

  displayUser(option): string {
    return option.value;
  }

  displayUserRestriction(option): string {
    return option.value;
  }

  onTabChange(event) {
    if (event.index === 1) {
      this.userMenuMapping();
    } else if (event.index === 0) {
      this.menuRoleMapping();
    } else if (event.index === 2) {
      this.userRestrictedMenuMapping();
    }
  }

  allChildCheckUpdate(itemId, isActive) {
    let arr = [];
    if(isActive){
      this.menuItemList.find((x) => x.itemId === itemId).isActive=1;
    }
    else{
      this.menuItemList.find((x) => x.itemId === itemId).isActive=0;
    }

    arr = this.menuItemList.find((x) => x.itemId === itemId).children;
    arr.forEach((element) => {
      if (isActive) {
        element.isActive = 1;
      } else {
        element.isActive = 0;
      }
    });
    this.menuItemList.find((x) => x.itemId === itemId).children = arr;
  }

  ParentCheckUpdateForAllChild(parentId) {
    let parent = this.menuItemList.find((x) => x.itemId === parentId);
    let count = 0;
    debugger;
    parent.children.forEach((e) => {
      if (e.isActive) {
        count++;
      }
    });
    if (count === parent.children.length) {
      parent.isActive = 1;
    } else {
      parent.isActive = 0;
    }
  }

  //========================================Tab Role To Menu===============================
  getRoleDD(value: any) {
    this.userManagementService
      .getAllRoleDD()
      .subscribe((res: any) => {
        const filterValue = value.value || value;
        debugger;
        this.roleDDList = res.data.filter((option) =>
          option.value.toLowerCase().includes(filterValue.toLowerCase())
        );
      });
  }

  changeRole(roleId) {
    this.getAllMenuForRole(roleId);
    this.roleFkId = roleId;
  }

  menuRoleMapping() {
    this.roleDDList = [];
    this.getRoleDD("");
    this.menuItemList = [];
    if (this.roleFkId) this.getAllMenuForRole(this.roleFkId);
  }

  getAllMenuForRole = function (roleId: number) {
    this.userManagementService.getAllMenuForRole(roleId).subscribe(
      (res: any) => {
        this.menuItemList = res.data;
      },
      (err) => {
        this.toastr.danger("An error occurred, Please try again", "Error");
        console.log(err);
      }
    );
  };

  saveRTM(formValue) {
    console.log("formValue",formValue);
    formValue.forEach(e =>{
      e.children.forEach(item =>{
        if(item.isActive == true){
          item.isActive = 1;
        }else{
          item.isActive = 0;
        }
      });
    });
    let data: RoleToMenu = {
      roleId: this.roleFkId,
      menuItems: formValue,
    };  
    console.log("data",data);
    this.userManagementService.saveRoleToMenu(data).subscribe((res) => {
      this.toastr.success(res.message, "Success");
      this.getAllMenuForRole(data.roleId);
      this.userManagementService.onMenuMapping.emit(true);
    });
  }

  //========================================Tab User To Menu===============================
  changeUser(userId) {
    this.userFkId = userId;
    this.getAllMenuForUser(userId);
  }

  changeUserForRestrictedMenu(userId) {
    this.userFkIdForRestricted = userId;
    this.getAllRestrictedMenuForUser(userId);
  }

  getUserDD(value: any) {
    this.userManagementService
      .getAllUserDD()
      .subscribe((res: any) => {
        const filterValue = value.value || value;
        this.userDDList = res.data.filter((option) =>
          option.value.toLowerCase().includes(filterValue.toLowerCase())
        );
      });
  }

  getUserDDForRestrictedMenu(value: any) {
    this.userManagementService
      .getAllUserDD()
      .subscribe((res: any) => {
        const filterValue = value.value || value;
        this.userDDListForRestrictedMenu = res.data.filter((option) =>
          option.value.toLowerCase().includes(filterValue.toLowerCase())
        );
      });
  }

  getAllMenuForUser = function (userId: number) {
    this.userManagementService
      .getAllMenuForUser(userId)
      .subscribe((res: any) => {
        this.menuItemList = res.data;
      });
  };

  getAllRestrictedMenuForUser(userId: number) {
    this.userManagementService
      .getAllRestrictedMenuForUser(userId)
      .subscribe((res:any) => {
        this.menuItemList = res.data;
      });
  }

  userMenuMapping() {
    this.userDDList = [];
    this.getUserDD("");
    this.menuItemList = [];
    if (this.userFkId) this.getAllMenuForUser(this.userFkId);
  }

  userRestrictedMenuMapping() {
    this.userDDListForRestrictedMenu = [];
    this.getUserDDForRestrictedMenu("");
    this.menuItemList = [];
    if (this.userFkIdForRestricted)
      this.getAllRestrictedMenuForUser(this.userFkIdForRestricted);
  }

  addUTMRow() {
    this.getUserDD("");
  }

  saveUTM(formValue) {
    formValue.forEach(e =>{
      e.children.forEach(item =>{
        if(item.isActive == true){
          item.isActive = 1;
        }else{
          item.isActive = 0;
        }
      });
    });
    let data: UserToMenu = {
      userId: this.userFkId,
     
      menuItems: formValue
    };
    this.userManagementService.saveUserToMenu(data).subscribe((res) => {
      this.toastr.success(res.message, "Success");
      this.getAllMenuForUser(data.userId);
      this.userManagementService.onMenuMapping.emit(true);
    });
  }

  saveUTMRestriction(formValue) {
    formValue.forEach(e =>{
      e.children.forEach(item =>{
        if(item.isActive == true){
          item.isActive = 1;
        }else{
          item.isActive = 0;
        }
      });
    });
    let data: UserToMenu = {
      userId: this.userFkIdForRestricted,
      menuItems: formValue
    };

    this.userManagementService.UTMRestriction(data).subscribe((res) => {
      this.toastr.success(res.message, "Success");
      this.getAllRestrictedMenuForUser(data.userId);
      this.userManagementService.onMenuMapping.emit(true);
    });
  }

  createForm() {
    this.accessForm = this._fb.group({
      isCreated: [, []],
      isEdited: [, []],
      isDeleted: [, []],
      parentMenu: [, []],
      childMenu: [, []]

    });
  }

  get formVal() {
    return this.accessForm.value;
  }

  get f() {
    return this.accessForm.controls;
  }

}
