import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../../../models/user';
import { SituationType } from 'src/app/models/situation-type';

@Injectable({
  providedIn: 'root',
})
export class SituationTypeService {
  static readonly SITUATION_TYPE_URL = environment.apiUrl + 'situation-advisor/situation-types/';
  static readonly SITUATION_TYPE_URL_ADMIN = environment.apiUrl + 'admin/situation-advisor/situation-types/';

  constructor(private readonly http: HttpClient) {}

  getAllSituationTypes() {
    return this.http.get<SituationType[]>(SituationTypeService.SITUATION_TYPE_URL);
  }

  deleteSituationType(id: string) {
      return this.http.delete(SituationTypeService.SITUATION_TYPE_URL_ADMIN + id);
  }

  addSituationType(st: SituationType) {
      return this.http.post(SituationTypeService.SITUATION_TYPE_URL_ADMIN, st);
  }

  updateSituationType(st: SituationType) {
    return this.http.put(SituationTypeService.SITUATION_TYPE_URL_ADMIN, st);
  }

}
