import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.css']
})
export class DisclaimerComponent implements OnInit {

  constructor(private router: Router, private utilService: UtilService) { }

  ngOnInit() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    this.utilService.changDocTitle("DMAS Forms - Disclaimer");
    this.utilService.logHide();
    this.utilService.homeHide();
  }

  agree() {
    this.router.navigate(['login']);
  }
}
