import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../../../models/user';
import { SituationType } from 'src/app/models/situation-type';
import { SituationReference } from 'src/app/models/situation-reference';

@Injectable({
  providedIn: 'root',
})
export class SituationReferenceService {
  static readonly SITUATION_REFERENCES_URL = environment.apiUrl + 'situation-advisor/situation-references/';
  static readonly SITUATION_REFERENCES_URL_ADMIN = environment.apiUrl + 'admin/situation-advisor/situation-references/';

  constructor(private readonly http: HttpClient) {}

  getAllSituationReferences() {
    return this.http.get<SituationReference[]>(SituationReferenceService.SITUATION_REFERENCES_URL);
  }

  deleteSituationReference(id: string) {
      return this.http.delete(SituationReferenceService.SITUATION_REFERENCES_URL_ADMIN + id);
  }

  addSituationReference(sr: SituationReference) {
      return this.http.post(SituationReferenceService.SITUATION_REFERENCES_URL_ADMIN, sr);
  }

  updateSituationReference(sr: SituationReference) {
    return this.http.put(SituationReferenceService.SITUATION_REFERENCES_URL_ADMIN, sr);
  }

}
