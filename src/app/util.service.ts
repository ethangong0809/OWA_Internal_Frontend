import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  visible: boolean;
  logVisible: boolean;
  homeVisible: boolean;
  docTitle:any;
  generalClosed:any;
  meda4Closed:any;
  cccplusClosed:any;
  procurementsClosed:any;
  mediaClosed:any;
  reportClosed:any;
  electedClosed:any;
  allOpen:any;
  allClosed:any;
  static email:String='Lun.Li@dmas.virginia.gov';
  static role:any='sa';
  constructor() { this.visible = false; }

  changDocTitle(title:string){
    document.title=title;
  }
  changeTitle(title){
    this.docTitle=title;
  }
  hide() { this.visible = false; }
  show() { this.visible = true; }

  logHide() {
    this.logVisible = false;
  }
  logShow() {
    this.logVisible = true;
  }

  homeHide() {
    this.homeVisible = false;
    document.getElementById("DMAStitle").style.paddingLeft="27%";
  }
  homeShow() {
    this.homeVisible = true;
    document.getElementById("DMAStitle").style.paddingLeft="13%";
  }


}
