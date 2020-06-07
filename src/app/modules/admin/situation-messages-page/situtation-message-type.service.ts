import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SituationMessage } from 'src/app/models/situation-message';


@Injectable({
  providedIn: 'root',
})
export class SituationMessageService {
  static readonly SITUATION_MESSAGE__URL = environment.apiUrl + 'situation-advisor/situation-messages/';
  static readonly SITUATION_MESSAGE__URL_ADMIN = environment.apiUrl + 'admin/situation-advisor/situation-messages/';

  constructor(private readonly http: HttpClient) {}

  getAllSituationMessages() {
    return this.http.get<SituationMessage[]>(SituationMessageService.SITUATION_MESSAGE__URL);
  }

  deleteSituationMessage(id: string) {
      return this.http.delete(SituationMessageService.SITUATION_MESSAGE__URL_ADMIN + id);
  }

  addSituationMessage(smt: SituationMessage) {
      return this.http.post(SituationMessageService.SITUATION_MESSAGE__URL_ADMIN, smt);
  }

  updateSituationMessage(sm: SituationMessage) {
    return this.http.put(SituationMessageService.SITUATION_MESSAGE__URL_ADMIN, sm);
  }

}
