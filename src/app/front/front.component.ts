import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showMedallion:boolean=true;
  showProcurement:boolean = true;
  showReportProblem:boolean = true;
  showElected:boolean = true;
  showCCCPlus:boolean = true;
  showGeneral:boolean = true;
  showMedia:boolean = true;


  // showMedallion:boolean=false;
  // showProcurement:boolean = false;
  // showReportProblem:boolean = false;
  // showElected:boolean = false;
  // showCCCPlus:boolean = false;
  // showGeneral:boolean = false;
  // showMedia:boolean = true;

  

}
