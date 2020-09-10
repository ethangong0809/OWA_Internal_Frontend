import { Component, OnInit,ChangeDetectorRef ,ViewChild, ElementRef } from '@angular/core';
import { UtilService } from '../util.service';
import { getViewData } from '@angular/core/src/render3/instructions';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { RequestorDto, ElectedOfficialDto, ReasonCodeDto, CommentDto, DocumentDto, AssignmentDto, AssignmentRequestDto, EmployeeDto } from '../requestorDto';
import { APP_CONFIG } from '../app.config';
import { Http } from '@angular/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { Cookie } from 'ng2-cookies';
declare let tinymce: any;

@Component({
  selector: 'app-electedofficial',
  templateUrl: './electedofficial.component.html',
  styleUrls: ['./electedofficial.component.css'],
  providers: [ApiserviceService]
})
export class ElectedofficialComponent implements OnInit {
  @ViewChild('saveFrom') saveFrom: FormGroup;
  @ViewChild('editForm') editForm: FormGroup;
  @ViewChild('myInput') myInputVariable: ElementRef;
  mask: any[] = ['(', /[1-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  mask1: any[] = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public requestor: RequestorDto;
  public requestor1: RequestorDto;
  public elected: ElectedOfficialDto;
  public elected1: ElectedOfficialDto;
  public reason: ReasonCodeDto;
  public comment: CommentDto;
  data: boolean;
  noFile: any;
  public showMove:boolean = false;
  public res: any;
  public showConstituent: boolean;
  public showConstituent1: boolean;
  public resttime: any;
  public showOne = true;
  public showTwo = false;
  public showReason: boolean = false;
  public tempDocName: any;
  public documentDTO: DocumentDto;
  public edit: boolean = false;
  documents: Array<DocumentDto>;
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
  assignComment:CommentDto;
  getAssignmentsList: Array<AssignmentDto>;
  employees: Array<EmployeeDto>;
  employee: EmployeeDto;
  assignDivision: any;
  assignAssign: any;
  assignEmail: any;
  startDate: any;
  expectedEndDate: any;
  public showComments: any;
  showCommentHistory = false;
  showPrint = true;
  showButton = false;
  showAttach = false;
  showAss = false;
  userNameSearch:any;
  public openToOpenSelect: boolean;
  public closedSelect: boolean;
  public closeToOpenSelect: boolean;
  public id: any;
  public usersTemplate: Array<EmployeeDto> = [];
  public usersTemplateList: Array<EmployeeDto> = [];
  public keyword = 'username';
  public showNav:boolean = false;
  comments: any;
  showSplit = false;
  newAttribute: any = {};
  openReasonList: Array<ReasonCodeDto>;
  closedReasonList: Array<ReasonCodeDto>;
  userName:any;
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
  constructor(private utilService: UtilService, private router: Router, private _location: Location, private _apiservice: ApiserviceService, private http: Http, private modalService: NgbModal,private ref: ChangeDetectorRef) {
    this.requestor = new RequestorDto();
    this.requestor1 = new RequestorDto();
    this.elected = new ElectedOfficialDto();
    this.elected1 = new ElectedOfficialDto();
    this.reason = new ReasonCodeDto();
    this.comment = new CommentDto();
    this.documents = new Array<DocumentDto>();
    this.doc = new DocumentDto();
    this.documentDTO = new DocumentDto();
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
    this.loadScript('assets/js/translate.js');
    this.loadScript('assets/js/menu.js');
    this.config.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
      this.getData(editor);
      });
      };
  }

  ngOnInit() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    this.userName=Cookie.get('userName');
    this.utilService.changDocTitle("DMAS Forms - Elected Official Request");
    this.getRequestTable(6, this.id);
    localStorage.setItem('requestorID',this.id);
    this.utilService.show();
    this.utilService.homeShow();
    this.utilService.logShow();
    this.getReasonCodes(6);
    console.log(typeof(this.requestor.ticketID));
    Cookie.set('TicketID',this.requestor.ticketID);
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
        this.elected = this.requestor.electedOfficial;
        this.elected1 = this.requestor1.electedOfficial;
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
        this.comments = this.requestor1.comments;
        if (this.elected.constituent == 'Yes') {
          this.showConstituent = true;
        }
        if (this.elected.constituent == 'No') {
          this.showConstituent = false;
        }
        if (this.elected1.constituent == 'Yes') {
          this.showConstituent1 = true;
        }
        if (this.elected1.constituent == 'No') {
          this.showConstituent1 = false;
        }
        console.log(this.requestor);
        console.log(this.requestor1);
      }, error => {
        console.log(error);
      });
  }

  showOr() {
    this.showReason=false;
    this.showOne = true;
    this.showTwo = false;
    this.showSplit = false;
    this.showComments = false;
    this.showButton = false;
    this.showCommentHistory = false;
    this.showAttach = false;
    this.showAss = false;
    this.showMove=false;
  }
  showInter() {
    this.showMove=false;
    this.showReason=false;
    this.showOne = false;
    this.showTwo = true;
    this.showSplit = false;
    this.showComments = true;
    this.showButton = true;
    this.showCommentHistory = false;
    this.showAttach = false;
    this.showAss = false;
  }
  showCom() {
    this.showMove=false;
    this.showReason=false;
    this.showOne = false;
    this.showTwo = false;
    this.showSplit = true;
    this.showComments = true;
    this.showCommentHistory = false;
    this.showButton = true;
    this.showAttach = false;
    this.showAss = false;
  }
  showHis() {
    this.showMove=false;
    this.showReason=false;
    this.showOne = false;
    this.showTwo = false;
    this.showSplit = false;
    this.showComments = false;
    this.showButton = false;
    this.showCommentHistory = true;
    this.showAttach = false;
    this.showAss = false;
  }
  showAttachment() {
    this.showMove=false;
    this.showReason=false;
    this.showOne = false;
    this.showTwo = false;
    this.showSplit = false;
    this.showComments = false;
    this.showButton = false;
    this.showCommentHistory = false;
    this.showAttach = true;
    this.showAss = false;
    this.getDocuments(this.requestor1.id);
  }
  showAssign() {
    this.showMove=false;
    this.showReason=false;
    this.showOne = false;
    this.showTwo = false;
    this.showSplit = false;
    this.showComments = false;
    this.showButton = false;
    this.showCommentHistory = false;
    this.showAttach = false;
    this.showAss = true;

    this.disableStartDate();
    this.getAssignments(this.requestor1.id);
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
  showconstituent(value) {
    if (value === "Yes") {
      this.showConstituent1 = true;
    }
    if (value === "No") {
      this.showConstituent1 = false;
    }
  }
  saveElectedRequest() {
    let url = APP_CONFIG.updateRequest;
    this.comment.createdBy = this.userName;
    this.requestor1.comment = this.comment;
    this.requestor1.reasonID = this.comment.reasonID;
    this.elected1.officialFirstname=this.requestor1.electedOfficial.officialFirstname;
    this.elected1.officialLastname=this.requestor1.electedOfficial.officialLastname;
    this.elected1.updatedBy = this.userName;
    this.requestor1.updatedBy = this.userName;
    console.log(this.requestor1);
    this.http.post(url, this.requestor1)
      .map(res => res.json())
      .subscribe((data: any) => {
        console.log(data);
        if (this.requestor1.previousStatus == 'Open' && this.requestor1.status == 'Open') {
          this.modalService.open(open6);
        }
        if (this.requestor1.previousStatus == 'Open' && this.requestor1.status == 'Closed') {
          this.modalService.open(close6);
        }
        if (this.requestor1.previousStatus == 'Closed' && this.requestor1.status == 'Open') {
          this.modalService.open(reopen6);
        }
        if(this.requestor1.previousStatus=='Closed' && this.requestor1.status== 'Closed') {
          this.modalService.open(close6);
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
        console.log(this.openReasonList);
        console.log(this.closedReasonList);
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


    formData.append("data", new Blob([JSON.stringify({

      "ticketID": this.requestor1.ticketID,
      "requestorID": this.requestor1.id,
      "documents": this.documents,
      "createdBy": this.userName
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
        this.modalService.open(upload6);
        this.showAttachment();
        this.saveFrom.reset();
        this.myInputVariable.nativeElement.value = "";
        this.documents = [];
        this.selectedFiles = [];
        this.documentList = [];
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
        this.modalService.open(delete6);
        this.showAttachment();
      }, error => {
        console.log(error);
      })
  }
  documentDownload(id, filename) {
    window.open(APP_CONFIG.documents + id + '/' + filename, '_blank');
  }
  selectFile(event) {
    if (this.documents === null) {
      this.documents = [];
      this.documentDTO = new DocumentDto();
      this.documentDTO.fileName = event.target.files[0].name;
      this.documentDTO.documentName = this.documentName;
      this.documents.push(this.documentDTO);
      this.selectedFiles.push(event.target.files[0]);
    }
    else {
      this.documentDTO = new DocumentDto();
      this.documentDTO.fileName = event.target.files[0].name;
      this.documentDTO.documentName = this.documentName;
      this.documents.push(this.documentDTO);
      this.selectedFiles.push(event.target.files[0]);
    }

    console.log(this.documents);
    console.log(this.selectedFiles);
  }
  selectFile1(event) {
    // if (this.documents ===null) {
    // this.documents = [];
    // this.documentDTO = new DocumentDto();
    // this.documentDTO.fileName = event.target.files[0].name;
    // this.documentDTO.documentName = this.doc.documentName;
    // this.documents.push(this.documentDTO);
    // this.selectedFiles.push(event.target.files[0]);
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
  setDocName(event) {
    this.tempDocName = event.target.value;
  }
  handleSortReceivedOn(value) {

    if (!this.data) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.comments.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.data = true;
    }
    else {
      let orderByValue = value;
      this.comments.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.data = false;
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
    this.person.assigncomment=this.comment.notes;
    this.person.createdBy=this.userName;
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
        this.modalService.open(assign6);
        this.showAssign();
        this.resetContent();
      }, error => {
        console.log(error);
      })
  }
  resetContent() {
    this.assignDivision = '';
    this.assignEmail = '';
    this.userNameSearch ='';
    this.startDate = '';
    this.expectedEndDate = '';
    this.comment.notes = '';
    this.assignList = [];
  }
  getAssignments(requestorID) {
    this._apiservice.getAssignments(requestorID)
      .subscribe((data: any) => {
        console.log(data);
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
      this.startDate = value.formatted;
      console.log(this.startDate);
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
      this.expectedEndDate = value.formatted;
      console.log(this.expectedEndDate);
    }
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  open1(content,index) {
    this.modalService.open(content, { size: 'lg' });
    this.assignComment.notes=this.getAssignmentsList[index].assigncomment;
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
  onChangeSearch(event){
    console.log(event);
    this.assignEmail='';
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
export class open6 {
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
export class close6 {
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
export class reopen6 {
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
export class upload6 {
  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  goBack() {
    this.router.navigate(['electedofficial']);
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
export class delete6 {
  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  goBack() {
    this.router.navigate(['electedofficial']);
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
export class assign6 {
  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  goBack() {
    this.router.navigate(['media']);
    this.activeModal.close('Close click');
  }
}