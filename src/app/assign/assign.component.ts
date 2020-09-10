import { Component,ChangeDetectorRef ,OnInit,ViewChild } from '@angular/core';
import { RequestorDto, ElectedOfficialDto, ReasonCodeDto, CommentDto, DocumentDto, AssignmentDto, AssignmentRequestDto, EmployeeDto } from '../requestorDto';
import { UtilService } from '../util.service';
import { APP_CONFIG } from '../app.config';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { ApiserviceService } from '../apiservice.service';
import { Cookie } from 'ng2-cookies';
declare let tinymce: any;
@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {
  @ViewChild('contentForm') contentForm: FormGroup;
  person: AssignmentDto;
  saveAssign: AssignmentRequestDto;
  assign: AssignmentDto;
  assignList: Array<AssignmentDto>;
  getAssignment: AssignmentRequestDto;
  curAssignment: AssignmentDto;
  tempAssignment:AssignmentDto;
  assignComment:CommentDto;
  getAssignmentsList: Array<AssignmentDto>;
  editAssign:AssignmentDto;
  updateAssign:AssignmentDto;
  deleteAssign:any;
  employees: Array<EmployeeDto>;
  employee: EmployeeDto;
  assignDivision: any;
  assignAssign: any;
  assignEmail: any;
  startDate: any;
  expectedEndDate: any;
  comments: any;
  userNameSearch:any;
  curassignEmail:any;
  curassignAssign:any;
  curassignDivision:any;
  curStartDate;any;
  curExpectedEndDate:any;
  userName:any;
  EditDate:any;
  personStartDate:any;
  personExpectedEndDate:any;
  public len: any = 0;
  public comment: CommentDto;
  public usersTemplate: Array<EmployeeDto> = [];
  public usersTemplateList: Array<EmployeeDto> = [];
  public keyword = 'username';
  public edit:boolean = false;
  public status:any;
  public showAdmin:boolean;
  public role:any;
  myDatePickerOptions1: IMyDpOptions = {
    disableUntil: {
      year: 0, month: 0, day: 0
    },
    showTodayBtn: false
  }
  myDatePickerOptions2: IMyDpOptions = {
    disableUntil: {
      year: 0, month: 0, day: 0
    },
    showTodayBtn: false
  }
  myDatePickerOptions3: IMyDpOptions = {
    disableUntil: {
      year: 0, month: 0, day: 0
    },
    showTodayBtn: false
  }

  config: any = {
    height: 250,
    width: '100%',
    theme: 'modern',
    plugins: 'textcolor wordcount colorpicker textpattern',
    toolbar: 'bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat',
    branding: false,
    menubar: false,
    statusbar: false
    };

  constructor(private utilService: UtilService, private router: Router, private _location: Location, private _apiservice: ApiserviceService, private http: Http, private modalService: NgbModal,private ref: ChangeDetectorRef) {
    
    this.assignList = new Array<AssignmentDto>();
    this.getAssignmentsList = new Array<AssignmentDto>();
    this.getAssignment = new AssignmentRequestDto();
    this.assign = new AssignmentDto();
    this.person = new AssignmentDto();
    this.saveAssign = new AssignmentRequestDto();
    this.employee = new EmployeeDto();
    this.employees = new Array<EmployeeDto>();
    this.usersTemplate = new Array<EmployeeDto>();
    this.usersTemplateList = new Array<EmployeeDto>();
    this.assignComment = new CommentDto();
    this.comment = new CommentDto();
    this.updateAssign = new AssignmentDto();
    this.config.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
      this.getData(editor);
      });
      };
   }

  ngOnInit() {
    this.getAssignments(localStorage.getItem('requestorID'));
    this.disableStartDate();
    this.userName=Cookie.get('userName');
    this.status=Cookie.get('status');
    if(this.status==='Open'){
      this.edit=false;
    }
    else{
      this.edit=true;
    }
    this.role=Cookie.get('role');
    if(UtilService.role!='ADMIN'){
      this.showAdmin=false;
    }
    if(UtilService.role==='ADMIN'){
      this.showAdmin=true;
    }
  }

  openEDIT(content:any,value:any)
  {
    if(this.edit===false){
    this.editAssign = new AssignmentDto();
    this.editAssign.assignmentId=value.assignmentId;
    this.editAssign.division=value.division;
    this.editAssign.username=value.username;
    this.editAssign.email=value.email;
    let d= new Date(value.startDate);
    this.EditDate=value.startDate;
    let ed= new Date(value.expectedEndDate);
    this.myDatePickerOptions3.disableUntil.day = d.getDate() - 1;
    this.myDatePickerOptions3.disableUntil.month = d.getMonth()+1;
    this.myDatePickerOptions3.disableUntil.year = d.getFullYear();
    let date=d.getDate();
    let month = d.getMonth()+1;
    let year=d.getFullYear();
    let datee=ed.getDate();
    let monthe = ed.getMonth()+1;
    let yeare=ed.getFullYear();
    this.curStartDate = {date:{month:month, day: date, year: year}};
    this.curExpectedEndDate={date:{month:monthe, day: datee, year: yeare}};
    this.editAssign.startDate=value.startDate;
    this.editAssign.expectedEndDate=value.expectedEndDate;
    this.editAssign.status=value.status;
    this.editAssign.assigncomment=value.assigncomment;
    this.modalService.open(content, { size: 'lg',backdrop:'static' });
    }
    else{

    }
  }
  getEditSave()
  {
    console.log(this.editAssign);
  }
  getStartDateE(value:any)
  {
    if(value.formatted === ""){
    }
    else{
      this.editAssign.startDate = value.formatted;
    }
  }
  getexceptDateE(value:any)
  {
    if(value.formatted === ""){

    }
    else{
      this.editAssign.expectedEndDate = value.formatted;
    }
  }
 
  setAssignments() {
    let url = APP_CONFIG.setAssignments;
    this.person.active = true;
    this.person.status = "Open";
    this.person.createdBy=this.userName;
    this.person.requestorId=localStorage.getItem('requestorID');
    // this.assignList.push(this.person);
    // this.saveAssign.comment = this.comment;
    // this.saveAssign.assignments = this.assignList;
    // this.saveAssign.createdBy = this.userName;
    // this.saveAssign.requestorID = localStorage.getItem('requestorID');
    // console.log(this.saveAssign);
    this.http.post(url, this.person)
      .map(res => res.json())
      .subscribe((data: any) => {
        console.log(data);
        this.getAssignments(localStorage.getItem('requestorID'));
        this.contentForm.reset();
        this.resetContent();
      }, error => {
        console.log(error);
      })
  }
  deleteAssignment(){
    this.editAssign = new AssignmentDto();
    this.editAssign.assignmentId=this.tempAssignment.assignmentId;
    this.editAssign.division=this.tempAssignment.division;
    this.editAssign.username=this.tempAssignment.username;
    this.editAssign.email=this.tempAssignment.email;
    this.editAssign.active=false;
    this.editAssign.createdBy=this.userName;
    this.editAssign.updatedBy=this.userName;
    this.editAssign.status=this.tempAssignment.status;
    this.editAssign.startDate=this.tempAssignment.startDate;
    this.editAssign.expectedEndDate=this.tempAssignment.expectedEndDate;
    this.editAssign.assigncomment=this.tempAssignment.assigncomment;
    this.editAssign.requestorId=localStorage.getItem('requestorID');
    let url = APP_CONFIG.updateAssigment;
    this.http.put(url,this.editAssign)
      .map(res => res.json())
      .subscribe((data: any) => {
        console.log(data);
        this.getAssignments(localStorage.getItem('requestorID'));
      }, error => {
        console.log(error);
      })
  }
  copyValue(value){
    this.tempAssignment = new AssignmentDto();
    this.tempAssignment=value;
  }
  openDelete(content2){
    if(this.edit===false){
    this.modalService.open(content2, { size: 'lg',backdrop:'static' });
    }
    else{

    }
  }
  openUpdate(content1){
    this.modalService.open(content1, { size: 'lg',backdrop:'static' });
  }
  updateAssigment(){
    let url = APP_CONFIG.updateAssigment;
    this.editAssign.active=true;
    this.editAssign.createdBy=this.userName;
    this.editAssign.updatedBy=this.userName;
    this.editAssign.requestorId=localStorage.getItem('requestorID');
    console.log(this.editAssign);
    this.http.put(url, this.editAssign)
      .map(res => res.json())
      .subscribe((data: any) => {
        console.log(data);
        this.getAssignments(localStorage.getItem('requestorID'));
      }, error => {
        console.log(error);
      })
  }
  
  resetContent() {
    this.assignDivision = '';
    this.assignEmail = '';
    this.personStartDate=null;
    this.personExpectedEndDate=null;
    this.userNameSearch ='';
    this.comment.notes = '';
    this.assignList = [];
  }
  getAssignments(requestorID) {
    this._apiservice.getAssignments(requestorID)
      .subscribe((data: any) => {
        console.log(data);
        this.getAssignmentsList = data.assignments;
        console.log(this.getAssignmentsList);
      }, error => {
        console.log(error);
      })
  }
  getStartDate(value) {
    this.myDatePickerOptions2.disableUntil.day = value.date.day - 1;
    this.myDatePickerOptions2.disableUntil.month = value.date.month;
    this.myDatePickerOptions2.disableUntil.year = value.date.year;
    if(value.formatted == ""){
      console.log(value.formatted);
    }
    else{
      this.person.startDate = value.formatted;
    }
  }
  disableStartDate() {
    let d = new Date();
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    this.myDatePickerOptions1.disableUntil.day = day - 1;
    this.myDatePickerOptions1.disableUntil.month = month + 1;
    this.myDatePickerOptions1.disableUntil.year = year;
  }


  getexceptDate(value) {
    if(value.formatted === ""){

    }
    else{

      console.log(value);
      this.person.expectedEndDate = value.formatted;
      console.log(this.person.expectedEndDate);
    }
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', backdrop:'static' });
    this.person = new AssignmentDto();
  }
  open1(content,index) {
    this.modalService.open(content, { size: 'lg' });
    this.assignComment.notes=this.getAssignmentsList[index].assigncomment;
  }
  open3(content3){
    this.modalService.open(content3,{ size: 'lg', backdrop:'static' });
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  getEmployeesFromLDAP(username) {
    this.usersTemplate=[];
    this.usersTemplateList=[];
    this._apiservice.getEmployeesFromLDAP(username)
      .subscribe((data: any) => {
        this.employees = data;
        for (let i = 0; i < this.employees.length; i++) {
          if (this.employees[i] != null) {
            this.employee = this.employees[i];
            this.usersTemplate.push(this.employee.username);
            this.usersTemplateList.push(this.employee);
          }
        }
      }, error => {
        console.log(error);
      })
  }
  setEmail(event) {
    console.log(event);
    for (let i = 0; i < this.usersTemplateList.length; i++) {
      if (this.usersTemplateList[i].username === event) {
        console.log(this.usersTemplateList[i].emailId);
        this.person.email = this.usersTemplateList[i].emailId;
        console.log(this.person.email);
      }
    }
  }
  onChangeSearch(event){
    if(event.length>=3){
    this.getEmployeesFromLDAP(event);
    }
    
    this.person.email='';
  }

  getData(editor: any) {
    this.len = 0;
    if (tinymce.activeEditor.getContent({ format: 'text' }).length > 5000) {
    let len: any = tinymce.activeEditor.getContent({ format: 'text' }).length;
    let re = len - 5000;
    let data: any = tinymce.activeEditor.getContent({ format: 'text' });
    let dat = data.substring(0, 5000);
    tinymce.activeEditor.setContent('<div id="idTextPanel" class="jqDnR" style="margin: 0px; padding: 0px; position: relative; color: #666666; font-family: Verdana, Geneva, Helvetica, sans-serif; font-size: 11px;"><p style="margin: 0px 0px 10px; padding: 0px; line-height: normal; font-family: Verdana, Geneva, sans-serif; font-size: 10px;">' + dat + '</p></div>');
    this.ref.detectChanges();
    }
    else if (tinymce.activeEditor.getContent() === "") {
    this.len = 0;
    this.ref.detectChanges();
    }
    else {
    this.len = tinymce.activeEditor.getContent({ format: 'text' }).length;
    this.ref.detectChanges();
    }
    };

}
@Component({
  template: `
    <div class="modal-header" style="background-color: black">
    <h4 class="modal-title" id="modal-basic-title">Info</h4>
  </div>
  <div class="modal-body">
    <p>Assigment has been submitted!</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="goBack()">Ok</button>
  </div>
    `
})
export class assign {
  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  goBack() {
    this.activeModal.close('Close click');
  }
}