import { Component, OnInit, ViewChild,ChangeDetectorRef ,ElementRef, Renderer, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UtilService } from '../util.service';
import { ApiserviceService } from '../apiservice.service';
import { APP_CONFIG } from '../app.config';
import { Http } from '@angular/http';
import { RequestorDto, ReportProblemDto, ReasonCodeDto, CommentDto, DocumentDto,AssignmentDto, AssignmentRequestDto, EmployeeDto  } from '../requestorDto';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMyDpOptions,IMyDateModel } from 'mydatepicker';
import { Cookie } from 'ng2-cookies';
declare let tinymce: any;

@Component({
  selector: 'app-reportproblem',
  templateUrl: './reportproblem.component.html',
  styleUrls: ['./reportproblem.component.css'],
  providers: [ApiserviceService]
})
export class ReportproblemComponent implements OnInit {
  @ViewChild('saveFrom') saveFrom: FormGroup;
  @ViewChild('editPro') editPro: FormGroup;
  @ViewChild('myInput') myInputVariable: ElementRef;
  @ViewChild('myInput1') myInputVariable1: ElementRef;
  requestor: RequestorDto;
  requestor1: RequestorDto;
  reportproblem: ReportProblemDto;
  reportproblem1: ReportProblemDto;
  reason: ReasonCodeDto;
  comment: CommentDto;
  document: DocumentDto;
  mydocument: DocumentDto;
  persons: Array<any> = [];
  person: AssignmentDto;
  existingList: Array<DocumentDto>;
  archiveList: Array<DocumentDto>;
  selectedFile: any;
  documentName: any;
  saveAssign: AssignmentRequestDto;
  assign: AssignmentDto;
  assignList: Array<AssignmentDto> = [];
  assignDivision: any;
  assignAssign: any;
  assignEmail: any;
  getAssignment: AssignmentRequestDto;
  curAssignment: AssignmentDto;
  getAssignmentsList: Array<AssignmentDto>;
  employees: Array<EmployeeDto>;
  employee: EmployeeDto;
  startDate: any;
  expectedEndDate: any;
  assigncomment: any;
  openReasonList: any;
  closedReasonList: any;
  userNameSearch: any;
  userName:any;
  public usersTemplate: Array<EmployeeDto> = [];
  public usersTemplateList: Array<EmployeeDto> = [];
  public keyword = 'username';
  myDatePickerOptions1:IMyDpOptions={
    disableUntil:{
      year:0,month:0,day:0
    },
    showTodayBtn: false
  }
  myDatePickerOptions2:IMyDpOptions={
    disableUntil:{
      year:0,month:0,day:0
    },
    showTodayBtn: false
    }

  public openToOpenSelect: boolean;
  public closedSelect: boolean;
  public closeToOpenSelect: boolean;
  data: boolean;
  public showMedicaidOriginal: boolean;
  public showAssistingOriginal: boolean;
  public showProviderOriginal: boolean;
  public showOtherOriginal: boolean;
  public showMedicaidEdit: boolean;
  public showAssistingEdit: boolean;
  public showProviderEdit: boolean;
  public showOtherEdit: boolean;
  public showSplit: boolean;
  public showMove:boolean=false;
  public showMedicaidOriginalSplit: boolean;
  public showAssistingOriginalSplit: boolean;
  public showProviderOriginalSplit: boolean;
  public showOtherOriginalSplit: boolean;
  public showMedicaidEditSplit: boolean;
  public showAssistingEditSplit: boolean;
  public showProviderEditSplit: boolean;
  public showOtherEditSplit: boolean;
  public showComments: boolean;
  public showHistory: boolean;
  public showSubmit: boolean;
  public showAssign: boolean;
  public OtherText: boolean = false;
  public otherRelationship: boolean = false;
  public showHistoryPanel: boolean = false;
  public showInsert: boolean = false;
  public showResidency: boolean;
  public showReason: boolean;
  public edit:boolean = false;
  public requests: any;
  public id: any;
  public showNav:boolean = false;

