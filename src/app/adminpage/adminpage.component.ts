import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util.service';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css'],
  providers: [ApiserviceService]
})
export class AdminpageComponent implements OnInit {

  public pendingAll: any;
  public closedAll: any;
  public totalAll: any;

  constructor(private utilService: UtilService, private _apiservice: ApiserviceService, private router: Router) { }

  ngOnInit() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    this.utilService.changDocTitle("DMAS Forms - Admin Page");
    this.utilService.show();
    this.utilService.homeShow();
    this.utilService.logShow();
    this.getAllCount();
  }

  getAllCount() {
    this._apiservice.getAllRequestsCount()
    .subscribe((data: any) => {
      this.pendingAll = data.pendingRequests;
      this.closedAll = data.closedRequests;
      this.totalAll = data.allRequests;
      this.utilService.allClosed=data.closedRequests;
      this.utilService.allOpen=data.pendingRequests;
    });
  }

  openPendingAll() {
    localStorage.setItem('heading', 'All Open Requests');
    this.router.navigate(['requests']);
  }

  openClosedAll() {
    localStorage.setItem('heading', 'All Closed Requests');
    this.router.navigate(['requests']);
  }
}
