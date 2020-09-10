import { Component, OnInit, ViewChild, ElementRef, Renderer, AfterViewInit} from '@angular/core';
import { ChangeFormDto } from '../requestorDto';
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
  selector: 'app-moveto-cccplus',
  templateUrl: './moveto-cccplus.component.html',
  styleUrls: ['./moveto-cccplus.component.css']
})
export class MovetoCccplusComponent implements OnInit {
  @ViewChild('content1') content1: ElementRef;
  Procurement:any;
  Medallion:any;
  General:any;
  CCCPlus:any;
  hideGeneral:boolean=false;
  hidePro:boolean=false;
  hideCCC:boolean=false;
  hideMed4:boolean=false;
  public heading: string;
  public edit:boolean = false;
  public status:any;
  data:ChangeFormDto;
  constructor(private utilService: UtilService, private router: Router, private _location: Location, private _apiservice: ApiserviceService, private http: Http, private modalService: NgbModal) { 
    this.data= new ChangeFormDto();
  }

  ngOnInit() {
    this.getheading();
    this.getHeading();
    this.getheading1();
    this.getheading2();
    console.log(this.utilService.docTitle);
    this.status=Cookie.get('status');
    if(this.status=='Open'){
      this.edit=false;
    }
    if(this.status=='Closed'){
      this.edit=true;
    }
  }

  redirect()
{
  this.router.navigate(['home']);
}
  getheading2(){
    if(this.utilService.docTitle==="cccplus"){
    this.hidePro=true;
    this.hideGeneral=true;
    this.hideCCC=false;
    this.hideMed4=true;
  }
}
  getheading(){
   
    if(this.utilService.docTitle==="procurements"){
      this.hidePro=false;
      this.hideGeneral=true;
      this.hideMed4=true;
      this.hideCCC=true;
    }
   

  }

  getHeading(){
    if(this.utilService.docTitle==="general"){
      this.hidePro=true;
      this.hideGeneral=false;
      this.hideMed4=true;
      this.hideCCC=true;
    }
  
  }

  getheading1(){
    if(this.utilService.docTitle==="med4"){
      this.hidePro=true;
      this.hideGeneral=true;
      this.hideCCC=true;
      this.hideMed4=false;
    } 
  }

  open(content1){
    this.modalService.open(content1, { size: 'lg', backdrop:'static' });
  }
 
  changeForm(content1){
   this.data.requestorID=localStorage.getItem('requestorID');
    let url = APP_CONFIG.changeForm;
    this.http.put(url,this.data)
      .map(res => res.json())
      .subscribe((data: any) => {
        
        console.log(data);

      }, error => {
        console.log(error);
      })
  }

}
