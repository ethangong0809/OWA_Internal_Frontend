import { Component,ChangeDetectorRef ,OnInit,ElementRef,ViewChild } from '@angular/core';
import { RequestorDto, ElectedOfficialDto, ReasonCodeDto, CommentDto, DocumentDto, AssignmentDto, AssignmentRequestDto, EmployeeDto } from '../requestorDto';
import { UtilService } from '../util.service';
import { APP_CONFIG } from '../app.config';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { ApiserviceService } from '../apiservice.service';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  @ViewChild('myInput') myInputVariable: ElementRef;
  public id: any;
  public userName:any;
  public TicketID:any;
  public requestorID;any;
  reason: ReasonCodeDto;
  comment: CommentDto;
  public tempDocName: any;
  public documentDTO: DocumentDto;
  public edit:boolean = false;
  public status:any;
  existingDocument:DocumentDto;
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
  public showReason: boolean;
  public showComments: boolean = false;
  showOne = true
  showTwo = false;
  showSplit = false;
  showCommentHistory = false;
  showPrint = true;
  showButton = false;
  showAttach = false;
  showAss = false;
  selectedFile: any;
  constructor(private utilService: UtilService, private router: Router, private _location: Location, private _apiservice: ApiserviceService, private http: Http, private modalService: NgbModal,private ref: ChangeDetectorRef) {
    this.doc = new DocumentDto();
    // this.mydocument = new DocumentDto();
    this.documentDTO = new DocumentDto();
    this.documents = new Array<DocumentDto>();
   }

  ngOnInit() {
    this.getDocuments(localStorage.getItem('requestorID'));
    this.userName=Cookie.get('userName');
    this.requestorID=localStorage.getItem('requestorID');
    this.TicketID=Cookie.get('TicketID');
    this.status=Cookie.get('status');
    if(this.status==='Open'){
      this.edit=false;
    }
    else{
      this.edit=true;
    }
    this.getDocuments(this.requestorID);
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

      "ticketID": this.TicketID,
      "requestorID": this.requestorID,
      "documents": this.documents,
      "createdBy": this.userName
      // "createdBy": "this.userName"
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
        this.getDocuments(this.requestorID);
        this.myInputVariable.nativeElement.value = "";
        this.documentName="";
        this.documentList = [];
        this.documents = [];
        this.selectedFiles = [];
      }, error => {
        console.log(error);
      })
  }
  copyValue(value){
    this.existingDocument = new DocumentDto();
    this.existingDocument=value;
  }
  deleteDocument() {
    let url = APP_CONFIG.deleteDocument;
    this.existingDocument.updatedBy = this.userName
    this.http.post(url, this.existingDocument)
      .map(res => res.json())
      .subscribe((data: any) => {

        console.log(data);
        this.getDocuments(this.requestorID);
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
  setDocName() {
    document.getElementById("myInputdisable").removeAttribute("disabled");
    this.documentDTO.documentName=this.documentName;
    if(this.documentDTO.documentName!=null&&this.documentDTO.fileName!=null){
      this.documents.push(this.documentDTO);
    }
  }
  open1(content1){
    this.modalService.open(content1, { size: 'lg', backdrop:'static' });
  }
  open2(content2){
    this.modalService.open(content2, { size: 'lg', backdrop:'static' });
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
    this.activeModal.close('Close click');
  }
}