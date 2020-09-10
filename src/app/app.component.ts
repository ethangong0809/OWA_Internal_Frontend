import { Component, OnInit} from '@angular/core';

import { Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public showButton: boolean = false;
  public clientHeight: number;

  public ngOnInit() {

    this.loadScript('assets/js/menu.js');
    this.loadScript('assets/js/translate.js'); 
  }
  constructor( private metaService: Meta) {
   
  }

  public loadScript(url) {
    //console.log('preparing to load menu and translate...')
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  
  // @HostListener('window:scroll', ['$event'])
  // keyEvent2(event: KeyboardEvent) {
  //   if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
  //     this.showButton = true;
  // } else {
  //     this.showButton = false;
  // }
  // }
  // scrollTo(element) {
  //   this.showButton = false;
  //   this.scrollService.scrollTo(element);
  //console
  // }



}

