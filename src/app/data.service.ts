import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class DataService {
    private res =new Subject();
    resObservable =this.res.asObservable();
    public table:any;
  constructor() { }
  getData(id){
    return this.table.find(x=>x.ticketID===id);
  }

}