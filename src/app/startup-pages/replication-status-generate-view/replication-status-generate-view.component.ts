import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { Subject } from 'rxjs';
import { ReplicationStatusService } from '../../services/replication-status.service';

@Component({
  selector: 'ngx-replication-status-generate-view',
  templateUrl: './replication-status-generate-view.component.html',
  styleUrls: ['./replication-status-generate-view.component.scss']
})
export class ReplicationStatusGenerateViewComponent implements OnInit {

  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = 'month';
  bsConfig?: Partial<BsDatepickerConfig>;
  report: any; 
  documentTitle = ""; 
  isTrue = true;
  replicationStatusData: any[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  form: FormGroup;
  hostName: string;
  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private _replicationStatus: ReplicationStatusService,
    private _pipe: DatePipe
  ) { }

  ngOnInit(): void {
    // this.hostName = "/startup/replication-status";
    // localStorage.setItem("redirectUrl", this.hostName);
    this.dtOptions = {
      pagingType: "full_numbers",
      retrieve:true,
      searching: false,
    };
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode
    });
    this.createForm()
  }

  createForm(){
    this.form = this._fb.group({
      billMonth: ['', [Validators.required]]
    })
  }

  onSubmit(){
    if(this.form.invalid) return;
    let obj = {
      billMonth: this._pipe.transform(this.formCon.billMonth.value, 'yMM')
    }
    this._replicationStatus.getAllReplicationStatusList(obj.billMonth).subscribe(res =>{
      this.replicationStatusData = res as any;
      this.isTrue=false;
    });
  }

  searchAgain(){
    this.isTrue = true;
  }

  get formCon(){
    return this.form.controls;
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  };

}
