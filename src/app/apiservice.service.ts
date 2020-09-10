import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { APP_CONFIG } from './app.config';
import 'rxjs/add/operator/map'
import { HttpService } from './core/http.service';
@Injectable()

@Injectable()
export class ApiserviceService {
    public subject = new BehaviorSubject<any>(false);
    constructor(private _httpService: HttpService, private http: Http) { }

    getAllRequestsCount() {
        let url = APP_CONFIG.getAllRequestsCount;
        return this._httpService.get(url).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getRequestsCount(id) {
        let url = APP_CONFIG.getRequestsCount;
        return this._httpService.get(url + id).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getPendingRequestsTable(id) {
        let url = APP_CONFIG.getPendingRequestsTable;
        return this._httpService.get(url + id).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getClosedRequestsTable(id, startNumber) {
        let url = APP_CONFIG.getClosedRequestsTable;
        return this._httpService.get(url + id + '/' + startNumber).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getTotalRequestsTable(id, startNumber) {
        let url = APP_CONFIG.getTotalRequestsTable;
        return this._httpService.get(url + id + '/' + startNumber).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getAllPendingRequestsTable(startNumber) {
        let url = APP_CONFIG.getAllPendingRequestsTable;
        return this._httpService.get(url + startNumber).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getAllClosedRequestsTable(startNumber) {
        let url = APP_CONFIG.getAllClosedRequestsTable;
        return this._httpService.get(url + startNumber).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getAllTotalRequestsTable(startNumber) {
        let url = APP_CONFIG.getAllTotalRequestsTable;
        return this._httpService.get(url + startNumber).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getRequest(formID, id) {
        let url = APP_CONFIG.getRequest;
        return this._httpService.get(url + formID + '/' + id).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateRequest(data){
        let url=APP_CONFIG.updateRequest;
        return this._httpService.post(url, data).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getReasonCodes(formID) {
        let url = APP_CONFIG.getReasonCodes;
        return this._httpService.get(url + formID).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getDocuments(requestorID){
        let url = APP_CONFIG.getDocuments;
        return this._httpService.get(url + requestorID).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteDocument(){
        let url = APP_CONFIG.deleteDocument;
        return this._httpService.post(url,).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    saveDocuments(){
        let url=APP_CONFIG.saveDocuments;
        return this._httpService.post(url).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    documents(id,filename){
        let url=APP_CONFIG.documents;
        return this._httpService.get(url + id + '/' + filename).map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    setAssignments(data){
        let url=APP_CONFIG.setAssignments;
        return this._httpService.post(url,data).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getAssignmentsRequestsCount(email){
        let url=APP_CONFIG.getAssignmentsRequestsCount;
        return this._httpService.get(url + email).map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getAssignments(requestorID){
        let url=APP_CONFIG.getAssignments;
        return this._httpService.get(url + requestorID).map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error')); 
    }
    getEmployeesFromLDAP(username){
        let url=APP_CONFIG.getEmployeesFromLDAP;
        return this._httpService.get(url + username).map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    deleteAssignment(){
        let url = APP_CONFIG.deleteAssignment;
        return this._httpService.post(url,).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    updateAssigment(data){
        let url = APP_CONFIG.updateAssigment;
        return this._httpService.put(url,data).map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getAssignmentsRequests(email,formID){
        let url=APP_CONFIG.getAssignmentsRequests;
        return this._httpService.get(url + email + '/' + formID).map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getAllFromLDAP(){
        let url=APP_CONFIG.getAllFromLDAP;
        return this._httpService.get(url).map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}