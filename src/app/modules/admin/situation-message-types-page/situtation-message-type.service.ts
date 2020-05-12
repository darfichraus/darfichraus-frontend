import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SituationMessageType } from 'src/app/models/situation-message-type';

@Injectable({
  providedIn: 'root',
})
export class SituationMessageTypeService {
  static readonly SITUATION_MESSAGE_TYPE_URL = environment.apiUrl + 'situation-advisor/situations-message-types/';
  static readonly SITUATION_MESSAGE_TYPE_URL_ADMIN = environment.apiUrl + 'admin/situation-advisor/situation-message-types/';

  constructor(private readonly http: HttpClient) {}

  getAllSituationMessageTypes() {
    return this.http.get<SituationMessageType[]>(SituationMessageTypeService.SITUATION_MESSAGE_TYPE_URL);
  }

  deleteSituationMessageType(id: string) {
      return this.http.delete(SituationMessageTypeService.SITUATION_MESSAGE_TYPE_URL_ADMIN + id);
  }

  addSituationMessageType(smt: SituationMessageType) {
      return this.http.post(SituationMessageTypeService.SITUATION_MESSAGE_TYPE_URL_ADMIN, smt);
  }

  updateSituationMessageType(smt: SituationMessageType) {
    return this.http.put(SituationMessageTypeService.SITUATION_MESSAGE_TYPE_URL_ADMIN, smt);
  }

}
