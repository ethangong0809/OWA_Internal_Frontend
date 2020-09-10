import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util.service';
import { ApiserviceService } from '../apiservice.service';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';

@Component({
  selector: 'app-front',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiserviceService]
})
export class HomeComponent implements OnInit {

  public loading: boolean = false;
  public pendingProc: number;
  public closedProc: number;
  public totalProc: number;
  public pendingCCCPlus: number;
  public closedCCCPlus: number;
  public totalCCCPlus: number;
  public pendingMed4: number;
  public closedMed4: number;
  public totalMed4: number;
  public pendingGeneral: number;
  public closedGeneral: number;
  public totalGeneral: number;
  public pendingMedia: number;
  public closedMedia: number;
  public totalMedia: number;
  public pendingElected: number;
  public closedElected: number;
  public totalElected: number;
  public pendingRepProb: number;
  public closedRepProb: number;
  public totalRepProb: number;
  public pendingAll: number;
  public closedAll: number;
  public totalAll: number;

  showMedallion: boolean = true;
  showProcurement: boolean = true;
  showReportProblem: boolean = true;
  showElected: boolean = true;
  showCCCPlus: boolean = true;
  showGeneral: boolean = true;
  showMedia: boolean = true;
  showAll: boolean = true;
  lessThree:boolean=false;
  ticketID:any;

  constructor(private utilService: UtilService, private http: Http, private router: Router, private _apiservice: ApiserviceService) {
    localStorage.removeItem('heading');
    this.loadScript('assets/js/translate.js');
    this.loadScript('assets/js/menu.js');
  }

  ngOnInit() {
    Cookie.set('userName','Leo');
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    this.utilService.changDocTitle("DMAS Forms - Home");
    if(UtilService.role==='ADMIN'){
    this.getProcCount();
    this.getCCCPlusCount();
    this.getMed4Count();
    this.getGeneralCount();
    this.getMediaCount();
    this.getElectedCount();
    this.getReportProblemCount();
    }
    if(UtilService.role!='ADMIN'){
      this.getAssignmentsRequestsCount(UtilService.email);
    }
    this.utilService.hide();
    this.utilService.logShow();
    this.utilService.homeHide();
  }
  getAssignmentsRequestsCount(email){
    this._apiservice.getAssignmentsRequestsCount(email)
    .subscribe((data: any) => {
      console.log(data);
      this.pendingProc = data.procurementRequests.pendingRequests;
      this.closedProc = data.procurementRequests.closedRequests;
      this.pendingCCCPlus = data.cccplusRequests.pendingRequests;
      this.closedCCCPlus = data.cccplusRequests.closedRequests;
      this.pendingMed4 = data.med4Requests.pendingRequests;
      this.closedMed4 = data.med4Requests.closedRequests;
      this.pendingGeneral = data.generalRequests.pendingRequests;
      this.closedGeneral = data.generalRequests.closedRequests;
      this.pendingMedia = data.mediaRequests.pendingRequests;
      this.closedMedia = data.mediaRequests.closedRequests;
      this.pendingElected = data.electedOfficialRequests.pendingRequests;
      this.closedElected = data.electedOfficialRequests.closedRequests;
      this.pendingRepProb = data.reportProblemRequests.pendingRequests;
      this.closedRepProb = data.reportProblemRequests.closedRequests;
    });
    
  }
  getProcCount() {
    this._apiservice.getRequestsCount(1)
      .subscribe((data: any) => {
        this.pendingProc = data.pendingRequests;
        this.closedProc = data.closedRequests;
        this.totalProc = data.allRequests;
        this.utilService.procurementsClosed=data.closedRequests;
      });
  }

  getCCCPlusCount() {
    this._apiservice.getRequestsCount(2)
      .subscribe((data: any) => {
        this.pendingCCCPlus = data.pendingRequests;
        this.closedCCCPlus = data.closedRequests;
        this.totalCCCPlus = data.allRequests;
        this.utilService.cccplusClosed=data.closedRequests;
      });
  }

  getMed4Count() {
    this._apiservice.getRequestsCount(3)
      .subscribe((data: any) => {
        this.pendingMed4 = data.pendingRequests;
        this.closedMed4 = data.closedRequests;
        this.totalMed4 = data.allRequests;
        this.utilService.meda4Closed=data.closedRequests;
      });
  }

