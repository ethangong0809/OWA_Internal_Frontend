import { Component, OnInit } from '@angular/core';
import { UtilService } from '../util.service';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
// import {Sort} from '@angular/material';

@Component({
  selector: 'app-requeststable',
  templateUrl: './requeststable.component.html',
  styleUrls: ['./requeststable.component.css'],
  providers: [ApiserviceService]
})
export class RequeststableComponent implements OnInit {

  public heading: string;
  public requests: any;
  public loading: boolean = false;
  public ticketIDList: any;
  public searchingString: any;
  public tableDataRequest: any;
  public medOrreport: boolean = true;
  public desserts: any;
  public sortedData: any;
  public firstName: boolean;
  public lastUpdated: boolean;
  public receivedOn: boolean;
  public requestorType: boolean;
  public memberFirstName: boolean;
  public index: number;
  constructor(private utilService: UtilService, private router: Router, private _apiservice: ApiserviceService) {
    this.heading = localStorage.getItem("heading");
    this.getheading();
    this.index = 0;

  }

  ngOnInit() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    this.utilService.changDocTitle("DMAS Forms - Requests");
    this.utilService.show();
    if (UtilService.role === 'ADMIN') {
      this.getData();
    }
    if (UtilService.role != 'ADMIN') {
      if (this.heading == "General: Open Requests") {
        this.getAssignmentsRequests(UtilService.email, 4);
      }
      else if (this.heading == "Medallion 4.0: Open Requests") {
        this.getAssignmentsRequests(UtilService.email, 3);
      }
      else if (this.heading == "CCC Plus: Open Requests") {
        this.getAssignmentsRequests(UtilService.email, 2);
      }
      else if (this.heading == "Procurements: Open Requests") {
        this.getAssignmentsRequests(UtilService.email, 1);
      }
      else if (this.heading == "Media: Open Requests") {
        this.getAssignmentsRequests(UtilService.email, 5);
      }
      else if (this.heading == "Elected Official: Open Requests") {
        this.getAssignmentsRequests(UtilService.email, 6);
      }
      else if (this.heading == "Report a Problem: Open Requests") {
        this.getAssignmentsRequests(UtilService.email, 7);
      }
    }
    this.utilService.logShow();
    this.utilService.homeShow();
    this.loadScript('assets/js/translate.js');
    this.loadScript('assets/js/menu.js');
  }
  getheading() {
    if (this.heading == "Elected Official: Open Requests"
      || this.heading == "Elected Official: Closed Requests"
      || this.heading == "Report a Problem: Open Requests"
      || this.heading == "Report a Problem: Closed Requests"
      || this.heading == "All Open Requests"
      || this.heading == "All Closed Requests") {
      this.medOrreport = false;
    }
    else {
      this.medOrreport = true;
    }
  }

  getAssignmentsRequests(email, formID) {
    this._apiservice.getAssignmentsRequests(email, formID)
      .subscribe((data: any) => {
        this.requests = data;
      }, error => {
        console.log(error);
      });

  }

  getPendingRequests(id) {
    this._apiservice.getPendingRequestsTable(id)
      .subscribe((data: any) => {
        this.requests = data;
      }, error => {
        console.log(error);
      });
  }

  getClosedRequests(id, startNumber) {
    this._apiservice.getClosedRequestsTable(id, startNumber)
      .subscribe((data: any) => {
        this.requests = data.requests;
      }, error => {
        console.log(error);
      });
  }

  getTotalRequests(id, startNumber) {
    this._apiservice.getTotalRequestsTable(id, startNumber)
      .subscribe((data: any) => {
        this.requests = data.requests;
      }, error => {
        console.log(error);
      });
  }

  getAllPendingRequests(startNumber) {
    this._apiservice.getAllPendingRequestsTable(startNumber)
      .subscribe((data: any) => {
        console.log(data);
        this.requests = data.requests;
      }, error => {
        console.log(error);
      });
  }

  getAllClosedRequests(startNumber) {
    this._apiservice.getAllClosedRequestsTable(startNumber)
      .subscribe((data: any) => {
        this.requests = data.requests;
      }, error => {
        console.log(error);
      });
  }

  getAllTotalRequests(startNumber) {
    this._apiservice.getAllTotalRequestsTable(startNumber)
      .subscribe((data: any) => {
        this.requests = data.requests;
      }, error => {
        console.log(error);
      });
  }

  previous() {
    if (this.heading == "All Open Requests" && this.index != 0) {
      this.getAllPendingRequests(this.index - 20);
      this.index -= 20;
    }
    else if (this.heading == "All Closed Requests" && this.index != 0) {
      this.getAllClosedRequests(this.index - 20);
      this.index -= 20;
    }
    else if (this.heading == "All Requests") {
      this.getAllTotalRequests(this.index - 20);
      this.index -= 20;
    }
    else if (this.heading == "General: Closed Requests" && this.index != 0) {
      this.getAllClosedRequests(this.index - 20);
      this.index -= 20;
    }
    else if (this.heading == "Medallion 4.0: Closed Requests" && this.index != 0) {
      this.getAllClosedRequests(this.index - 20);
      this.index -= 20;
    }
    else if (this.heading == "CCC Plus: Closed Requests" && this.index != 0) {
      this.getAllClosedRequests(this.index - 20);
      this.index -= 20;
    }
    else if (this.heading == "Procurements: Closed Requests" && this.index != 0) {
      this.getAllClosedRequests(this.index - 20);
      this.index -= 20;
    }
    else if (this.heading == "Media: Closed Requests" && this.index != 0) {
      this.getAllClosedRequests(this.index - 20);
      this.index -= 20;
    }
    else if (this.heading == "Report a Problem: Closed Requests" && this.index != 0) {
      this.getAllClosedRequests(this.index - 20);
      this.index -= 20;
    }
    else if (this.heading == "Elected Official: Closed Requests" && this.index != 0) {
      this.getAllClosedRequests(this.index - 20);
      this.index -= 20;
    }

  }

  next() {
    if (this.heading == "All Open Requests" && this.index + 20 < this.utilService.allOpen) {
      this.getAllPendingRequests(this.index + 20);
      this.index += 20;
    }
    else if (this.heading == "All Closed Requests" && this.index + 20 < this.utilService.allClosed) {
      this.getAllClosedRequests(this.index + 20);
      this.index += 20;
    }
    else if (this.heading == "All Requests") {
      this.getAllTotalRequests(this.index + 20);
      this.index += 20;
    }
    else if (this.heading == "General: Closed Requests" && this.index + 20 < this.utilService.generalClosed) {
      this.getAllClosedRequests(this.index + 20);
      this.index += 20;
    }
    else if (this.heading == "Medallion 4.0: Closed Requests" && this.index + 20 < this.utilService.meda4Closed) {
      this.getAllClosedRequests(this.index + 20);
      this.index += 20;
    }
    else if (this.heading == "CCC Plus: Closed Requests" && this.index + 20 < this.utilService.cccplusClosed) {
      this.getAllClosedRequests(this.index + 20);
      this.index += 20;
    }
    else if (this.heading == "Procurements: Closed Requests" && this.index + 20 < this.utilService.procurementsClosed) {
      this.getAllClosedRequests(this.index + 20);
      this.index += 20;
    }
    else if (this.heading == "Media: Closed Requests" && this.index + 20 < this.utilService.mediaClosed) {
      this.getAllClosedRequests(this.index + 20);
      this.index += 20;
    }
    else if (this.heading == "Report a Problem: Closed Requests" && this.index + 20 < this.utilService.reportClosed) {
      this.getAllClosedRequests(this.index + 20);
      this.index += 20;
    }
    else if (this.heading == "Elected Official: Closed Requests" && this.index + 20 < this.utilService.electedClosed) {
      this.getAllClosedRequests(this.index + 20);
      this.index += 20;
    }
  }

  // showButton(){
  //   if(this.heading=='All Open Requests'||this.heading=='General: Closed Requests'
  //   ||this.heading='Medallion 4.0: Closed Requests'||this.heading='CCC Plus: Closed Requests'
  //   ||this.heading='Procurements: Closed Requests'||this.heading='Media: Closed Requests'
  //   ||this.heading='Elected Official: Closed Requests'||this.heading='Report a Problem: Closed Requests'
  //   ||this.heading='All Closed Requests'){

  //   }
  // }
  getData() {
    if (this.heading == "General: Open Requests") {
      this.getPendingRequests(4);
    }
    else if (this.heading == "General: Closed Requests") {
      this.getClosedRequests(4, 0);
    }
    else if (this.heading == "All General Requests") {
      this.getTotalRequests(4, 0);
    }
    else if (this.heading == "Medallion 4.0: Open Requests") {
      this.getPendingRequests(3);
    }
    else if (this.heading == "Medallion 4.0: Closed Requests") {
      this.getClosedRequests(3, 0);
    }
    else if (this.heading == "All Medallion 4.0 Requests") {
      this.getTotalRequests(3, 0);
    }
    else if (this.heading == "CCC Plus: Open Requests") {
      this.getPendingRequests(2);
    }
    else if (this.heading == "CCC Plus: Closed Requests") {
      this.getClosedRequests(2, 0);
    }
    else if (this.heading == "All CCC Plus Requests") {
      this.getTotalRequests(2, 0);
    }
    else if (this.heading == "Procurements: Open Requests") {
      this.getPendingRequests(1);
    }
    else if (this.heading == "Procurements: Closed Requests") {
      this.getClosedRequests(1, 0);
    }
    else if (this.heading == "All Procurement Requests") {
      this.getTotalRequests(1, 0);
    }
    else if (this.heading == "Media: Open Requests") {
      this.getPendingRequests(5);
    }
    else if (this.heading == "Media: Closed Requests") {
      this.getClosedRequests(5, 0);
    }
    else if (this.heading == "All Media Requests") {
      this.getTotalRequests(5, 0);
    }
    else if (this.heading == "Elected Official: Open Requests") {
      this.getPendingRequests(6);
    }
    else if (this.heading == "Elected Official: Closed Requests") {
      this.getClosedRequests(6, 0);
    }
    else if (this.heading == "All Elected Official Requests") {
      this.getTotalRequests(6, 0);
    }
    else if (this.heading == "Report a Problem: Open Requests") {
      this.getPendingRequests(7);
    }
    else if (this.heading == "Report a Problem: Closed Requests") {
      this.getClosedRequests(7, 0);
    }
    else if (this.heading == "All Report a Problem Requests") {
      this.getTotalRequests(7, 0);
    }
    else if (this.heading == "All Open Requests") {
      this.getAllPendingRequests(0);
    }
    else if (this.heading == "All Closed Requests") {
      this.getAllClosedRequests(0);
    }
    else if (this.heading == "All Requests") {
      this.getAllTotalRequests(0);
    }
  }

  getForm(request) {
    localStorage.setItem('formData', JSON.stringify(request));
    if (request.formID == 1) {
      this.router.navigate(['procurement']);
      localStorage.setItem('tempID', JSON.stringify(request.id));
    }
    else if (request.formID == 2) {
      this.router.navigate(['cccplus']);
      localStorage.setItem('tempID', JSON.stringify(request.id));
    }
    else if (request.formID == 3) {
      this.router.navigate(['med4']);
      localStorage.setItem('tempID', JSON.stringify(request.id));
    }
    else if (request.formID == 4) {
      this.router.navigate(['general']);
      localStorage.setItem('tempID', JSON.stringify(request.id));
    }
    else if (request.formID == 5) {
      this.router.navigate(['media']);
      localStorage.setItem('tempID', JSON.stringify(request.id));
    }
    else if (request.formID == 6) {
      this.router.navigate(['electedofficial']);
      localStorage.setItem('tempID', JSON.stringify(request.id));
    }
    else if (request.formID == 7) {
      this.router.navigate(['reportproblem']);
      localStorage.setItem('tempID', JSON.stringify(request.id));
    }
  }
  handleSortFirstName(value) {

    if (!this.firstName) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.requests.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.firstName = true;
    }
    else {
      let orderByValue = value;
      this.requests.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.firstName = false;
    }


  }
  handleSortLastUpdated(value) {

    if (!this.lastUpdated) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.requests.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.lastUpdated = true;
    }
    else {
      let orderByValue = value;
      this.requests.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.lastUpdated = false;
    }


  }
  handleSortReceivedOn(value) {

    if (!this.receivedOn) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.requests.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.receivedOn = true;
    }
    else {
      let orderByValue = value;
      this.requests.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.receivedOn = false;
    }


  }
  handleSortRequestorType(value) {

    if (!this.requestorType) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.requests.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.requestorType = true;
    }
    else {
      let orderByValue = value;
      this.requests.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.requestorType = false;
    }


  }
  handleSortMemberFirstName(value) {

    if (!this.memberFirstName) {
      //this.policies.sort(this.doAsc);
      let orderByValue = value;
      this.requests.sort((a: any, b: any) => {
        if (a[orderByValue] > b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] < b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.memberFirstName = true;
    }
    else {
      let orderByValue = value;
      this.requests.sort((a: any, b: any) => {
        if (a[orderByValue] < b[orderByValue]) {
          return -1;
        } else if (a[orderByValue] > b[orderByValue]) {
          return 1;
        } else {
          return 0;
        }
      });
      //this.policies.sort(this.doDsc);
      this.memberFirstName = false;
    }


  }
  public loadScript(url) {
    //console.log('preparing to load menu and translate...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