  p: number = 1;
  items: number = 5;
  mask: any[] = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  mask1: any[] = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  comments: any;
  description: any;
  reqCategory: any;
  category: any;
  temp: any;

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

  constructor(private renderer: Renderer, private router: Router, private utilService: UtilService, private _location: Location, private _apiservice: ApiserviceService, private http: Http, private modalService: NgbModal,private ref: ChangeDetectorRef) {
    this.requestor = new RequestorDto();
    this.requestor1 = new RequestorDto();
    this.reportproblem = new ReportProblemDto();
    this.reportproblem1 = new ReportProblemDto();
    this.reason = new ReasonCodeDto();
    this.comment = new CommentDto();
    this.document=new DocumentDto();
    this.mydocument=new DocumentDto();
    this.assignList= new Array<AssignmentDto>();
    this.getAssignmentsList=new Array<AssignmentDto>();
    this.getAssignment=new AssignmentRequestDto();
    this.assign=new AssignmentDto();
    this.person=new AssignmentDto();
    this.saveAssign=new AssignmentRequestDto();
    this.loadScript('assets/js/translate.js');
    this.loadScript('assets/js/menu.js');
    this.config.init_instance_callback = (editor: any) => {
      editor.on('keyup', () => {
      this.getData(editor);
      });
      };
  }

  ngOnInit() {
    this.userName=Cookie.get('userName');
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    this.utilService.changDocTitle("DMAS Forms - Report a Problem");
    this.utilService.show();
    this.utilService.homeShow();
    this.utilService.logShow();
    this.getRequestTableData(7, this.id);
    localStorage.setItem('requestorID',this.id);
    Cookie.set('TicketID',this.requestor1.ticketID);
    this.getReasonCodes(7);
    if(UtilService.role!='ADMIN'){
      this.showNav=false;
    }
    if(UtilService.role=='ADMIN'){
      this.showNav=true;
    }
  }

