import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Menu } from "../../../model/menu.model";
import { UserManagementService } from "../../../services/user-management.service";
import { Subject } from "rxjs";
import { DataTableDirective } from "angular-datatables";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import moment from "moment";
import { DropDownResult } from "../../../shared/models/drop-down-result.model";
import { BooleanEnum } from "../../../shared/models/booleanEnum";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import { NbToastrService } from "@nebular/theme";


@Component({
  selector: "ngx-menu-setting",
  templateUrl: "./menu-setting.component.html",
  styleUrls: ["./menu-setting.component.scss"],
})
export class MenuSettingComponent implements OnInit {
  total: number = 0;
  menuList: Menu[] = [];
  pageSize: number = 10;
  currrntPage: number = 1;
  searchBy: string = "";
  isLoading = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  form: FormGroup;
  submitted:boolean=false;

  pmDDList: DropDownResult[] = [];
  gmDDList: DropDownResult[] = [];
  isParentDisableEnable: boolean = false;
  id: any;


  constructor(
    private userManagementService: UserManagementService,
    private userServiceManagement: UserManagementService,
    private toastr: NbToastrService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.createFrom();
    this.getParentMenuDD("");
    this.onParentMenuControlChanges();
    this.groupDD("");
    this.getAllMenu();
    //this.onGroupControlChanges();

    const iconControl = this.form.get("icon");
    const iconSVGControl = this.form.get("iconSVG");
    const urlControl = this.form.get("url");
    const groupIdControl = this.form.get("groupId");
    const parentIdControl = this.form.get("parentId");
    urlControl.setValidators([Validators.required]);
    parentIdControl.setValidators([Validators.required]);
    this.dtOptions = {
      pagingType: "full_numbers",
    };
  }

  createFrom(){
   this.form = new FormGroup({
    menuId: new FormControl(0),
      menuName: new FormControl("", Validators.required),
      url: new FormControl("",Validators.required),
      isActive: new FormControl(1),
      timeStamp: new FormControl(moment(Date.now()).format("YYYY-MM-DD")),
      icon: new FormControl("",Validators.required),
      isParent: new FormControl(0),
      parentId: new FormControl(""),
      orderNo: new FormControl("",Validators.required),
    });
  }
  get f(){
    return this.form.controls;
  }

  getAllMenu() {
    this.isLoading = true;
    this.userManagementService
      .getAllMenu(this.currrntPage, this.pageSize, this.searchBy)
      .subscribe((res: any) => {
        this.menuList = res.data.data;
        this.dtTrigger.next();
      });
     this.isLoading = false;
  }

  editMenu(data: any) {
    this.form = new FormGroup({
      menuId: new FormControl(data.menuId, [
        Validators.required,
        Validators.min(1),
      ]),
      menuName: new FormControl(data.menuName, Validators.required),
      url: new FormControl(data.url),
      isActive: new FormControl(data.isActive),
      timeStamp: new FormControl(moment(Date.now()).format("YYYY-MM-DD")),
      icon: new FormControl(data.icon),
      isParent: new FormControl(data.isParent),
      isGroup: new FormControl(data.isGroup),
      parentId: new FormControl(data.parentId),
      orderNo: new FormControl(data.orderNo),
    });
    this.showUp();
  }

