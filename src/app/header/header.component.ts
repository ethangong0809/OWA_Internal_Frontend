import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { UtilService } from '../util.service';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public popupUrlRedirect: string;
  public userName:any;
  private trigger=false;
  constructor(private modalService: NgbModal, private router: Router, private _location: Location, private utilService: UtilService) {
  }

  ngOnInit() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
  checkuserName(value){
    if(value===true){
    this.userName=Cookie.get('userName');
    return true;
    }
    else{
      return false;
    }
  }

  open(content, url) {
    this.popupUrlRedirect = url;
    this.modalService.open(content, { backdrop: 'static' }).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  redirect() {
    window.open(this.popupUrlRedirect);
  }
  homeClick(){
    this.router.navigate(['home']);
  }

  navigateBack() {
    this._location.back();
  }

  logout() {
    this.router.navigate(['/logout']);
  }

}
