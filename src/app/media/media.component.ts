import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { UtilService } from '../util.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiserviceService } from '../apiservice.service';
import { RequestorDto, MediaDto, ReasonCodeDto, CommentDto, DocumentDto, AssignmentDto, AssignmentRequestDto, EmployeeDto } from '../requestorDto'
import { APP_CONFIG } from '../app.config';
import { Http } from '@angular/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare let tinymce: any;
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { Cookie } from 'ng2-cookies';


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
  providers: [ApiserviceService]
})
export class MediaComponent implements OnInit {
  @ViewChild('saveForm') saveForm: FormGroup;
  @ViewChild('editForm') editForm: FormGroup;
  @ViewChild('myInput') myInputVariable: ElementRef;
  @ViewChild('myInput1') myInputVariable1: ElementRef;
  mask: any[] = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public id: any;
  requestor: RequestorDto;
  requestor1: RequestorDto;
  mediadata: MediaDto;
  mediadata1: MediaDto;
  reason: ReasonCodeDto;
  comment: CommentDto;
  public tempDocName: any;
  public documentDTO: DocumentDto;
  documents: Array<DocumentDto>=[];
  document: DocumentDto;
  mydocument: any;
  persons: Array<any> = [];
  person: AssignmentDto;
  doc: DocumentDto;
  existingList: Array<DocumentDto>;
  archiveList: Array<DocumentDto>;
  documentList: Array<any> = [];
  selectedFiles: any = [];
  documentName: any;
  saveAssign: AssignmentRequestDto;
  assign: AssignmentDto;
  assignList: Array<AssignmentDto>;
  getAssignment: AssignmentRequestDto;
  curAssignment: AssignmentDto;
  getAssignmentsList: Array<AssignmentDto>;
  employees: Array<EmployeeDto>;
  employee: EmployeeDto;
  assignDivision: any;
  assignAssign: any;
  assignEmail: any;
  startDate: any;
  expectedEndDate: any;
  assigncomment: any;
  public showReason: boolean = false;
  public showComments: boolean = false;
  public edit: boolean = false;
  showOne = true
  showTwo = false;
  showSplit = false;
  showCommentHistory = false;
  showPrint = true;
  showButton = false;
  showAttach = false;
  showAss = false;
  selectedFile: any;

  userNameSearch: any;
  public openToOpenSelect: boolean;
  public closedSelect: boolean;
  public closeToOpenSelect: boolean;
  public usersTemplate: Array<EmployeeDto> = [];
  public usersTemplateList: Array<EmployeeDto> = [];
  public keyword = 'username';
  comments: any;
  openReasonList: Array<ReasonCodeDto>;
  closedReasonList: Array<ReasonCodeDto>;
  data: boolean;
  ifAd1 = false;
  ifAd2 = false;
  ifZip = false;
  ifState = false;
  ifValid = false;
  ifCity = false;
  public showMove:boolean = false;
  public showNav:boolean =false;
  userName: any;
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