  //#region Reload Page
  private reRender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
       this.getAllMenu();
    });
  }
  //#endregion
  onParentMenuControlChanges() {
    this.form.get("parentId").valueChanges.subscribe((value) => {
      this.getParentMenuDD(value);
    });
  }

  displayParentMenu(option): string {
    return option.value;
  }
  displayGroup(option): string {
    return option.value;
  }


  groupDD(value) {
    this.userServiceManagement
      .getAllGroupDD()
      .subscribe((res: any) => {
        //const filterValue = value.toLowerCase();
        const filterValue = value.value || value;
        this.gmDDList = res.data.filter((option) =>
          option.value.toLowerCase().includes(filterValue.toLowerCase())
        );
      });
  }
  getParentMenuDD(value: any) {
    this.userServiceManagement
      .getAllParentMenuDD()
      .subscribe((res: any) => {
        const filterValue = value.value || value;
        this.pmDDList = res.data.filter((option) =>
          option.value.toLowerCase().includes(filterValue.toLowerCase())
        );
      });
      console.log(this.pmDDList);
  }

  checkboxChangeParent(event) {
    const parentIdControl = this.form.get("parentId");
    const iconControl = this.form.get("icon");
    const urlControl = this.form.get("url");
    const groupIdControl = this.form.get("groupId");
    //const groupControl = this.form.get("isGroup");
    //const iconSVGControl = this.form.get("iconSVG");

    if (event) {
      //groupIdControl.enable();
      this.isParentDisableEnable = true;
      this.form.get("parentId").disable();
      iconControl.enable();
     // iconSVGControl.enable();
    //  groupControl.disable();
      parentIdControl.setValidators(null);
      groupIdControl.setValidators([Validators.required]);
      iconControl.setValidators([Validators.required]);
      //iconSVGControl.setValidators([Validators.required]);
      urlControl.setValidators(null);
    } else {
      this.isParentDisableEnable = false;
      parentIdControl.enable();
    //  groupIdControl.disable();
     // iconControl.disable();
      //iconSVGControl.disable();
      //groupControl.enable();
     // groupIdControl.setValidators(null);
      parentIdControl.setValidators([Validators.required]);
      //iconControl.setValidators(null);
     // iconSVGControl.setValidators(null);
      urlControl.setValidators([Validators.required]);
    }
    parentIdControl.updateValueAndValidity();
    iconControl.updateValueAndValidity();
    //iconSVGControl.updateValueAndValidity();
    urlControl.updateValueAndValidity();
   // groupIdControl.updateValueAndValidity();
    //groupControl.updateValueAndValidity();
  }

  onSave() {
    this.submitted=true;
    if (!this.form.valid) return;

   var data = this.form.value;
    if(data.isParent===true || data.isParent == BooleanEnum.TRUE){
      data.isParent =1;
      //data.groupId = data.groupId.key.toString();
    }else{
      data.isParent = 0;
     // data.parentId = null;
    }
    // if(data.isGroup == true || data.isGroup == BooleanEnum.TRUE){
    //   data.isGroup =1;
      
    // }

    if(data.isParent === BooleanEnum.FALSE){
      data.parentId =  data.parentId ? data.parentId: null;
    }else{
      data.parentId =
      data.isParent === BooleanEnum.TRUE 
        ? null
        : data.parentId != undefined
        ? data.parentId?.key
        : null;

    }
    let value;
    if(data.groupId){
      value = data.groupId.key;
    }
    data.groupId =data.groupId != undefined ? value ? value: null: null;
    data.isParent = data.isParent ==BooleanEnum.TRUE ? 1 : 0;
    //data.isGroup =data.isGroup == BooleanEnum.TRUE ? 1: 0;
    data.groupId = data.isParent == BooleanEnum.TRUE ? 1 : null;  // 1 is quick accesss menu id

    if(data.menuId > 0){
      this.userServiceManagement.editMenu(data).subscribe(
        (res) => {
          this.toastr.success(res.message, "Success");
          this.refresh()
        },
        (err) => {
          this.toastr.danger("An error occurred, Please try again", "Error");
          console.log(err);
        }
      );
    }else{
      this.userServiceManagement.saveMenu(data).subscribe(
        (res) => {
          this.toastr.success(res.message, "Success");
          this.getParentMenuDD("");
          this.onParentMenuControlChanges();
          //this.groupDD("");
          //this.onGroupControlChanges();
          this.refresh();
        },
        (err) => {
          this.toastr.danger("An error occurred, Please try again", "Error");
         
        }
      );
    }
  }
  deleteNewUser(id: number){
    const ref=  this.dialog.open(ConfirmDialogComponent, {
      position:{top:"50px"},
      width:"400px",
      data:{title:"Menu",message:"Are you want to delete?"},
      panelClass: [
        "animate__animated",
        "animate__slideInTop",
        "dialog_width_change",
      ],
    });
      ref.afterClosed().subscribe(result => {
        if (result) {
          this.userManagementService.deleteMenu(id).subscribe(res =>{
          if(res.statusCode == 200){
            this.refresh();
            this.toastr.danger("Delete Successfull", "Delete");
          }
          else{
            this.toastr.danger("Delete Failed!", "Delete");
          }});
        }
    });


    
  }
  showUp() {
    const element = document.querySelector('#goUp');
    element.scrollIntoView();
}
   refresh(): void { 
    this.createFrom();
    this.reRender();
    this.submitted=false;
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
