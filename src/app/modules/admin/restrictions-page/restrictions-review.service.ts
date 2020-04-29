import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'src/app/modules/core/services/notification.service';
import { Restriction } from 'src/app/models/restriction';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestrictionsReviewService {

  data = new BehaviorSubject<Restriction[]>([]);

  static readonly RESTR_URL = environment.apiUrl + 'admin/restrictions/';


  constructor(private http: HttpClient, private notifService: NotificationService) { }


  fetchData(): any {

    this.http.get<Restriction[]>(RestrictionsReviewService.RESTR_URL).subscribe((val) => {
      this.data.next(val);
    }, (err) => {
      console.log(err);
    });
  }

  deleteRestriction(restriction: Restriction): any {

    const options = {
      body: restriction
    };

    return this.http.request('delete', RestrictionsReviewService.RESTR_URL, options);
  }

  deleteRestrictionFromData(restriction): void {
    const newData = this.data.value.filter((e) => e.id !== restriction.id);
    this.data.next(newData);
    this.notifService.info('Deleted restriction.');
  }

  updateRestriction(restriction: Restriction) {
    return this.http.put(RestrictionsReviewService.RESTR_URL, restriction);
  }

  updateRestrictionFromData(restriction): void {
    const index = this.data.value.findIndex((e) => e.id === restriction.id);
    const newData = [...this.data.value];
    newData[index] = {...restriction};

    this.data.next(newData);
    this.notifService.info('Updated restriction.');
  }





}