  public len: any = 0;
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
  constructor(private utilService: UtilService, private router: Router, private _location: Location, private _apiservice: ApiserviceService, private http: Http, private modalService: NgbModal, private ref: ChangeDetectorRef) {
    this.requestor = new RequestorDto();
    this.requestor1 = new RequestorDto();
    this.mediadata = new MediaDto();
    this.mediadata1 = new MediaDto();
    this.reason = new ReasonCodeDto();
    this.comment = new CommentDto();
    this.documents = new Array<DocumentDto>();
    this.assignList = new Array<AssignmentDto>();
    // this.documentList=new Array<DocumentDto>();
    this.getAssignmentsList = new Array<AssignmentDto>();
    this.getAssignment = new AssignmentRequestDto();
    this.doc = new DocumentDto();
    // this.mydocument = new DocumentDto();
    this.documentDTO = new DocumentDto();
    this.assign = new AssignmentDto();
    this.person = new AssignmentDto();
    this.saveAssign = new AssignmentRequestDto();
    this.employee = new EmployeeDto();
    this.employees = new Array<EmployeeDto>();
    this.documentDTO = new DocumentDto();
    this.usersTemplate = new Array<EmployeeDto>();
    this.usersTemplateList = new Array<EmployeeDto>();
    this.loadScript('assets/js/translate.js');
    this.loadScript('assets/js/menu.js');
    this.config.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
        this.getData(editor);
      });
    };
  }

  ngOnInit() {
    this.userName = Cookie.get('userName');
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    this.utilService.changDocTitle("DMAS Forms - Media Request");
    this.getRequestTable(5, this.id);
    localStorage.setItem('requestorID', this.id);
    Cookie.set('TicketID',this.requestor1.ticketID);
    this.utilService.show();
    this.utilService.homeShow();
    this.utilService.logShow();
    this.getReasonCodes(5);
    if(UtilService.role!='ADMIN'){
      this.showNav=false;
    }
    if(UtilService.role=='ADMIN'){
      this.showNav=true;
    }
  }

  moveView(){
this.showMove=true;
this.showOne = false;
this.showTwo = false;
this.showSplit = false;
this.showComments = false;
this.showButton = false;
this.showCommentHistory = false;
this.showAttach = false;
this.showAss = false;
this.showReason=false;
        
        
  }
  loadScript(url) {
    //console.log('preparing to load menu and translate...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  getRequestTable(formID, id) {
    this.id = JSON.parse(localStorage.getItem('tempID'));
    this._apiservice.getRequest(formID, this.id)
      .subscribe((data: any) => {
        this.requestor = data.originalRequest;
        this.requestor1 = data.internalRequest;
        Cookie.set('TicketID',this.requestor.ticketID);
        this.comments = this.requestor1.comments;
        this.mediadata = this.requestor.media;
        this.mediadata1 = this.requestor1.media;
        this.requestor1.previousStatus = this.requestor1.status;
        Cookie.set('status',this.requestor1.status);
        if(this.requestor1.status==='Closed'){
          this.edit=true;
        }
        if (this.requestor1.status == 'Open') {
          this.openToOpenSelect = true;
          this.closedSelect = false;
          this.closeToOpenSelect = false;
        }
        if (this.requestor1.status == 'Closed') {
          this.openToOpenSelect = false;
          this.closedSelect = true;
          this.closeToOpenSelect = false;
        }
      }, error => {
        console.log(error);
      })
  }
  showOr() {
    this.showOne = true;
    this.showTwo = false;
    this.showSplit = false;
    this.showComments = false;
    this.showButton = false;
    this.showCommentHistory = false;
    this.showAttach = false;
    this.showAss = false;
    this.showMove=false;
    this.showReason=false;
  }
  showInter() {
    this.showMove=false;
    this.showOne = false;
    this.showTwo = true;
    this.showSplit = false;
    this.showComments = true;
    this.showButton = true;
    this.showCommentHistory = false;
    this.showAttach = false;
    this.showAss = false;
    this.showReason=false;
  }
  showCom() {
    this.showMove=false;
    this.showOne = false;
    this.showTwo = false;
    this.showSplit = true;
    this.showComments = true;
    this.showCommentHistory = false;
    this.showButton = true;
    this.showAttach = false;
    this.showAss = false;
    this.showReason=false;
  }
  showHis() {
    this.showMove=false;
    this.showOne = false;
    this.showTwo = false;
    this.showSplit = false;
    this.showComments = false;
    this.showButton = false;
    this.showCommentHistory = true;
    this.showAttach = false;
    this.showAss = false;
    this.showReason=false;
  }
  showAttachment() {
    this.showMove=false;
    this.showOne = false;
    this.showTwo = false;
    this.showSplit = false;
    this.showComments = false;
    this.showButton = false;
    this.showCommentHistory = false;
    this.showAttach = true;
    this.showAss = false;
    this.getDocuments(this.requestor1.id);
    this.showReason=false;
  }
  closedTicket(){
    this.showOne = false;
    this.showTwo = false;
    this.showSplit = false;
    this.showComments = true;
    this.showButton = true;
    this.showCommentHistory = false;
    this.showAttach = false;
    this.showAss = false;
    if(UtilService.role==='ADMIN'){
      this.showReason=true;
      }else{
        this.showReason=false;
      }
  }
  showAssign() {
    this.showMove=false;
    this.showOne = false;
    this.showTwo = false;
    this.showSplit = false;
    this.showComments = false;
    this.showButton = false;
    this.showCommentHistory = false;
    this.showAttach = false;
    this.showAss = true;
    // if(UtilService.role==='ADMIN'){
    //   this.showAss=true;
    //   }else{
    //     this.showAss=false;
    //   }
    this.disableStartDate();
    this.showReason=false;
  }
  navigateBack() {
    this._location.back();
  }
  clickStatus(value) {
    if (value == 'Closed') {
      this.openToOpenSelect = false;
      this.closedSelect = true;
      this.closeToOpenSelect = false;
    }
    if (value == 'Open' && this.requestor1.previousStatus == 'Closed') {
      this.openToOpenSelect = false;
      this.closedSelect = false;
      this.closeToOpenSelect = true;
    }
    if (value == 'Open' && this.requestor1.previousStatus == 'Open') {
      this.openToOpenSelect = true;
      this.closedSelect = false;
      this.closeToOpenSelect = false;
    }
  }
  saveMediaRequest() {
    let url = APP_CONFIG.updateRequest;
    this.comment.createdBy = this.userName;

    // if((this.requestor1.fax!=null&&this.fax2!=null)||(this.requestor1.fax===null&&this.fax2!=null)){
    //     this.requestor1.fax=this.fax2;
    // }
    // else{
    //   this.requestor1.fax=this.fax1;
    // }
    // if(this.requestor1.fax===null && this.fax2===null){
    //   this.requestor1.fax=null;
    // }
    this.requestor1.comment = this.comment;
    this.requestor1.reasonID = this.comment.reasonID;
    this.mediadata1.updatedBy = this.userName;
    this.requestor1.updatedBy = this.userName;
    console.log(this.requestor1);
    this.http.post(url, this.requestor1)
      .map(res => res.json())
      .subscribe((data: any) => {
        console.log(data);
        if (this.requestor1.previousStatus == 'Open' && this.requestor1.status == 'Open') {
          this.modalService.open(open5);
        }
        if (this.requestor1.previousStatus == 'Open' && this.requestor1.status == 'Closed') {
          this.modalService.open(close5);
        }
        if (this.requestor1.previousStatus == 'Closed' && this.requestor1.status == 'Open') {
          this.modalService.open(reopen5);
        }
        this.comments = data.internalRequest.comments;
        this.editForm.reset();
      }, error => {
        console.log(error);
      })
  }
  getReasonCodes(formID) {
    this._apiservice.getReasonCodes(formID)
      .subscribe((data: any) => {
        this.openReasonList = data.open;
        this.closedReasonList = data.closed;
        // console.log(this.openReasonList);
        // console.log(this.closedReasonList);
      }, error => {
        console.log(error);
      })
  }
  getDocuments(requestorID) {
    this._apiservice.getDocuments(requestorID)
      .subscribe((data: any) => {
        this.existingList = data.existingDocuments;
        this.archiveList = data.archiveDocuments;
        console.log(this.existingList);
        console.log(this.archiveList);
      }, error => {
        console.log(error);
      })
  }
  saveDocuments() {
    let url = APP_CONFIG.saveDocuments;
    let formData = new FormData();
    // this.documents.push(this.documentDTO);
    // this.selectedFiles.push(event.target.files[0]);

    formData.append("data", new Blob([JSON.stringify({

      "ticketID": this.requestor1.ticketID,
      "requestorID": this.requestor1.id,
      "documents": this.documents,
      // "createdBy": this.userName
      "createdBy": "this.userName"
    })], {
        type: "application/json"
      }));
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append("files", this.selectedFiles[i]);
    }


    this.http.post(url, formData)
      .map(res => res.json())
      .subscribe((data: any) => {
        console.log(data);
        this.documentDTO = new DocumentDto();
        this.modalService.open(upload5);
        this.showAttachment();
        this.saveForm.reset();
        this.myInputVariable.nativeElement.value = "";
        this.documentList = [];
        this.documents = [];
        this.selectedFiles = [];
      }, error => {
        console.log(error);
      })
  }
  deleteDocument(existingDocument) {
    let url = APP_CONFIG.deleteDocument;
    existingDocument.updatedBy = this.userName
    this.http.post(url, existingDocument)
      .map(res => res.json())
      .subscribe((data: any) => {

        console.log(data);
        this.modalService.open(delete5);
        this.showAttachment();
      }, error => {
        console.log(error);
      })
  }
  documentDownload(id, filename) {
    window.open(APP_CONFIG.documents + id + '/' + filename, '_blank');
  }
  selectFile(event) {
      this.documentDTO.fileName = event.target.files[0].name;
      // this.documents.push(this.documentDTO);
      // this.selectedFiles.push(event.target.files[0]);
      if(this.documentName!=null){
        this.documentDTO.documentName = this.documentName;
      }
      if(this.documentDTO.documentName!=null&&this.documentDTO.fileName!=null){
        this.documents.push(this.documentDTO);
      }
      // this.documentDTO.fileName = event.target.files[0].name;
      // this.documentDTO.documentName = this.documentName;
      // this.documents.push(this.documentDTO);
      this.selectedFiles.push(event.target.files[0]);
    

    console.log(this.documents);
    console.log(this.selectedFiles);
  }
  selectFile1(event) {
    // if (this.documents ===null) {
    //   this.documents = [];
    //   this.documentDTO = new DocumentDto();
    //   this.documentDTO.fileName = event.target.files[0].name;
    //   this.documentDTO.documentName = this.doc.documentName;
    //   this.documents.push(this.documentDTO);
    //   this.selectedFiles.push(event.target.files[0]);
    // }
    // else {
    this.documentDTO = new DocumentDto();
    this.documentDTO.fileName = event.target.files[0].name;
    this.documentDTO.documentName = this.tempDocName;
    this.documents.push(this.documentDTO);
    this.selectedFiles.push(event.target.files[0]);

    // }

    console.log(this.documents);
    console.log(this.selectedFiles);
  }
  setDocName() {
    document.getElementById("myInputdisable").removeAttribute("disabled");
    this.documentDTO.documentName=this.documentName;
    if(this.documentDTO.documentName!=null&&this.documentDTO.fileName!=null){
      this.documents.push(this.documentDTO);
    }
  }
  setDocName1(event, index) {
    this.tempDocName = event.target.value;
    document.getElementById("myInput1disable").removeAttribute("disabled");
    // this.documents[index].documentName=this.tempDocName;

  }
  getphonenumber(e, value) {
    let k = e.charCode || e.keyCode || 0;
    if (k != 8 && k != 9) {
      if (value.length === 3) {
        this.requestor1.phone = value + '-';
      }
      if (value.length === 7) {
        this.requestor1.phone = value + '-';
      }
    }
    return (k == 8 || k == 9 || k == 17 || k == 46 || (k >= 48 && k <= 57) || (k >= 96 && k <= 105));
  }
  check_mailing1(value) {
    if (value.length != 0) {
      this.ifAd1 = true;
    }
    if (value.length === 0) {
      this.ifAd1 = false;
    }
  }
  check_mailing2(value) {
    if (value.length != 0) {
      this.ifAd2 = true;
    }
    if (value.length === 0) {
      this.ifAd2 = false;
    }
  }
  check_city(value) {
    if (value.length != 0) {
      this.ifCity = true;
    }
    if (value.length === 0) {
      this.ifCity = false;
    }
  }
  check_zip(value) {
    if (value.length != 0) {
      this.ifZip = true;
    }
    if (value.length === 0) {
      this.ifZip = false;
    }
    if (value.length < 5 && value.length > 0) {
      this.ifValid = true;
    }
    if (value.length === 0 || value.length === 5) {
      this.ifValid = false;
    }
  }
  check_state(value) {

    if (value === "AL" || value === "AK" || value === "AZ" || value === "CA" || value === "CO" || value === "CT" ||
      value === "DE" || value === "DC" || value === "FL" || value === "GA" || value === "HI" || value === "ID" ||
      value === "IL" || value === "IN" || value === "IA" || value === "KS" || value === "KY" || value === "LA" ||
      value === "ME" || value === "MD" || value === "MA" || value === "MI" || value === "MN" || value === "MS" ||
      value === "MO" || value === "MT" || value === "NE" || value === "NV" || value === "NH" || value === "NJ" ||
      value === "NM" || value === "NY" || value === "NC" || value === "ND" || value === "OH" || value === "OK" ||
      value === "OR" || value === "PA" || value === "RI" || value === "SC" || value === "SD" || value === "TN" ||
      value === "TX" || value === "UT" || value === "VT" || value === "VA" || value === "WA" || value === "WV" ||
      value === "WI" || value === "WY" || value === "AR") {
      this.ifState = true;
    }
    else {
      this.ifState = false;
    }
  }
  cancel() {
    this.router.navigate(['requests'])
  }
  onPrint() {
    window.print();
  }
  printComponent(cmpName) {
    let mywindow = window.open();
    let printContents = document.getElementById(cmpName);
    let htmlToPrint = '' +
      '<style type="text/css">' +
      'table th, table td {' +
      'border:1px solid #000;' +
      'padding;0.5em;' +
      '}' +
      '</style>';
    htmlToPrint += printContents.outerHTML;
    mywindow.document.write(htmlToPrint);
    mywindow.print();
    mywindow.close();
  }
  addDoc() {
    this.documentList.push(this.mydocument);
    this.mydocument = {};
    document.getElementById("myInputdisable").setAttribute("disabled", "disabled");
    document.getElementById("myInput1disable").setAttribute("disabled", "disabled");
  }
  deleteDoc(index) {
    this.documentList.splice(index, 1);
    this.selectedFiles.splice(index, 1);
    this.documents.splice(index, 1);
  }
  addPerson() {
    this.persons.push(this.person);
    this.person = new AssignmentDto();
  }
  deletePerson(index) {
    this.persons.splice(index, 1);
    this.assignList.splice(index, 1);
  }
  setAssignments() {
    let url = APP_CONFIG.setAssignments;
    this.person.division = this.assignDivision;
    this.person.email = this.assignEmail;
    this.person.username = this.userNameSearch;
    this.person.startDate = this.startDate;
    this.person.expectedEndDate = this.expectedEndDate;
    this.person.active = true;
    this.assignList.push(this.person);
    this.saveAssign.comment = this.comment;
    this.saveAssign.assignments = this.assignList;
    this.saveAssign.createdBy = this.userName;
    this.saveAssign.requestorID = this.requestor1.id;
    console.log(this.saveAssign);
    this.http.post(url, this.saveAssign)
      .map(res => res.json())
      .subscribe((data: any) => {
        console.log(data);
        this.modalService.open(assign5);
        this.showAssign();
        this.resetContent();
      }, error => {
        console.log(error);
      })
  }
  resetContent() {
    this.assignDivision = '';
    this.assignEmail = '';
    this.userNameSearch = '';
    this.startDate = '';
    this.expectedEndDate = '';
    this.comment.notes = '';
    this.assignList = [];
  }
  getAssignments(requestorID) {
    this._apiservice.getAssignments(requestorID)
      .subscribe((data: any) => {
        this.getAssignment = data;
        this.getAssignmentsList = this.getAssignment.assignments;
        console.log(this.getAssignmentsList);
      }, error => {
        console.log(error);
      })
  }
  getStartDate(value) {
    this.myDatePickerOptions2.disableUntil.day = value.date.day - 1;
    this.myDatePickerOptions2.disableUntil.month = value.date.month;
    this.myDatePickerOptions2.disableUntil.year = value.date.year;
    if (value != undefined) {
      this.startDate = value;
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
    if (value != undefined) {
      this.expectedEndDate = value;
    }
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  getEmployeesFromLDAP(username) {
    this._apiservice.getEmployeesFromLDAP(username)
      .subscribe((data: any) => {
        this.employees = data;
        for (let i = 0; i < this.employees.length; i++) {
          if (this.employees[i] != null) {
            this.employee = this.employees[i];
            this.usersTemplateList.push(this.employee);
            this.usersTemplate.push(this.employee.username);
          }
        }
      }, error => {
        console.log(error);
      })
  }
  setEmail(event) {
    for (let i = 0; i < this.usersTemplateList.length; i++) {
      if (this.usersTemplateList[i].username === event) {
        this.assignEmail = this.usersTemplateList[i].emailId;
      }
    }
  }
  onChangeSearch(event) {
    console.log(event);
    this.assignEmail = '';
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
    <p>Ticket has been updated!</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="goBack()">Ok</button>
  </div>
    `
})
export class open5 {
  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  goBack() {
    this.router.navigate(['requests']);
    this.activeModal.close('Close click');
  }
}

@Component({
  template: `
    <div class="modal-header" style="background-color: black">
    <h4 class="modal-title" id="modal-basic-title">Info</h4>
  </div>
  <div class="modal-body">
    <p>Ticket has been closed!</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="goBack()">Ok</button>
  </div>
    `
})
export class close5 {
  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  goBack() {
    this.router.navigate(['requests']);
    this.activeModal.close('Close click');
  }
}

@Component({
  template: `
    <div class="modal-header" style="background-color: black">
    <h4 class="modal-title" id="modal-basic-title">Info</h4>
  </div>
  <div class="modal-body">
    <p>Ticket has been reopened!</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="goBack()">Ok</button>
  </div>
    `
})
export class reopen5 {
  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  goBack() {
    this.router.navigate(['requests']);
    this.activeModal.close('Close click');
  }
}
@Component({
  template: `
    <div class="modal-header" style="background-color: black">
    <h4 class="modal-title" id="modal-basic-title">Info</h4>
  </div>
  <div class="modal-body">
    <p>Document has been uploaded!</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="goBack()">Ok</button>
  </div>
    `
})
export class upload5 {
  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  goBack() {
    this.router.navigate(['media']);
    this.activeModal.close('Close click');
  }
}
@Component({
  template: `
    <div class="modal-header" style="background-color: black">
    <h4 class="modal-title" id="modal-basic-title">Info</h4>
  </div>
  <div class="modal-body">
    <p>Document has been deleted!</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="goBack()">Ok</button>
  </div>
    `
})
export class delete5 {
  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  goBack() {
    this.router.navigate(['media']);
    this.activeModal.close('Close click');
  }
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
export class assign5 {
  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  goBack() {
    this.router.navigate(['media']);
    this.activeModal.close('Close click');
  }



  
}