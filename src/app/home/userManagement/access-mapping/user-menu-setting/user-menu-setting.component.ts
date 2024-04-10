import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { AuthService } from '../../../../Authentication/services/auth.service';
import { NbToastrService } from '@nebular/theme';
import { RoleToMenu } from '../../../../model/role-to-menu.model';
import { UserManagementService } from '../../../../services/user-management.service';
import { UserToMenu } from '../../../../model/user-to-menu.model';

@Component({
  selector: 'ngx-user-menu-setting',
  templateUrl: './user-menu-setting.component.html',
  styleUrls: ['./user-menu-setting.component.scss']
})
export class UserMenuSettingComponent implements OnInit {
  roleDDList = [];
  userDDList = [];
  userDDListPriority = [];
  userDDListForRestrictedMenu = [];
  menuItemList = [];
  // @Input()
  // public expanded: boolean;

  // @Output()
  // public expandedChanged: EventEmitter<boolean> = new EventEmitter();

  userFkId: any;
  userFkIdForRestricted: any;
  roleFkId: any;

  roleControl = new FormControl("");
  userControl = new FormControl("");
  userRestrictionControl = new FormControl("");
  userName = localStorage.getItem('userName');
  roleName = localStorage.getItem('roleName');
  locationCode = localStorage.getItem('locationCodeList');
  locationList = this.locationCode.split(",");
  

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
    //.this.createForm();
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
    if(this.roleName == 'Admin'){
      this.userManagementService
        .getAllUserDD()
        .subscribe((res: any) => {
          const filterValue = value.value || value;
          this.userDDList = res.data.filter((option) =>
            option.value.toLowerCase().includes(filterValue.toLowerCase())
          );
          
        });
      } else {
        this.userManagementService
        .getAllUserDdByPriorityAndUserName(this.userName, this.locationList[0])
        .subscribe((res: any) => {
          this.userDDListPriority = res;
          console.log("ghafhfh", this.userDDListPriority);
          
        })
      }
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


  onSaveUTM(){
    this.saveUTM(this.menuItemList);
  }

  userMenuAccessCreate(itemId, isCreated, childrenId) {
    let parent = this.menuItemList.find((x) => x.itemId === itemId);
    // let child = this.menuItemList[i].children[i].itemId;
    parent.children.forEach(e => {
      if (childrenId == e.itemId) {

        if (isCreated.checked) {
          e.isCreated = 1;
        }
        else {
          e.isCreated = 0;
        }


      }

    });



  }

  userMenuAccessEdit(itemId, isEdited, childrenId) {
    let parent = this.menuItemList.find((x) => x.itemId === itemId);
    parent.children.forEach(e => {
      if (e.itemId == childrenId) {
        if (isEdited.checked) {
          e.isEdited = 1;
        }
        else {
          e.isEdited = 0;
        }

      }

    });

  }

  userMenuAccessDelete(itemId, isDeleted, childrenId) {
    let parent = this.menuItemList.find((x) => x.itemId === itemId);
    parent.children.forEach(e => {
      if (e.itemId == childrenId) {
        if (isDeleted.checked) {
          e.isDeleted = 1;
        }
        else {
          e.isDeleted = 0;
        }

      }

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


  public changeIcon(i: any) {
    // var icon = anchor.querySelector("i");
    var item = document.getElementById(i);
    item.classList.toggle('plus-circle-outline');
    item.classList.toggle('minus-circle-outline');
    console.log(item.classList)
    console.log(item);
   
  }

    public onIconChange(i: any){
      let span = document.getElementById(i);  
        var iconName = span.classList.item(1);  
          if (iconName == 'fa-plus-circle') 
          {    
              span.classList.remove(iconName)  
               span.classList.add('fa-minus-circle')  
          } else { 
              span.classList.remove('fa-minus-circle')   
              span.classList.add('fa-plus-circle') 
          }
    }

  // createForm() {
  //   this.accessForm = this._fb.group({
  //     isCreated: [false, []],
  //     isEdited: [false, []],
  //     isDeleted: [false, []],
  //     parentMenu: [, []],
  //     childMenu: [, []]

  //   });
  // }

  // get formVal() {
  //   return this.accessForm.value;
  // }

  // get f() {
  //   return this.accessForm.controls;
  // }

}