  moveView(){
    this.showMove=true;
    this.showResidency = false;
      this.showMedicaidOriginal = false;
      this.showAssistingOriginal = false;
      this.showProviderOriginal = false;
      this.showOtherOriginal = false;
      this.showMedicaidEdit = false;
      this.showAssistingEdit = false;
      this.showProviderEdit = false;
      this.showOtherEdit = false;
      this.showMedicaidOriginalSplit = false;
      this.showAssistingOriginalSplit = false;
      this.showProviderOriginalSplit = false;
      this.showOtherOriginalSplit = false;
      this.showMedicaidEditSplit = false;
      this.showAssistingEditSplit = false;
      this.showProviderEditSplit = false;
      this.showOtherEditSplit = false;
      this.showComments = false;
      this.showHistory = false;
      this.showSubmit = false;
      this.showSplit = false;
      this.showInsert = false;
      this.showHistoryPanel = false;
      this.showAssign = false;
    
    // this.showOne = false;
    // this.showTwo = false;
    // this.showSplit = false;
    // this.showComments = false;
    // this.showButton = false;
    // this.showCommentHistory = false;
    // this.showAttach = false;
    // this.showAss = false;
        
            
            
      }
  loadScript(url) {
    //console.log('preparing to load menu and translate...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
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

  navigateBack() {
    this._location.back();
  }

  getRequestTableData(formID, id) {
    this.id = JSON.parse(localStorage.getItem('tempID'));
    this._apiservice.getRequest(formID, this.id)
      .subscribe((data: any) => {
        this.requestor = data.originalRequest;
        this.requestor1 = data.internalRequest;
        Cookie.set('TicketID',this.requestor.ticketID);
        this.comments = this.requestor1.comments;
        this.reportproblem = this.requestor.reportProblem;
        this.reportproblem1 = this.requestor1.reportProblem;
        this.requestor1.previousStatus = this.requestor1.status;
        this.reqCategory = this.reportproblem.category;
        Cookie.set('status',this.requestor1.status);
        if(this.requestor1.status==='Closed'){
          this.edit=true;
        }
        if (this.requestor1.status == 'Open') {
          this.openToOpenSelect = true;
          this.closedSelect = false;
          this.closeToOpenSelect = false;
          this.showAssign = false;
        }
        if (this.requestor1.status == 'Closed') {
          this.openToOpenSelect = false;
          this.closedSelect = true;
          this.closeToOpenSelect = false;
          this.showAssign = false;
        }
        if (this.reqCategory == 'Medicaid Member') {
          this.showResidency = true;
          this.showMove=false;
          this.showMedicaidOriginal = true;
          this.showAssistingOriginal = false;
          this.showProviderOriginal = false;
          this.showOtherOriginal = false;
          this.showMedicaidEdit = false;
          this.showAssistingEdit = false;
          this.showProviderEdit = false;
          this.showOtherEdit = false;
          this.showComments = false;
          this.showHistory = false;
          this.showSubmit = false;
          this.showSplit = false;
          this.showAssign = false;
        } else if (this.reqCategory == 'Provider') {
          this.showResidency = true;
          this.showMove=false;
          this.showMedicaidOriginal = false;
          this.showAssistingOriginal = false;
          this.showProviderOriginal = true;
          this.showOtherOriginal = false;
          this.showMedicaidEdit = false;
          this.showAssistingEdit = false;
          this.showProviderEdit = false;
          this.showOtherEdit = false;
          this.showComments = false;
          this.showHistory = false;
          this.showSubmit = false;
          this.showSplit = false;
          this.showAssign = false;
        } else if (this.reqCategory == 'Assisting a Medicaid Member') {
          this.showMove=false;
          this.showResidency = true;
          this.showMedicaidOriginal = false;
          this.showAssistingOriginal = true;
          this.showProviderOriginal = false;
          this.showOtherOriginal = false;
          this.showMedicaidEdit = false;
          this.showAssistingEdit = false;
          this.showProviderEdit = false;
          this.showOtherEdit = false;
          this.showComments = false;
          this.showHistory = false;
          this.showSubmit = false;
          this.showSplit = false;
          this.showAssign = false;
          this.otherRelationship = true;
        } else {
          this.showMove=false;
          this.showResidency = true;
          this.showMedicaidOriginal = false;
          this.showAssistingOriginal = false;
          this.showProviderOriginal = false;
          this.showOtherOriginal = true;
          this.showMedicaidEdit = false;
          this.showAssistingEdit = false;
          this.showProviderEdit = false;
          this.showOtherEdit = false;
          this.showComments = false;
          this.showHistory = false;
          this.showSubmit = false;
          this.showSplit = false;
          this.OtherText = true;
          this.showAssign = false;
        }
      }, error => {
        console.log(error);
      });
  }

  getReasonCodes(formID) {
    this.id = JSON.parse(localStorage.getItem('tempID'));
    this._apiservice.getReasonCodes(formID)
      .subscribe((data: any) => {
        this.openReasonList = data.open;
        this.closedReasonList = data.closed;
      }, error => {
        console.log(error);
      })
  }

  saveReportProblemRequest() {
    let url = APP_CONFIG.updateRequest;
    this.comment.createdBy = this.userName;
    this.requestor1.comment = this.comment;
    this.requestor1.reasonID = this.comment.reasonID;
    this.reportproblem1.updatedBy = this.userName;
    this.requestor1.updatedBy = this.userName;
    if (this.reportproblem.category == 'Medicaid Member') {
      this.requestor1.firstName = this.reportproblem1.memFirstname;
      this.requestor1.lastName = this.reportproblem1.memLastname;
      this.requestor1.phone = this.reportproblem1.memPhone;
      this.requestor1.email = this.reportproblem1.memEmail;
    }
    console.log(this.requestor1);
    this.http.post(url, this.requestor1)
      .map(res => res.json())
      .subscribe((data: any) => {
        console.log(data);
        if (this.requestor1.previousStatus == 'Open' && this.requestor1.status == 'Open') {
          this.modalService.open(open7);
        }
        if (this.requestor1.previousStatus == 'Closed' && this.requestor1.status == 'Open') {
          this.modalService.open(reopen7);
        } 
        if (this.requestor1.status == 'Closed') {
          this.modalService.open(close7);
        }
        this.comments = data.internalRequest.comments;
        this.editPro.reset();
      }, error => {
        console.log(error);
      })
  }

  originalTab() {
    if (this.reqCategory == 'Medicaid Member') {
      this.showResidency = true;
      this.showMove=false;
      this.showMedicaidOriginal = true;
      this.showAssistingOriginal = false;
      this.showProviderOriginal = false;
      this.showOtherOriginal = false;
      this.showMedicaidEdit = false;
      this.showAssistingEdit = false;
      this.showProviderEdit = false;
      this.showOtherEdit = false;
      this.showMedicaidOriginalSplit = false;
      this.showAssistingOriginalSplit = false;
      this.showProviderOriginalSplit = false;
      this.showOtherOriginalSplit = false;
      this.showMedicaidEditSplit = false;
      this.showAssistingEditSplit = false;
      this.showProviderEditSplit = false;
      this.showOtherEditSplit = false;
      this.showComments = false;
      this.showHistory = false;
      this.showSubmit = false;
      this.showSplit = false;
      this.showInsert = false;
      this.showHistoryPanel = false;
      this.showAssign = false;
    } else if (this.reqCategory == 'Provider') {
      this.showResidency = true;
      this.showMove=false;
      this.showMedicaidOriginal = false;
      this.showAssistingOriginal = false;
      this.showProviderOriginal = true;
      this.showOtherOriginal = false;
      this.showMedicaidEdit = false;
      this.showAssistingEdit = false;
      this.showProviderEdit = false;
      this.showOtherEdit = false;
      this.showMedicaidOriginalSplit = false;
      this.showAssistingOriginalSplit = false;
      this.showProviderOriginalSplit = false;
      this.showOtherOriginalSplit = false;
      this.showMedicaidEditSplit = false;
      this.showAssistingEditSplit = false;
      this.showProviderEditSplit = false;
      this.showOtherEditSplit = false;
      this.showComments = false;
      this.showHistory = false;
      this.showSubmit = false;
      this.showSplit = false;
      this.showInsert = false;
      this.showHistoryPanel = false;
      this.showAssign = false;
    } else if (this.reqCategory == 'Assisting a Medicaid Member') {
      this.showResidency = true;
      this.showMove=false;
      this.showMedicaidOriginal = false;
      this.showAssistingOriginal = true;
      this.showProviderOriginal = false;
      this.showOtherOriginal = false;
      this.showMedicaidEdit = false;
      this.showAssistingEdit = false;
      this.showProviderEdit = false;
      this.showOtherEdit = false;
      this.showMedicaidOriginalSplit = false;
      this.showAssistingOriginalSplit = false;
      this.showProviderOriginalSplit = false;
      this.showOtherOriginalSplit = false;
      this.showMedicaidEditSplit = false;
      this.showAssistingEditSplit = false;
      this.showProviderEditSplit = false;
      this.showOtherEditSplit = false;
      this.showComments = false;
      this.showHistory = false;
      this.showSubmit = false;
      this.showSplit = false;
      this.showInsert = false;
      this.showHistoryPanel = false;
      this.showAssign = false;
    } else {
      this.showResidency = true;
      this.showMove=false;
      this.showMedicaidOriginal = false;
      this.showAssistingOriginal = false;
      this.showProviderOriginal = false;
      this.showOtherOriginal = true;
      this.showMedicaidEdit = false;
      this.showAssistingEdit = false;
      this.showProviderEdit = false;
      this.showOtherEdit = false;
      this.showMedicaidOriginalSplit = false;
      this.showAssistingOriginalSplit = false;
      this.showProviderOriginalSplit = false;
      this.showOtherOriginalSplit = false;
      this.showMedicaidEditSplit = false;
      this.showAssistingEditSplit = false;
      this.showProviderEditSplit = false;
      this.showOtherEditSplit = false;
      this.showComments = false;
      this.showHistory = false;
      this.showSubmit = false;
      this.showSplit = false;
      this.showInsert = false;
      this.showHistoryPanel = false;
      this.showAssign = false;
    }
  }

  editTab() {
    if (this.reqCategory == 'Medicaid Member') {
      this.showResidency = true;
      this.showMove=false;
      this.showMedicaidOriginal = false;
      this.showAssistingOriginal = false;
      this.showProviderOriginal = false;
      this.showOtherOriginal = false;
      this.showMedicaidEdit = true;
      this.showAssistingEdit = false;
      this.showProviderEdit = false;
      this.showOtherEdit = false;
      this.showMedicaidOriginalSplit = false;
      this.showAssistingOriginalSplit = false;
      this.showProviderOriginalSplit = false;
      this.showOtherOriginalSplit = false;
      this.showMedicaidEditSplit = false;
      this.showAssistingEditSplit = false;
      this.showProviderEditSplit = false;
      this.showOtherEditSplit = false;
      this.showComments = true;
      this.showHistory = true;
      this.showSubmit = true;
      this.showSplit = false;
      this.showInsert = false;
      this.showHistoryPanel = false;
      this.showAssign = false;
    } else if (this.reqCategory == 'Provider') {
      this.showResidency = true;
      this.showMove=false;
      this.showMedicaidOriginal = false;
      this.showAssistingOriginal = false;
      this.showProviderOriginal = false;
      this.showOtherOriginal = false;
      this.showMedicaidEdit = false;
      this.showAssistingEdit = false;
      this.showProviderEdit = true;
      this.showOtherEdit = false;
      this.showMedicaidOriginalSplit = false;
      this.showAssistingOriginalSplit = false;
      this.showProviderOriginalSplit = false;
      this.showOtherOriginalSplit = false;
      this.showMedicaidEditSplit = false;
      this.showAssistingEditSplit = false;
      this.showProviderEditSplit = false;
      this.showOtherEditSplit = false;
      this.showComments = true;
      this.showHistory = true;
      this.showSubmit = true;
      this.showSplit = false;
      this.showInsert = false;
      this.showHistoryPanel = false;
      this.showAssign = false;
    } else if (this.reqCategory == 'Assisting a Medicaid Member') {
      this.showResidency = true;
      this.showMove=false;
      this.showMedicaidOriginal = false;
      this.showAssistingOriginal = false;
      this.showProviderOriginal = false;
      this.showOtherOriginal = false;
      this.showMedicaidEdit = false;
      this.showAssistingEdit = true;
      this.showProviderEdit = false;
      this.showOtherEdit = false;
      this.showMedicaidOriginalSplit = false;
      this.showAssistingOriginalSplit = false;
      this.showProviderOriginalSplit = false;
      this.showOtherOriginalSplit = false;
      this.showMedicaidEditSplit = false;
      this.showAssistingEditSplit = false;
      this.showProviderEditSplit = false;
      this.showOtherEditSplit = false;
      this.showComments = true;
      this.showHistory = true;
      this.showSubmit = true;
      this.showSplit = false;
      this.showInsert = false;
      this.showHistoryPanel = false;
      this.showAssign = false;
    } else {
      this.showResidency = true;
      this.showMove=false;
      this.showMedicaidOriginal = false;
      this.showAssistingOriginal = false;
      this.showProviderOriginal = false;
      this.showOtherOriginal = false;
      this.showMedicaidEdit = false;
      this.showAssistingEdit = false;
      this.showProviderEdit = false;
      this.showOtherEdit = true;
      this.showMedicaidOriginalSplit = false;
      this.showAssistingOriginalSplit = false;
      this.showProviderOriginalSplit = false;
      this.showOtherOriginalSplit = false;
      this.showMedicaidEditSplit = false;
      this.showAssistingEditSplit = false;
      this.showProviderEditSplit = false;
      this.showOtherEditSplit = false;
      this.showComments = true;
      this.showHistory = true;
      this.showSubmit = true;
      this.showSplit = false;
      this.showInsert = false;
      this.showHistoryPanel = false;
      this.showAssign = false;
    }
  }
  splitView() {
    if (this.reqCategory == 'Medicaid Member') {
      this.showResidency = true;
      this.showMove=false;
      this.showMedicaidOriginal = false;
      this.showAssistingOriginal = false;
      this.showProviderOriginal = false;
      this.showOtherOriginal = false;
      this.showMedicaidEdit = false;
      this.showAssistingEdit = false;
      this.showProviderEdit = false;
      this.showOtherEdit = false;
      this.showMedicaidOriginalSplit = true;
      this.showAssistingOriginalSplit = false;
      this.showProviderOriginalSplit = false;
      this.showOtherOriginalSplit = false;
      this.showMedicaidEditSplit = true;
      this.showAssistingEditSplit = false;
      this.showProviderEditSplit = false;
      this.showOtherEditSplit = false;
      this.showComments = true;
      this.showHistory = true;
      this.showSubmit = true;
      this.showSplit = true;
      this.showInsert = false;
      this.showHistoryPanel = false;
      this.showAssign = false;
    } else if (this.reqCategory == 'Provider') {
      this.showResidency = true;
      this.showMove=false;
      this.showMedicaidOriginal = false;
      this.showAssistingOriginal = false;
      this.showProviderOriginal = false;
      this.showOtherOriginal = false;
      this.showMedicaidEdit = false;
      this.showAssistingEdit = false;
      this.showProviderEdit = false;
      this.showOtherEdit = false;
      this.showMedicaidOriginalSplit = false;
      this.showAssistingOriginalSplit = false;
      this.showProviderOriginalSplit = true;
      this.showOtherOriginalSplit = false;
      this.showMedicaidEditSplit = false;
      this.showAssistingEditSplit = false;
      this.showProviderEditSplit = true;
      this.showOtherEditSplit = false;
      this.showComments = true;
      this.showHistory = true;
      this.showSubmit = true;
      this.showSplit = true;
      this.showInsert = false;
      this.showHistoryPanel = false;
      this.showAssign = false;
    } else if (this.reqCategory == 'Assisting a Medicaid Member') {
      this.showResidency = true;
      this.showMove=false;
      this.showMedicaidOriginal = false;
      this.showAssistingOriginal = false;
      this.showProviderOriginal = false;
      this.showOtherOriginal = false;
      this.showMedicaidEdit = false;
      this.showAssistingEdit = false;
      this.showProviderEdit = false;
      this.showOtherEdit = false;
      this.showMedicaidOriginalSplit = false;
      this.showAssistingOriginalSplit = true;
      this.showProviderOriginalSplit = false;
      this.showOtherOriginalSplit = false;
      this.showMedicaidEditSplit = false;
      this.showAssistingEditSplit = true;
      this.showProviderEditSplit = false;
      this.showOtherEditSplit = false;
      this.showComments = true;
      this.showHistory = true;
      this.showSubmit = true;
      this.showSplit = true;
      this.showInsert = false;
      this.showHistoryPanel = false;
      this.showAssign = false;
    } else {
      this.showResidency = true;
      this.showMove=false;
      this.showMedicaidOriginal = false;
      this.showAssistingOriginal = false;
      this.showProviderOriginal = false;
      this.showOtherOriginal = false;
      this.showMedicaidEdit = false;
      this.showAssistingEdit = false;
      this.showProviderEdit = false;
      this.showOtherEdit = false;
      this.showMedicaidOriginalSplit = false;
      this.showAssistingOriginalSplit = false;
      this.showProviderOriginalSplit = false;
      this.showOtherOriginalSplit = true;
      this.showMedicaidEditSplit = false;
      this.showAssistingEditSplit = false;
      this.showProviderEditSplit = false;
      this.showOtherEditSplit = true;
      this.showComments = true;
      this.showHistory = true;
      this.showSubmit = true;
      this.showSplit = true;
      this.showInsert = false;
      this.showHistoryPanel = false;
      this.showAssign = false;
    }
  }
  insertView(){
    this.showResidency = false;
    this.showMove=false;
    this.showMedicaidOriginal = false;
    this.showAssistingOriginal = false;
    this.showProviderOriginal = false;
    this.showOtherOriginal = false;
    this.showMedicaidEdit = false;
    this.showAssistingEdit = false;
    this.showProviderEdit = false;
    this.showOtherEdit = false;
    this.showMedicaidOriginalSplit = false;
    this.showAssistingOriginalSplit = false;
    this.showProviderOriginalSplit = false;
    this.showOtherOriginalSplit = false;
    this.showMedicaidEditSplit = false;
    this.showAssistingEditSplit = false;
    this.showProviderEditSplit = false;
    this.showOtherEditSplit = false;
    this.showComments = false;
    this.showHistory = false;
    this.showSubmit = false;
    this.showSplit = false;
    this.showInsert = true;
    this.showHistoryPanel = false;
    this.showAssign = false;
  }
  commentHistoryView(){
    this.showMove=false;
    this.showResidency = false;
    this.showMedicaidOriginal = false;
    this.showAssistingOriginal = false;
    this.showProviderOriginal = false;
    this.showOtherOriginal = false;
    this.showMedicaidEdit = false;
    this.showAssistingEdit = false;
    this.showProviderEdit = false;
    this.showOtherEdit = false;
    this.showMedicaidOriginalSplit = false;
    this.showAssistingOriginalSplit = false;
    this.showProviderOriginalSplit = false;
    this.showOtherOriginalSplit = false;
    this.showMedicaidEditSplit = false;
    this.showAssistingEditSplit = false;
    this.showProviderEditSplit = false;
    this.showOtherEditSplit = false;
    this.showComments = false;
    this.showHistory = true;
    this.showSubmit = false;
    this.showSplit = false;
    this.showInsert = false;
    this.showHistoryPanel = true;
    this.showAssign = false;
  }
  assignView() {
    this.showMove=false;
    this.showResidency = false;
    this.showMedicaidOriginal = false;
    this.showAssistingOriginal = false;
    this.showProviderOriginal = false;
    this.showOtherOriginal = false;
    this.showMedicaidEdit = false;
    this.showAssistingEdit = false;
    this.showProviderEdit = false;
    this.showOtherEdit = false;
    this.showMedicaidOriginalSplit = false;
    this.showAssistingOriginalSplit = false;
    this.showProviderOriginalSplit = false;
    this.showOtherOriginalSplit = false;
    this.showMedicaidEditSplit = false;
    this.showAssistingEditSplit = false;
    this.showProviderEditSplit = false;
    this.showOtherEditSplit = false;
    this.showComments = false;
    this.showHistory = false;
    this.showSubmit = false;
    this.showSplit = false;
    this.showInsert = false;
    this.showHistoryPanel = false;
    this.showAssign = true;
    // if(UtilService.role==='ADMIN'){
    //   this.showAssign=true;
    //   }else{
    //     this.showAssign=false;
    //   }
    this.disableStartDate();
    this.dasbaleEndDate();
  }
  closedTicket(){
    this.showResidency = false;
    this.showMedicaidOriginal = false;
    this.showAssistingOriginal = false;
    this.showProviderOriginal = false;
    this.showOtherOriginal = false;
    this.showMedicaidEdit = false;
    this.showAssistingEdit = false;
    this.showProviderEdit = false;
    this.showOtherEdit = false;
    this.showMedicaidOriginalSplit = false;
    this.showAssistingOriginalSplit = false;
    this.showProviderOriginalSplit = false;
    this.showOtherOriginalSplit = false;
    this.showMedicaidEditSplit = false;
    this.showAssistingEditSplit = false;
    this.showProviderEditSplit = false;
    this.showOtherEditSplit = false;
    this.showComments = true;
    this.showHistory = false;
    this.showSubmit = true;
    this.showSplit = false;
    this.showInsert = false;
    this.showHistoryPanel = false;
    this.showAssign=false;
    this.showMove=false;
    if(UtilService.role==='ADMIN'){
      this.showReason=true;
      }else{
        this.showReason=false;
      }
  }
  omit_special_char(e, value) {
    let k = e.charCode || e.keyCode || 0;
    // k = event.keyCode; (Both can be used)
    if (k === 32 && value.length === 0) {
      event.preventDefault();
    }
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 32 || k == 8 || (k >= 48 && k <= 57));
  }
  omit_special_char1(e, value) {
    let k = e.charCode || e.keyCode || 0;
    // k = event.keyCode; (Both can be used)
    if (k === 32 && value.length === 0) {
      event.preventDefault();
    }
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
  onPrint(){
    window.print();
  }
  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }
  getDocuments(requestorID){
    this._apiservice.getDocuments(requestorID)
    .subscribe((data:any)=>{
      this.existingList=data.existingDocuments;
      this.archiveList=data.archiveDocuments;
      console.log(this.existingList);
      console.log(this.archiveList);
    },error=>{
      console.log(error);
    })
  }
  saveDocuments(){
    let url=APP_CONFIG.saveDocuments;
    this.document.ticketID=this.requestor1.ticketID;
    this.document.createdBy=this.userName;
    this.document.requestorID=this.requestor1.id;
    this.document.documentName=this.documentName;
    let formData = new FormData();
    formData.append("document",JSON.stringify(this.document));
    formData.append("file",this.selectedFile);
    this.http.post(url, formData)
    .map(res =>  res.json())
    .subscribe((data:any)=>{
      console.log(data);
      this.modalService.open(upload7);
      this.insertView();
      this.myInputVariable.nativeElement.value = "";
    }, error=>{
      console.log(error);
    })
  }
  deleteDocument(existingDocument){
    let url=APP_CONFIG.deleteDocument;
    existingDocument.updatedBy=this.userName
    this.http.post(url,existingDocument)
    .map(res =>  res.json())
    .subscribe((data:any)=>{
      console.log(data);
      this.modalService.open(delete7);
      this.insertView();
    }, error=>{
      console.log(error);
    })
  }
  documentDownload(id,filename){
    window.open(APP_CONFIG.documents + id + '/' + filename,'_blank');
  }
  selectFile(event) {
    this.selectedFile = event.target.files[0];
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
    this.person.username = this.assignEmail;
    // console.log(this.userNameSearch);
    // console.log(this.person.username);
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
        this.modalService.open(assign7);
        this.assignView();
        this.resetContent();
      }, error => {
        this.resetContent();
        console.log(error);
        this.modalService.open(assign7);
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
  dasbaleEndDate() {

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
export class open7 {
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
export class close7 {
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
export class reopen7 {
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
export class upload7 {
  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  goBack() {
    this.router.navigate(['reportproblem']);
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
export class delete7 {
  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  goBack() {
    this.router.navigate(['reportproblem']);
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
export class assign7 {
  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  goBack() {
    this.router.navigate(['reportproblem']);
    this.activeModal.close('Close click');
  }
}