import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private utilService: UtilService) { }

  ngOnInit() {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    this.utilService.changDocTitle("DMAS Forms - Logout");
    this.utilService.logHide();
    this.utilService.homeHide();
  }

  goToLogin() {
    this.router.navigate(['/disclaimer']);
  }

}
