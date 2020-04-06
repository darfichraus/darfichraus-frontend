import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Restriction } from 'src/app/Restriction';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from '../core/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AdminReviewService {

  data = new BehaviorSubject<Restriction[]>([]);

  httpOptions = {
    headers: new HttpHeaders({
      'API-KEY': environment.apiKey
    })
  };

  apiExt = 'admin/restrictions';




  constructor(private http: HttpClient, private notifService: NotificationService) { }


  fetchData(): any {

    this.http.get<Restriction[]>(environment.apiUrl + this.apiExt, this.httpOptions).subscribe((val) => {
      this.data.next(val);
    }, (err) => {
      console.log(err);
    });
  }

  deleteRestriction(restriction: Restriction): any {

    const options = {
      headers: new HttpHeaders({
        'API-KEY': environment.apiKey
      }),
      body: restriction
    };

    return this.http.request('delete', environment.apiUrl + this.apiExt, options);
  }

  deleteRestrictionFromData(restriction): void {
    const newData = this.data.value.filter((e) => e.id !== restriction.id);
    this.data.next(newData);
    this.notifService.info('Deleted restriction.');
  }

  updateRestriction(restriction: Restriction) {
    return this.http.put(environment.apiUrl + this.apiExt, restriction, this.httpOptions);
  }

  updateRestrictionFromData(restriction): void {
    console.log(restriction.id);
    const index = this.data.value.findIndex((e) => e.id === restriction.id);
    const newData = [...this.data.value];
    newData[index] = {...restriction};
    console.log(index);
    console.log(this.data.value);
    console.log(newData);
    this.data.next(newData);
    this.notifService.info('Updated restriction.');
  }





}