  getGeneralCount() {
    this._apiservice.getRequestsCount(4)
      .subscribe((data: any) => {
        this.pendingGeneral = data.pendingRequests;
        this.closedGeneral = data.closedRequests;
        this.totalGeneral = data.allRequests;
        this.utilService.generalClosed=data.closedRequests;
      });
  }

  getMediaCount() {
    this._apiservice.getRequestsCount(5)
      .subscribe((data: any) => {
        this.pendingMedia = data.pendingRequests;
        this.closedMedia = data.closedRequests;
        this.totalMedia = data.allRequests;
        this.utilService.mediaClosed=data.closedRequests;
      });
  }

  getElectedCount() {
    this._apiservice.getRequestsCount(6)
      .subscribe((data: any) => {
        this.pendingElected = data.pendingRequests;
        this.closedElected = data.closedRequests;
        this.totalElected = data.allRequests;
        this.utilService.electedClosed=data.closedRequests;
      });;;
  }

  getReportProblemCount() {
    this._apiservice.getRequestsCount(7)
      .subscribe((data: any) => {
        this.pendingRepProb = data.pendingRequests;
        this.closedRepProb = data.closedRequests;
        this.totalRepProb = data.allRequests;
        this.utilService.reportClosed=data.closedRequests;
      });
  }

  openPendingGeneral() {
    localStorage.setItem('heading', 'General: Open Requests');
    this.router.navigate(['requests']);
  }

  openClosedGeneral() {
    localStorage.setItem('heading', 'General: Closed Requests');
    this.router.navigate(['requests']);
  }

  openAllGeneral() {
    localStorage.setItem('heading', 'All General Requests');
    this.router.navigate(['requests']);
  }

  openPendingMed4() {
    localStorage.setItem('heading', 'Medallion 4.0: Open Requests');
    this.router.navigate(['requests']);
  }

  openClosedMed4() {
    localStorage.setItem('heading', 'Medallion 4.0: Closed Requests');
    this.router.navigate(['requests']);
  }

  openAllMed4() {
    localStorage.setItem('heading', 'All Medallion 4.0 Requests');
    this.router.navigate(['requests']);
  }

  openPendingCCC() {
    localStorage.setItem('heading', 'CCC Plus: Open Requests');
    this.router.navigate(['requests']);
  }

  openClosedCCC() {
    localStorage.setItem('heading', 'CCC Plus: Closed Requests');
    this.router.navigate(['requests']);
  }

  openAllCCC() {
    localStorage.setItem('heading', 'All CCC Plus Requests');
    this.router.navigate(['requests']);
  }

  openPendingProc() {
    localStorage.setItem('heading', 'Procurements: Open Requests');
    this.router.navigate(['requests']);
  }

  openClosedProc() {
    localStorage.setItem('heading', 'Procurements: Closed Requests');
    this.router.navigate(['requests']);
  }

  openAllProc() {
    localStorage.setItem('heading', 'All Procurement Requests');
    this.router.navigate(['requests']);
  }

  openPendingMedia() {
    localStorage.setItem('heading', 'Media: Open Requests');
    this.router.navigate(['requests']);
  }

  openClosedMedia() {
    localStorage.setItem('heading', 'Media: Closed Requests');
    this.router.navigate(['requests']);
  }

  openAllMedia() {
    localStorage.setItem('heading', 'All Media Requests');
    this.router.navigate(['requests']);
  }

  openPendingReportProblem() {
    localStorage.setItem('heading', 'Report a Problem: Open Requests');
    this.router.navigate(['requests']);
  }

  openClosedReportProblem() {
    localStorage.setItem('heading', 'Report a Problem: Closed Requests');
    this.router.navigate(['requests']);
  }

  openAllReportProblem() {
    localStorage.setItem('heading', 'All Report a Problem Requests');
    this.router.navigate(['requests']);
  }

  openPendingElected() {
    localStorage.setItem('heading', 'Elected Official: Open Requests');
    this.router.navigate(['requests']);
  }

  openClosedElected() {
    localStorage.setItem('heading', 'Elected Official: Closed Requests');
    this.router.navigate(['requests']);
  }

  openAllElected() {
    localStorage.setItem('heading', 'All Elected Official Requests');
    this.router.navigate(['requests']);
  }
  public loadScript(url) {
    //console.log('preparing to load menu and translate...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  
}
