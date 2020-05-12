import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Situation } from 'src/app/models/situation';

@Injectable({
  providedIn: 'root',
})
export class SituationService {
  static readonly SITUATION_TYPE_URL = environment.apiUrl + 'situation-advisor/situations/';
  static readonly SITUATION_TYPE_URL_ADMIN = environment.apiUrl + 'admin/situation-advisor/situations/';

  constructor(private readonly http: HttpClient) {}

  getAllSituations() {
    return this.http.get<Situation[]>(SituationService.SITUATION_TYPE_URL);
  }

  deleteSituation(id: string) {
      return this.http.delete(SituationService.SITUATION_TYPE_URL_ADMIN + id);
  }

  addSituation(st: Situation) {
      return this.http.post(SituationService.SITUATION_TYPE_URL_ADMIN, st);
  }

  updateSituation(st: Situation) {
    return this.http.put(SituationService.SITUATION_TYPE_URL_ADMIN, st);
  }

}
