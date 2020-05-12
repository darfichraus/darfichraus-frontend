import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SituationCategory } from 'src/app/models/situation-category';

@Injectable({
  providedIn: 'root',
})
export class SituationCategoryService {
  static readonly SITUATION_CATEGORY_URL = environment.apiUrl + 'situation-advisor/situation-categories/';
  static readonly SITUATION_CATEGORY_URL_ADMIN = environment.apiUrl + 'admin/situation-advisor/situation-categories/';

  constructor(private readonly http: HttpClient) {}

  getAllSituationCategories() {
    return this.http.get<SituationCategory[]>(SituationCategoryService.SITUATION_CATEGORY_URL);
  }

  deleteSituationCategory(id: string) {
      return this.http.delete(SituationCategoryService.SITUATION_CATEGORY_URL_ADMIN + id);
  }

  addSituationCategory(sc: SituationCategory) {
      return this.http.post(SituationCategoryService.SITUATION_CATEGORY_URL_ADMIN, sc);
  }

  updateSituationCategory(sc: SituationCategory) {
    return this.http.put(SituationCategoryService.SITUATION_CATEGORY_URL_ADMIN, sc);
  }

}
